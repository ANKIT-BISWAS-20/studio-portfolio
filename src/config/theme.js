// ─────────────────────────────────────────────────────────────
//  THEME CONSTANTS: every colour on the site comes from here.
//  Edit a hex value, save, and the whole site (including the
//  Lottie animations) re-colours itself. No component changes.
//
//  To add another palette, copy the `indigo` block, give it a new
//  key, and change the colours. When more than one palette exists,
//  a colour switcher appears in the navbar automatically.
// ─────────────────────────────────────────────────────────────

export const theme = {
  // 'system' follows the visitor's device. Or force 'light' / 'dark'.
  defaultMode: 'system',
  defaultPalette: 'indigo',

  palettes: {
    indigo: {
      label: 'Indigo Night',
      swatch: '#5B5BF0', // colour of the switcher dot
      light: {
        bg: '#F7F8FC', // page background
        bg2: '#EEF0F8', // alternate sections
        fg: '#0E1020', // main text
        muted: '#5C6178', // secondary text
        line: 'rgba(14, 16, 32, 0.12)', // borders
        card: '#FFFFFF', // cards and form
        accent: '#5B5BF0', // primary brand colour
        accent2: '#06B6D4', // secondary colour (gradients, highlights)
        onAccent: '#FFFFFF', // text on accent buttons
      },
      dark: {
        bg: '#0B0D1A',
        bg2: '#10132A',
        fg: '#EEF0FF',
        muted: '#9AA0C0',
        line: 'rgba(238, 240, 255, 0.14)',
        card: '#12152B',
        accent: '#7B7DFF',
        accent2: '#22D3EE',
        onAccent: '#0B0D1A',
      },
    },
  },
}

// ── Internals (no need to edit below) ────────────────────────
const kebab = (k) => k.replace(/[A-Z0-9]/g, (m) => '-' + m.toLowerCase())
const vars = (o) => Object.entries(o).map(([k, v]) => `--${kebab(k)}:${v};`).join('')

/** Builds the CSS variables for every palette and mode. Injected into <head> at build time. */
export function paletteCss() {
  const def = theme.palettes[theme.defaultPalette]
  let css = `:root{${vars(def.light)}color-scheme:light}\n`
  for (const [id, p] of Object.entries(theme.palettes)) {
    for (const mode of ['light', 'dark']) {
      css += `:root[data-palette="${id}"][data-theme="${mode}"]{${vars(p[mode])}color-scheme:${mode}}\n`
    }
  }
  return css
}

/** Tiny script that sets the theme before first paint (prevents a flash). */
export function themeBootScript() {
  const cfg = JSON.stringify({
    defaultMode: theme.defaultMode,
    defaultPalette: theme.defaultPalette,
    palettes: Object.keys(theme.palettes),
  })
  return `(function(){var D=${cfg},r=document.documentElement,m=D.defaultMode,p=D.defaultPalette;try{m=localStorage.getItem('mode')||m;var s=localStorage.getItem('palette');if(s&&D.palettes.indexOf(s)>-1)p=s}catch(e){}var dark=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);r.dataset.theme=dark?'dark':'light';r.dataset.palette=p})();`
}
