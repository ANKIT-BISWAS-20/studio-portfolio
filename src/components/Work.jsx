import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Reveal } from './ui'
import { projects, sections } from '../config'

function Card({ p, i }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 18 })

  const move = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => {
    mx.set(0)
    my.set(0)
  }

  const Wrapper = p.link ? 'a' : 'div'
  const wrapperProps = p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Reveal delay={(i % 2) * 0.1} className={`card-wrap ${i % 3 === 0 ? 'wide' : ''}`}>
      <motion.div
        ref={ref}
        className="card"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        onMouseMove={move}
        onMouseLeave={leave}
        data-cursor
      >
        <Wrapper className="card-link" {...wrapperProps}>
          <div className={`card-art art-${(i % 4) + 1}`} aria-hidden>
            <span className="art-shape s1" />
            <span className="art-shape s2" />
            <span className="art-shape s3" />
            <span className="card-kind mono">{p.kind}</span>
          </div>
          <div className="card-body">
            <div className="card-head">
              <h3 className="card-title display">{p.title}</h3>
              <span className="mono card-year">{p.year}</span>
            </div>
            {p.badge && <p className="badge mono">★ {p.badge}</p>}
            <p className="card-desc">{p.desc}</p>
            <div className="service-tags">
              {p.tags.map((t) => (
                <span className="chip mono" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </Wrapper>
      </motion.div>
    </Reveal>
  )
}

export default function Work() {
  const w = sections.work
  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">{w.eyebrow}</p>
          <h2 className="display h2">
            {w.title} <span className="grad-text">{w.accent}</span>
          </h2>
          <p className="lede narrow">{w.lede}</p>
        </Reveal>

        <div className="cards">
          {projects.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
