import { motion } from 'framer-motion'
import { Reveal } from './ui'
import { services, stats, sections } from '../config'

export default function Services() {
  const s = sections.services
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">{s.eyebrow}</p>
          <h2 className="display h2">
            {s.title} <span className="grad-text">{s.accent}</span>
          </h2>
        </Reveal>

        <ul className="service-list">
          {services.map((item, i) => (
            <Reveal as="li" key={item.n} delay={i * 0.08} className="service">
              <motion.div className="service-inner" whileHover="hover" initial="rest" animate="rest" data-cursor>
                <span className="mono service-n">{item.n}</span>
                <div className="service-main">
                  <h3 className="service-title">{item.title}</h3>
                  <p className="service-desc">{item.desc}</p>
                </div>
                <div className="service-tags">
                  {item.tags.map((t) => (
                    <span className="chip mono" key={t}>{t}</span>
                  ))}
                </div>
                <motion.span
                  className="service-arrow"
                  variants={{ rest: { x: 0, rotate: 0 }, hover: { x: 6, rotate: -45 } }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  aria-hidden
                >
                  →
                </motion.span>
                <motion.span
                  className="service-bar"
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                />
              </motion.div>
            </Reveal>
          ))}
        </ul>

        <div className="stats">
          {stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.08} className="stat">
              <div className="stat-value display grad-text">{st.value}</div>
              <div className="stat-label">{st.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
