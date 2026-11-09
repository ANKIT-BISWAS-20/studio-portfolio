// Built-in Lottie animations (plain JSON, generated in code) used whenever a
// LottieFiles URL is empty or unreachable. Shapes named "accent" / "secondary" / "fg"
// are re-coloured from the theme at runtime.

const num = (k) => ({ a: 0, k })
const tr = (p = [0, 0]) => ({
  ty: 'tr', p: num(p), a: num([0, 0]), s: num([100, 100]), r: num(0), o: num(100), sk: num(0), sa: num(0),
})
const ell = (d) => ({ ty: 'el', d: 1, s: num([d, d]), p: num([0, 0]) })
const stroke = (nm, w, opacity = 100, dash) => ({
  ty: 'st', nm, c: num([1, 1, 1, 1]), o: num(opacity), w: num(w), lc: 2, lj: 2,
  ...(dash ? { d: [{ n: 'd', nm: 'dash', v: num(dash[0]) }, { n: 'g', nm: 'gap', v: num(dash[1]) }] } : {}),
})
const fill = (nm, opacity = 100) => ({ ty: 'fl', nm, c: num([1, 1, 1, 1]), o: num(opacity), r: 1 })
const grp = (nm, items, pos) => ({ ty: 'gr', nm, it: [...items, tr(pos)] })

// frames: [time, value, hold?]. mode: 'linear' | 'ease'
const keys = (frames, mode = 'linear') => ({
  a: 1,
  k: frames.map(([t, s, h]) => ({
    t,
    s: Array.isArray(s) ? s : [s],
    i: mode === 'ease' ? { x: 0.4, y: 1 } : { x: 1, y: 1 },
    o: mode === 'ease' ? { x: 0.6, y: 0 } : { x: 0, y: 0 },
    ...(h ? { h: 1 } : {}),
  })),
})

const ks = (over = {}, pos = [200, 200, 0]) => ({
  o: num(100), r: num(0), p: num(pos), a: num([0, 0, 0]), s: num([100, 100, 100]), ...over,
})
const layer = (ind, nm, shapes, k, op) => ({ ddd: 0, ind, ty: 4, nm, sr: 1, ks: k, ao: 0, shapes, ip: 0, op, st: 0, bm: 0 })
const comp = (nm, op, layers) => ({ v: '5.7.0', fr: 60, ip: 0, op, w: 400, h: 400, nm, ddd: 0, assets: [], layers })

/** Concentric dotted rings with orbiting dots around a glowing core. */
function orbit() {
  const op = 360
  const ring = (ind, d, turns, dotNm, dotSize, label) =>
    layer(
      ind,
      label,
      [
        grp('ring', [ell(d), stroke('fg', 1.5, 28, [3, 9])]),
        grp('dot', [ell(dotSize), fill(dotNm)], [d / 2, 0]),
      ],
      ks({ r: keys([[0, 0], [op, 360 * turns]]) }),
      op,
    )
  const core = layer(
    4,
    'core',
    [grp('glow', [ell(110), fill('accent', 22)]), grp('core', [ell(54), fill('accent')])],
    ks({ s: keys([[0, [100, 100, 100]], [op / 2, [116, 116, 116]], [op, [100, 100, 100]]], 'ease') }),
    op,
  )
  return comp('orbit', op, [core, ring(3, 120, 2, 'fg', 11, 'ring-inner'), ring(2, 220, -1, 'secondary', 14, 'ring-mid'), ring(1, 330, 1, 'accent', 18, 'ring-outer')])
}

/** Soft rings that expand and fade, looping seamlessly. */
function pulse() {
  const op = 120
  // value as a function of cycle fraction, phase-shifted so rings are staggered
  const phased = (phase, fn) => {
    const wrap = phase === 0 ? null : op - phase
    const f = [[0, fn(phase / op)]]
    if (wrap) f.push([wrap, fn(1), true], [wrap + 1, fn(0)])
    f.push([op, fn(phase / op)])
    return keys(f)
  }
  const ring = (ind, phase, nm) =>
    layer(
      ind,
      `ring-${ind}`,
      [grp('ring', [ell(300), stroke(nm, 3)])],
      ks({
        s: phased(phase, (f) => [20 + 80 * f, 20 + 80 * f, 100]),
        o: phased(phase, (f) => [100 * (1 - f)]),
      }),
      op,
    )
  const dot = layer(4, 'dot', [grp('dot', [ell(46), fill('accent')])], ks(), op)
  return comp('pulse', op, [dot, ring(1, 0, 'accent'), ring(2, 40, 'secondary'), ring(3, 80, 'accent')])
}

import { library } from './library'

export const fallbacks = { orbit, pulse, ...library }
