import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Reveal, RevealWords, Photo, CountUp, ease } from './ui'
import LottiePlayer from './LottiePlayer'
import { services, stats, sections } from '../config'

// children of the open panel arrive one after another
const group = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }
const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }
const slide = { hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } } }
const draw = { hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 } } }

function Tick() {
  return (
    <span className="tick" aria-hidden>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <motion.path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
      </svg>
    </span>
  )
}

function Panel({ item, id }) {
  const m = item.more
  const reduce = useReducedMotion()
  return (
    <motion.div
      key="panel"
      id={id}
      role="region"
      aria-label={`${item.title} details`}
      className="service-panel"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.45, ease }}
    >
      <motion.div className="service-panel-inner" variants={group} initial={reduce ? 'show' : 'hidden'} animate="show">
        <div className="service-panel-text">
          <motion.p className="service-intro" variants={rise}>{m.intro}</motion.p>

          <motion.p className="mono service-sub" variants={rise}>What you get</motion.p>
          <ul className="service-points">
            {m.points.map((p) => (
              <motion.li key={p} variants={slide}>
                <Tick />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div className="service-proof" variants={rise}>
            <span className="mono service-sub">{m.doneLabel}</span>
            <p className="service-done">{m.done}</p>
          </motion.div>
        </div>

        {m.photo && (
          <motion.div className="service-media" variants={rise}>
            <div className="frame">
              <div className="frame-bar" aria-hidden>
                <i /><i /><i />
                <span className="mono">northlight / {item.title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '')}</span>
              </div>
              <div className="frame-shot">
                <Photo name={m.photo} sizes="(max-width: 900px) 100vw, 420px" />
                <span className="frame-sheen" aria-hidden />
              </div>
            </div>
            <div className="frame-chips" aria-hidden>
              {item.tags.map((t, k) => (
                <span key={t} className="frame-chip mono" style={{ animationDelay: `${k * 0.5}s` }}>{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

function Row({ item, i, open, onToggle }) {
  const panelId = `service-panel-${item.n}`
  return (
    <Reveal as="li" delay={i * 0.08} className={`service ${open ? 'is-open' : ''}`}>
      <motion.span className="service-rail" aria-hidden initial={false} animate={{ scaleY: open ? 1 : 0 }} transition={{ duration: 0.5, ease }} />
      <motion.div
        className="service-head"
        whileHover="hover"
        initial="rest"
        animate="rest"
        onClick={onToggle}
        data-cursor
      >
        <div className="service-icon" aria-hidden>
          <LottiePlayer id={item.icon} className="service-lottie" />
        </div>
        <div className="service-main">
          <span className="mono service-n">{item.n}</span>
          <h3 className="service-title">{item.title}</h3>
          <p className="service-desc">{item.desc}</p>
        </div>
        <div className="service-tags">
          {item.tags.map((t) => (
            <span className="chip mono" key={t}>{t}</span>
          ))}
        </div>
        <button
          type="button"
          className="service-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? 'Hide' : 'Show'} details: ${item.title}`}
          data-cursor
        >
          <span className="service-arrow" aria-hidden>→</span>
        </button>
        <motion.span
          className="service-bar"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.5, ease }}
        />
      </motion.div>

      <AnimatePresence initial={false}>{open && item.more && <Panel item={item} id={panelId} />}</AnimatePresence>
    </Reveal>
  )
}

export default function Services() {
  const s = sections.services
  const [openN, setOpenN] = useState('01') // first row starts open so the layout is visible straight away

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">{s.eyebrow}</p>
        </Reveal>
        <h2 className="display h2" id="services-title">
          <RevealWords text={s.title} />{' '}
          <RevealWords text={s.accent} delay={0.15} className="grad-text" />
        </h2>
        {s.hint && (
          <Reveal delay={0.2}>
            <p className="lede narrow">{s.hint}</p>
          </Reveal>
        )}

        <ul className="service-list">
          {services.map((item, i) => (
            <Row
              key={item.n}
              item={item}
              i={i}
              open={openN === item.n}
              onToggle={() => setOpenN((cur) => (cur === item.n ? null : item.n))}
            />
          ))}
        </ul>

        <div className="stats">
          {stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.08} className="stat">
              <div className="stat-value display grad-text">
                <CountUp value={st.value} />
              </div>
              <div className="stat-label">{st.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
