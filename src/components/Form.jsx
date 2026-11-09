import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'

/** Floating-label text input / textarea (Tailwind, no placeholder clutter). */
export function Field({ label, as = 'input', className = '', ...props }) {
  const Tag = as
  return (
    <label className="relative block">
      <Tag
        {...props}
        placeholder=" "
        className={`peer block min-h-14 w-full rounded-xl border border-line bg-bg px-4 pb-2 pt-6 text-base text-fg outline-none transition duration-200 hover:border-fg/30 focus:border-accent focus:ring-4 focus:ring-accent/20 ${className}`}
      />
      <span className="pointer-events-none absolute left-4 top-4 origin-left font-mono text-[0.8rem] uppercase tracking-wider text-muted transition-all duration-200 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.85]">
        {label}
      </span>
    </label>
  )
}

/** Accessible, animated dropdown built on Headless UI's Listbox. */
export function Select({ label, value, onChange, options }) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className={`relative ${open ? 'z-30' : 'z-0'}`}>
          <ListboxButton
            data-cursor
            className="group relative flex min-h-14 w-full items-center justify-between rounded-xl border border-line bg-bg px-4 pb-2 pt-6 text-left text-base text-fg outline-none transition duration-200 hover:border-fg/30 focus-visible:border-accent data-[open]:border-accent data-[open]:ring-4 data-[open]:ring-accent/20"
          >
            <span className="pointer-events-none absolute left-4 top-2 origin-left scale-[0.85] font-mono text-[0.8rem] uppercase tracking-wider text-muted transition-colors group-data-[open]:text-accent">
              {label}
            </span>
            <span className="truncate">{value}</span>
            <motion.svg
              aria-hidden
              viewBox="0 0 20 20"
              className="ml-3 h-5 w-5 shrink-0 text-muted"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </ListboxButton>

          <AnimatePresence>
            {open && (
              <ListboxOptions
                static
                as={motion.ul}
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
                className="absolute left-0 right-0 top-full mt-2 max-h-64 origin-top overflow-auto rounded-xl border border-line bg-card p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] outline-none"
              >
                {options.map((opt) => (
                  <ListboxOption
                    key={opt}
                    value={opt}
                    data-cursor
                    className="group flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] text-fg transition-colors data-[focus]:bg-accent/10 data-[selected]:font-semibold data-[selected]:text-accent"
                  >
                    <span>{opt}</span>
                    <svg aria-hidden viewBox="0 0 20 20" className="invisible h-4 w-4 group-data-[selected]:visible">
                      <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            )}
          </AnimatePresence>
        </div>
      )}
    </Listbox>
  )
}
