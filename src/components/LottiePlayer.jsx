import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { animations } from '../config'
import { loadLottie, tintLottie, useThemeColors } from '../lib/lottie'
import { fallbacks } from '../animations/fallbacks'

// Loaded on demand so the first paint isn't blocked by the Lottie runtime.
// (lottie-react is CommonJS, so the component can sit one level deeper after bundling)
const Lottie = lazy(() =>
  import('lottie-react').then((m) => ({ default: m.default?.default ?? m.default })),
)

/**
 * Renders the animation configured under `id` in src/config/animations.js.
 * Uses the cached LottieFiles URL when present, otherwise the built-in fallback.
 * Re-colours itself when the theme changes.
 */
export default function LottiePlayer({ id, className = '', style, onComplete }) {
  const spec = animations[id] || {}
  const reduce = useReducedMotion()
  const colors = useThemeColors()
  const [remote, setRemote] = useState(null)

  useEffect(() => {
    let alive = true
    setRemote(null)
    if (spec.url) loadLottie(spec.url).then((d) => alive && setRemote(d))
    return () => {
      alive = false
    }
  }, [spec.url])

  const data = useMemo(() => {
    const base = remote || fallbacks[spec.fallback]?.()
    return base ? tintLottie(base, colors) : null
  }, [remote, spec.fallback, colors])

  if (!data) return null
  return (
    <Suspense fallback={null}>
      <Lottie
        animationData={data}
        loop={spec.loop !== false}
        autoplay={!reduce}
        className={className}
        style={style}
        onComplete={onComplete}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
        aria-hidden="true"
      />
    </Suspense>
  )
}
