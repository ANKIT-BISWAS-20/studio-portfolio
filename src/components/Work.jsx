import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Reveal, Photo, useCanHover } from './ui'
import VideoModal from './VideoModal'
import { projects, sections } from '../config'

function Card({ p, i, onPlay }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const canHover = useCanHover()
  const tilt = canHover && !reduce // 3D tilt only with a mouse; phones skip it
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 18 })

  const move = (e) => {
    if (!tilt || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <Reveal delay={(i % 2) * 0.1} className={`card-wrap ${p.featured ? 'wide' : ''} ${p.flip ? 'flip' : ''}`}>
      <motion.div
        ref={ref}
        className="card"
        style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
        onMouseMove={tilt ? move : undefined}
        onMouseLeave={tilt ? leave : undefined}
      >
        <div className="card-link">
          <div className={`card-art art-${(i % 4) + 1}`}>
            <span className="art-shape s1" aria-hidden />
            <span className="art-shape s2" aria-hidden />
            <span className="art-shape s3" aria-hidden />
            {p.image && <Photo name={p.image} fallback={p.imageFallback} alt={`${p.title} preview`} className="card-photo" />}
            <span className="card-kind mono">{p.kind}</span>
            {p.video && (
              <button
                type="button"
                className="play-btn"
                onClick={() => onPlay(p)}
                aria-label={`Play ${p.title} demo video`}
                data-cursor
              >
                <span className="play-icon" aria-hidden>▶</span>
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="card-head">
              <h3 className="card-title display">{p.title}</h3>
              <span className="mono card-year">{p.year}</span>
            </div>
            {p.badge && <p className="badge mono">★ {p.badge}</p>}
            <p className="card-desc">{p.desc}</p>
            {p.points && (
              <ul className="card-points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
            <div className="service-tags">
              {p.tags.map((t) => (
                <span className="chip mono" key={t}>{t}</span>
              ))}
            </div>
            {(p.video || p.links?.length > 0) && (
              <div className="card-actions">
                {p.video && (
                  <button type="button" className="pill pill-solid" onClick={() => onPlay(p)} data-cursor>
                    <span aria-hidden>▶</span> {p.video.label || 'Watch demo'}
                  </button>
                )}
                {p.links?.map((l) => (
                  <a key={l.href} className="pill" href={l.href} target="_blank" rel="noreferrer" data-cursor>
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

export default function Work() {
  const w = sections.work
  const [playing, setPlaying] = useState(null) // project whose video is open

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
            <Card key={p.title} p={p} i={i} onPlay={setPlaying} />
          ))}
        </div>
      </div>

      <VideoModal
        open={!!playing}
        video={playing?.video}
        title={playing?.title || ''}
        onClose={() => setPlaying(null)}
      />
    </section>
  )
}
