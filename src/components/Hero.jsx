import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion'
import { SplitWords, RotatingWords, Reveal, Magnetic, Marquee, CountUp, useCanHover } from './ui'
import Button from './Button'
import LottiePlayer from './LottiePlayer'
import { site, hero, services, stats } from '../config'

// where each floating chip sits around the animation, and how strongly it reacts to the pointer
const slots = [
  { top: '6%', left: '-2%', depth: 26 },
  { top: '16%', right: '-4%', depth: 40 },
  { bottom: '22%', left: '-6%', depth: 34 },
  { bottom: '8%', right: '2%', depth: 22 },
  { top: '46%', right: '-10%', depth: 48 },
]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const canHover = useCanHover() // false on phones/tablets: no pointer-tracking effects there

  // pointer position, -0.5 … 0.5 across the hero (drives parallax)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 16 })
  const sy = useSpring(my, { stiffness: 70, damping: 16 })
  const artX = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const artY = useTransform(sy, [-0.5, 0.5], [-14, 14])

  // spotlight that follows the cursor
  const px = useMotionValue(-999)
  const py = useMotionValue(-999)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${px}px ${py}px, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%)`

  const onMove = (e) => {
    if (reduce || !canHover || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
    px.set(e.clientX - r.left)
    py.set(e.clientY - r.top)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
    px.set(-999)
  }

  const { scrollY } = useScroll()
  const lift = useTransform(scrollY, [0, 600], [0, -70])
  const fade = useTransform(scrollY, [0, 520], [1, 0.15])

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      {canHover && <motion.div className="hero-spot" style={{ background: spotlight }} aria-hidden />}
      <div className="hero-grid-bg" aria-hidden />

      <div className="container hero-grid">
        <motion.div className="hero-copy" style={canHover ? { y: lift, opacity: fade } : undefined}>
          <Reveal y={16}>
            <p className="eyebrow mono">
              <span className="pulse" /> {site.availability}
            </p>
          </Reveal>

          <h1 className="display hero-title">
            <SplitWords text={hero.title.before} delay={0.15} />
            <br />
            <RotatingWords words={hero.title.words} />
            <br />
            <SplitWords text={hero.title.after} delay={0.5} className="hero-after" />
          </h1>

          <Reveal delay={0.7}>
            <p className="lede">{hero.lede}</p>
          </Reveal>

          <Reveal delay={0.85} className="hero-cta">
            <Magnetic>
              <Button as="a" href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            </Magnetic>
            <Magnetic>
              <Button as="a" href={hero.secondaryCta.href} variant="ghost" arrow={false}>{hero.secondaryCta.label}</Button>
            </Magnetic>
          </Reveal>

          <Reveal delay={1} className="hero-stats">
            {stats.slice(0, hero.statsCount).map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="hero-stat-value display">
                  <CountUp value={s.value} />
                </div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </motion.div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.3 }}
        >
          <motion.div className="hero-art-inner" style={canHover ? { x: artX, y: artY } : undefined}>
            <LottiePlayer id="hero" className="hero-lottie" />
          </motion.div>

          {hero.chips.slice(0, slots.length).map((c, i) => (
            <FloatingChip key={c} label={c} slot={slots[i]} index={i} sx={sx} sy={sy} parallax={canHover} />
          ))}
        </motion.div>
      </div>

      <a className="scroll-cue" href="#services" aria-label="Scroll to services">
        <span className="scroll-cue-mouse"><i /></span>
        <span className="mono">{hero.scrollCue}</span>
      </a>

      <div className="hero-marquee">
        <Marquee items={services.map((s) => s.title)} />
      </div>
    </section>
  )
}

function FloatingChip({ label, slot, index, sx, sy, parallax }) {
  const { depth, ...pos } = slot
  const x = useTransform(sx, [-0.5, 0.5], [depth, -depth])
  const y = useTransform(sy, [-0.5, 0.5], [depth * 0.7, -depth * 0.7])
  return (
    <motion.span className={`hero-chip chip-${index}`} style={parallax ? { ...pos, x, y } : pos}>
      {/* the bobbing is a plain CSS animation (runs on the GPU), not JS-driven */}
      <span
        className="hero-chip-inner mono"
        style={{ animationDuration: `${4 + index * 0.7}s`, animationDelay: `${index * 0.3}s` }}
      >
        <i /> {label}
      </span>
    </motion.span>
  )
}
