import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Northlight mark: an "N" whose right stem points north to a small guiding light.
 * Colours come from the live theme (--accent / --accent-2), so the palette picker re-colours the logo too.
 * On load the N draws itself and the spark pops in; on hover of the surrounding link the spark spins.
 */
export default function Logo({ size = 34, animate = true, className = '' }) {
  const gid = useId().replace(/:/g, '')
  const reduce = useReducedMotion()
  const on = animate && !reduce
  return (
    <svg
      className={`logo-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Northlight Studio logo"
    >
      <defs>
        <linearGradient id={gid} x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="1" style={{ stopColor: 'var(--accent-2)' }} />
        </linearGradient>
      </defs>
      <motion.rect
        width="64"
        height="64"
        rx="18"
        fill={`url(#${gid})`}
        initial={on ? { scale: 0.6, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: '32px 32px' }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      />
      <motion.path
        d="M19 47V22L45 47V29"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={on ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.25 }}
      />
      <g className="logo-spark">
        <motion.path
          d="M45 7.5Q46.3 13.7 52.5 15Q46.3 16.3 45 22.5Q43.7 16.3 37.5 15Q43.7 13.7 45 7.5Z"
          fill="#fff"
          style={{ transformOrigin: '45px 15px' }}
          initial={on ? { scale: 0, rotate: -90 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1 }}
        />
      </g>
    </svg>
  )
}

/** Mark + wordmark, used in the navbar and footer. */
export function Brand({ name, tagline = 'Studio', size = 34 }) {
  const [first, ...rest] = name.split(' ')
  return (
    <span className="brand-lockup">
      <Logo size={size} />
      <span className="brand-words">
        <span className="brand-name">{first}</span>
        <span className="brand-sub mono">{rest.join(' ') || tagline}</span>
      </span>
    </span>
  )
}
