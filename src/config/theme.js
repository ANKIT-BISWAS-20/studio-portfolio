// ─────────────────────────────────────────────────────────────
//  THEME CONSTANTS: every colour on the site comes from here.
//  Edit a hex value, save, and the whole site (including the
//  Lottie animations) re-colours itself. No component changes.
//
//  To add another palette, copy one `pal(...)` line, give it a new
//  key and change the colours. Every palette appears in the colour
//  picker in the navbar automatically.
// ─────────────────────────────────────────────────────────────

// Builds one palette from two lists of nine colours, in this order:
// bg, bg2, fg, muted, line, card, accent, accent2, onAccent
const KEYS = ['bg', 'bg2', 'fg', 'muted', 'line', 'card', 'accent', 'accent2', 'onAccent']
const pal = (label, light, dark) => {
  const to = (arr) => Object.fromEntries(KEYS.map((k, i) => [k, arr[i]]))
  return { label, swatch: light[6], swatch2: light[7], light: to(light), dark: to(dark) }
}

export const theme = {
  // 'system' follows the visitor's device. Or force 'light' / 'dark'.
  defaultMode: 'system',
  // The palette everyone starts on (the original look). Visitors can switch from the
  // palette button in the navbar; their choice is remembered on their device.
  defaultPalette: 'indigo',

  palettes: {
    //                bg         bg2        fg         muted      line                        card       accent     accent2    onAccent
    indigo: pal('Indigo Night',
      ['#F7F8FC', '#EEF0F8', '#0E1020', '#5C6178', 'rgba(14, 16, 32, 0.12)', '#FFFFFF', '#5B5BF0', '#06B6D4', '#FFFFFF'],
      ['#0B0D1A', '#10132A', '#EEF0FF', '#9AA0C0', 'rgba(238, 240, 255, 0.14)', '#12152B', '#7B7DFF', '#22D3EE', '#0B0D1A']),
    ocean: pal('Ocean',
      ['#F4F9FC', '#E8F2F8', '#0A1722', '#546879', 'rgba(10, 23, 34, 0.12)', '#FFFFFF', '#0369A1', '#14B8A6', '#FFFFFF'],
      ['#07131C', '#0B1C29', '#E8F4FC', '#8FA9BB', 'rgba(232, 244, 252, 0.14)', '#0D2030', '#38BDF8', '#2DD4BF', '#06131C']),
    emerald: pal('Emerald',
      ['#F5FAF7', '#E7F3EC', '#0B1A13', '#566B60', 'rgba(11, 26, 19, 0.12)', '#FFFFFF', '#047857', '#65A30D', '#FFFFFF'],
      ['#08140E', '#0C1D15', '#E9FBF1', '#92B2A1', 'rgba(233, 251, 241, 0.14)', '#0F241A', '#34D399', '#A3E635', '#07140D']),
    sunset: pal('Sunset',
      ['#FFF8F3', '#FDEEE3', '#1F1008', '#7A5F50', 'rgba(31, 16, 8, 0.12)', '#FFFFFF', '#C2410C', '#E11D48', '#FFFFFF'],
      ['#150C07', '#1F120B', '#FFF1E8', '#C1A18E', 'rgba(255, 241, 232, 0.14)', '#26160D', '#FB923C', '#FB7185', '#170B04']),
    rose: pal('Rose',
      ['#FFF7FA', '#FCE9F0', '#200A14', '#7A5566', 'rgba(32, 10, 20, 0.12)', '#FFFFFF', '#DB2777', '#8B5CF6', '#FFFFFF'],
      ['#14080E', '#1F0D17', '#FFEEF5', '#C3A0B2', 'rgba(255, 238, 245, 0.14)', '#27101C', '#F472B6', '#A78BFA', '#170610']),
    amber: pal('Amber',
      ['#FBFAF4', '#F3F0E1', '#17150A', '#686448', 'rgba(23, 21, 10, 0.12)', '#FFFFFF', '#A16207', '#EA580C', '#FFFFFF'],
      ['#121006', '#1B1809', '#FCF8E3', '#B9B28A', 'rgba(252, 248, 227, 0.14)', '#211D0B', '#FACC15', '#FB923C', '#141105']),
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
