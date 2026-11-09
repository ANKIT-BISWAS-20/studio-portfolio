import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Reveal, RevealWords, Photo, Marquee, useCanHover, ease } from './ui'
import LottiePlayer from './LottiePlayer'
import { sections, showcase, principles } from '../config'

/** One bento tile: parallax photo, cursor spotlight, animated Lottie badge and a caption that wakes up on hover. */
function CraftCard({ it, i, total }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const canHover = useCanHover()
  const [hot, setHot] = useState(false)

  // photo drifts slower than the page while the card crosses the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const move = (e) => {
    if (!canHover || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.figure
      ref={ref}
      className={`craft craft-${i + 1} ${hot ? 'is-hot' : ''}`}
      initial={reduce ? false : { opacity: 0, clipPath: 'inset(9% 7% 9% 7% round 40px)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.05, ease, delay: i * 0.12 }}
      onPointerMove={move}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHot(true)}
      onPointerLeave={() => setHot(false)}
      data-cursor
    >
      <motion.div className="craft-media" style={reduce ? undefined : { y: drift }}>
        <Photo name={it.photo} sizes={i === 0 ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 100vw, 40vw'} />
      </motion.div>
      <span className="craft-tint" aria-hidden />
      <span className="craft-spot" aria-hidden />
      <span className="craft-shine" aria-hidden />

      <span className="craft-num mono" aria-hidden>
        <b>0{i + 1}</b> / 0{total}
      </span>

      <motion.div
        className="craft-orb"
        initial={reduce ? false : { opacity: 0, scale: 0.6, y: 14 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.5 + i * 0.12 }}
      >
        <div className="craft-orb-inner">
          <LottiePlayer id={it.anim} className="craft-lottie" />
        </div>
      </motion.div>

      <figcaption>
        <span className="craft-label mono">
          <i aria-hidden /> {it.label}
        </span>
        <span className="craft-note">{it.note}</span>
        <span className="craft-chips">
          {it.chips.map((c) => (
            <span key={c} className="craft-chip mono">{c}</span>
          ))}
        </span>
      </figcaption>

      <span className="craft-arrow" aria-hidden>→</span>
    </motion.figure>
  )
}

/** Photo collage between Work and Process. Photos come from config/images.js. */
export default function Showcase() {
  const s = sections.showcase
  return (
    <section className="section showcase" id="showcase" aria-labelledby="craft-title">
      <span className="showcase-glow" aria-hidden />
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">{s.eyebrow}</p>
        </Reveal>
        <h2 className="display h2" id="craft-title">
          <RevealWords text={s.title} />{' '}
          <RevealWords text={s.accent} delay={0.15} className="grad-text" />
        </h2>
        <Reveal delay={0.25}>
          <p className="lede narrow">{s.lede}</p>
        </Reveal>

        <div className="craft-grid">
          {showcase.map((it, i) => (
            <CraftCard key={it.photo} it={it} i={i} total={showcase.length} />
          ))}
        </div>
      </div>

      <div className="craft-ticker" aria-label="Our principles">
        <Marquee items={principles} />
      </div>
    </section>
  )
}
