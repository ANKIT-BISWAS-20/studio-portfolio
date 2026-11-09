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

export const ease = [0.2, 0.7, 0.2, 1]

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
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const move = (e) => {
    if (reduce || e.pointerType === 'touch' || !ref.current) return
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
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => setActive(!!e.target.closest('a, button, input, textarea, [role="option"], [data-cursor]'))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

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
