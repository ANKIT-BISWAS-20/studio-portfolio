import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Reveal, Marquee } from './ui'
import { process, team, stack, sections } from '../config'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })

  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">{sections.process.eyebrow}</p>
          <h2 className="display h2">
            {sections.process.title} <span className="grad-text">{sections.process.accent}</span>
          </h2>
        </Reveal>

        <div className="steps" ref={ref}>
          <div className="steps-rail" aria-hidden>
            <motion.div className="steps-fill" style={{ scaleY }} />
          </div>
          {process.map((s, i) => (
            <Reveal key={s.n} delay={0.05} className="step">
              <span className="step-dot" aria-hidden />
              <span className="mono step-n">{s.n}</span>
              <h3 className="step-title display">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="team">
          <Reveal>
            <p className="eyebrow mono">{sections.team.eyebrow}</p>
          </Reveal>
          <div className="team-grid">
            {team.map((t, i) => (
              <Reveal key={t.role} delay={i * 0.1} className="team-card">
                <h3 className="display team-role">{t.role}</h3>
                <p>{t.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="stack-marquee">
        <Marquee items={stack} reverse />
      </div>
    </section>
  )
}
