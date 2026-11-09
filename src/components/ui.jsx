import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useScroll,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

import { photoSet, photoAlt } from '../config/images'

export const ease = [0.2, 0.7, 0.2, 1]

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

/**
 * True only on devices with a real mouse/trackpad. Phones and tablets return false, so we
 * can skip pointer-tracking effects (spotlight, parallax, tilt, magnetic pull) that only
 * add work for the main thread on touch screens.
 */
export function useCanHover() {
  const [can, setCan] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(HOVER_QUERY).matches : false))
  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY)
    const on = () => setCan(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return can
}

/** Fades and lifts children into view once. */
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  )
}

/** Splits text into words that slide up from a mask, one after another. */
export function SplitWords({ text, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="word-mask" aria-hidden="true">
          <motion.span
            className="word"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.07 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

/** Like SplitWords, but waits until the heading scrolls into view. */
export function RevealWords({ text, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="word-mask">
          <motion.span
            className="word"
            initial={reduce ? false : { y: '115%', rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.85, ease, delay: delay + i * 0.07 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

/** Cycles through a list of words with a vertical slide. */
export function RotatingWords({ words, interval = 2400 }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce || words.length < 2) return
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words, interval, reduce])

  return (
    <span className="rotator" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="rotator-word grad-text"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Counts up to a value like "20+", "145k+" or "1st" when it scrolls into view. */
export function CountUp({ value, duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(String(value))
  const [n, setN] = useState(match && !reduce ? 0 : match ? Number(match[1]) : 0)

  useEffect(() => {
    if (!inView || !match || reduce) return
    const controls = animate(0, Number(match[1]), { duration, ease: 'easeOut', onUpdate: setN })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  if (!match) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref}>
      {Math.round(n)}
      {match[2]}
    </span>
  )
}

/** Wrapper that gently pulls its content toward the cursor. */
export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const canHover = useCanHover()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const move = (e) => {
    if (reduce || !canHover || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span ref={ref} className="magnetic" style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  )
}

/** Thin accent bar showing page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

/** Custom cursor: dot with a trailing ring that grows over interactive things. Mouse only. */
export function Cursor() {
  const canHover = useCanHover()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 })
  const ry = useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 })
  const enabled = canHover && !reduce

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')

    // Pointer events with a mouse-only filter: touch taps (and the mouse events browsers
    // emulate after them) can never move the cursor, so there is nothing to lag on phones.
    const move = (e) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      if (e.pointerType !== 'mouse') return
      setActive(!!e.target.closest('a, button, input, textarea, [role="option"], [role="radio"], [data-cursor]'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className={`cursor-ring ${active ? 'is-active' : ''}`} style={{ x: rx, y: ry }} />
    </>
  )
}

/** Endless horizontal ticker. */
export function Marquee({ items, reverse = false }) {
  const row = (k) => (
    <div className="marquee-row" key={k} aria-hidden={k > 0}>
      {items.map((it, i) => (
        <span className="marquee-item" key={i}>
          {it}
          <span className="marquee-sep">✦</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`marquee ${reverse ? 'reverse' : ''}`}>
      <div className="marquee-track">{[0, 1].map(row)}</div>
    </div>
  )
}

/**
 * Lazy-loaded photo. `name` is a key from config/images.js or a full URL.
 * If it fails to load, the optional `fallback` photo is tried, and after that the image
 * simply disappears so whatever sits behind it (the card's gradient art) shows instead.
 */
export function Photo({ name, fallback, alt, sizes = '(max-width: 900px) 100vw, 50vw', className = '', eager = false }) {
  const [src, setSrc] = useState(name)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    setSrc(name)
    setFailed(false)
  }, [name])
  if (failed || !src) return null
  const set = photoSet(src)
  return (
    <img
      {...set}
      sizes={set.srcSet ? sizes : undefined}
      alt={alt ?? photoAlt(src)}
      className={`photo ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => (fallback && src !== fallback ? setSrc(fallback) : setFailed(true))}
    />
  )
}
