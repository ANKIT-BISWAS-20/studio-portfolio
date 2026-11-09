import { useState } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-accent text-on-accent shadow-[0_12px_32px_-12px_var(--accent)] hover:shadow-[0_18px_40px_-12px_var(--accent)]',
  ghost: 'border border-line text-fg hover:border-accent hover:text-accent',
}

/**
 * Animated button / link.
 * - spring scale on hover and press
 * - light sweep across the surface on hover
 * - arrow slides on hover
 * - tap ripple from the exact touch/click point
 * - optional loading spinner
 */
export default function Button({
  as = 'button',
  variant = 'primary',
  arrow = true,
  loading = false,
  className = '',
  children,
  onClick,
  ...props
}) {
  const [ripples, setRipples] = useState([])
  const Comp = motion[as]

  const handleClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = performance.now() + Math.random()
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    setTimeout(() => setRipples((rs) => rs.filter((x) => x.id !== id)), 700)
    onClick?.(e)
  }

  return (
    <Comp
      {...props}
      onClick={handleClick}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`group relative inline-flex min-h-12 select-none items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[0.98rem] font-semibold transition-[color,border-color,box-shadow] duration-300 disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {/* light sweep */}
      <span
        aria-hidden
        className="btn-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 opacity-0 group-hover:opacity-100"
      />
      {/* ripples */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute h-8 w-8 rounded-full bg-current"
          style={{ left: r.x - 16, top: r.y - 16 }}
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 14, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      ))}

      <span className="relative z-10 inline-flex items-center gap-2">
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {children}
        {arrow && !loading && (
          <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        )}
      </span>
    </Comp>
  )
}
