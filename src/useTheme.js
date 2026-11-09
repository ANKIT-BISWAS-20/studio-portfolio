import { useCallback, useEffect, useState } from 'react'
import { theme } from './config'

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

const query = '(prefers-color-scheme: dark)'

export function useTheme() {
  const [mode, setMode] = useState(() => read('mode', theme.defaultMode))
  const [palette, setPaletteState] = useState(() => {
    const p = read('palette', theme.defaultPalette)
    return theme.palettes[p] ? p : theme.defaultPalette
  })
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = (e) => setSystemDark(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const resolved = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = resolved
    root.dataset.palette = palette
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim()
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta && bg) meta.setAttribute('content', bg)
  }, [resolved, palette])

  const toggleTheme = useCallback(() => {
    const next = resolved === 'dark' ? 'light' : 'dark'
    setMode(next)
    write('mode', next)
  }, [resolved])

  const setPalette = useCallback((id) => {
    setPaletteState(id)
    write('palette', id)
  }, [])

  return { theme: resolved, toggleTheme, palette, setPalette }
}
