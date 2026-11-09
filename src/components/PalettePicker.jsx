import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { theme as themeConfig } from '../config'

/**
 * Colour picker for the navbar. Shows every palette from src/config/theme.js as a
 * swatch; the active one is ticked. The default (Indigo Night) is the original look,
 * and the visitor's choice is remembered on their device.
 */
export default function PalettePicker({ palette, setPalette }) {
  const entries = Object.entries(themeConfig.palettes)
  if (entries.length < 2) return null
  const current = themeConfig.palettes[palette] || themeConfig.palettes[themeConfig.defaultPalette]
  const dot = (p) => ({ background: `linear-gradient(135deg, ${p.swatch}, ${p.swatch2})` })

  return (
    <Popover className="relative">
      <PopoverButton
        data-cursor
        className="icon-btn"
        aria-label={`Change colour. Current: ${current.label}`}
        title="Change colour"
      >
        <span className="block h-[18px] w-[18px] rounded-full ring-2 ring-line" style={dot(current)} />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute right-0 top-full z-50 mt-3 w-[236px] origin-top-right rounded-2xl border border-line bg-card p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <p className="mono mb-2 px-1 text-muted">Colour</p>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Colour palette">
          {entries.map(([id, p]) => {
            const on = id === palette
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={on}
                data-cursor
                onClick={() => setPalette(id)}
                className={`group flex flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 transition-colors ${
                  on ? 'border-accent bg-accent/10' : 'border-transparent hover:bg-surface'
                }`}
              >
                <span className="relative grid h-8 w-8 place-items-center rounded-full" style={dot(p)}>
                  {on && (
                    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                      <path d="M4 10.5l4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={`text-[0.7rem] leading-none ${on ? 'font-semibold text-fg' : 'text-muted'}`}>
                  {p.label.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>
        {palette !== themeConfig.defaultPalette && (
          <button
            type="button"
            data-cursor
            onClick={() => setPalette(themeConfig.defaultPalette)}
            className="mono mt-3 w-full rounded-lg border border-line px-3 py-2 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Reset to default
          </button>
        )}
      </PopoverPanel>
    </Popover>
  )
}
