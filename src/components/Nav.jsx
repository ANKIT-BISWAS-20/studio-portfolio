import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site, nav } from '../config'
import PalettePicker from './PalettePicker'
import { Brand } from './Logo'

export default function Nav({ theme, toggleTheme, palette, setPalette }) {
  const [open, setOpen] = useState(false)

  // lock page scroll while the mobile menu is open; close on Escape
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <motion.header
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
    >
      <a href="#top" className="brand" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
        <Brand name={site.name} />
      </a>

      <nav className="nav-links" aria-label="Primary">
        {nav.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>

      <div className="nav-tools">
        <PalettePicker palette={palette} setPalette={setPalette} />
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle light and dark theme" title="Toggle theme">
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </motion.span>
        </button>
        <button
          className="icon-btn menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="burger" data-open={open}>
            <i />
            <i />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {nav.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
              >
                <span className="mono">0{i + 1}</span>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
