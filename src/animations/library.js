// Hand-built Lottie animations (plain JSON generated in code). They are vector, tiny, theme-aware
// (shapes named accent / secondary / fg / bg / card re-colour with the palette) and loop cleanly.
// Each one can be replaced by a LottieFiles URL in src/config/animations.js.

import { keys, rect, circle, poly, bez, star, fill, stroke, trim, grp, ks, layer, comp, pop } from './kit'

const TAU = Math.PI * 2
const rnd = (n) => +n.toFixed(2)

/** Samples fn(t) every `step` frames into linear keyframes (smooth, seamless loops from maths). */
const sampled = (fn, op, step = 4) => {
  const f = []
  for (let t = 0; t <= op; t += step) f.push([t, fn(t)])
  if (f[f.length - 1][0] !== op) f.push([op, fn(op)])
  return keys(f, 'linear')
}
/** 0 → 1 → 0 bump across one cycle of length L, shifted by `phase` */
const bump = (t, L, phase = 0) => Math.sin(Math.PI * ((((t + phase) % L) + L) % L) / L)

/** opacity: fade in at `inT`, hold, fade out between a and b */
const life = (inT, a, b, op, inLen = 12) => keys([[0, 0, 1], [inT, 0], [inT + inLen, 100], [a, 100], [b, 0], [op, 0]], 'linear')

// ─────────────────────────────────────────────────────────────
// 1. Code editor: lines type themselves, caret blinks, "tests pass" badge pops.
function code() {
  const op = 320
  const W = 300, H = 230
  const layers = []
  let ind = 1

  // badge sits on top
  const badge = layer(
    ind++, 'badge',
    [
      grp('disc', [circle(70), fill('accent')]),
      grp('tick', [poly([[-14, 1], [-4, 11], [15, -9]]), trim(0, keys([[0, 0, 1], [208, 0], [228, 100]])), stroke('card', 8)]),
    ],
    ks({ p: [326, 306, 0], s: pop(196, 292, 100, 20) }),
    op,
  )
  layers.push(badge)

  // caret
  layers.push(
    layer(ind++, 'caret', [grp('c', [rect(5, 20, 2), fill('accent')])],
      ks({ p: [200 + 14, 200 + 87, 0], o: keys([[0, 0, 1], [168, 100, 1], [188, 0, 1], [208, 100, 1], [228, 0, 1], [248, 100, 1], [268, 0, 1]], 'linear') }),
      op),
  )

  // typed lines
  const lines = [
    { y: -46, x: 0, w: 140, c: 'accent' },
    { y: -14, x: 26, w: 170, c: 'secondary' },
    { y: 18, x: 26, w: 112, c: 'fg', o: 40 },
    { y: 50, x: 0, w: 190, c: 'accent' },
    { y: 82, x: 26, w: 96, c: 'secondary' },
  ]
  lines.forEach((l, i) => {
    const t0 = 20 + i * 32
    layers.push(
      layer(ind++, `line-${i}`, [grp('l', [rect(l.w, 13, 6.5, [l.w / 2, 0]), fill(l.c, l.o ?? 100)])],
        ks({
          p: [200 - 120 + l.x, 200 + l.y, 0],
          s: keys([[0, [0, 100, 100], 1], [t0, [0, 100, 100]], [t0 + 26, [100, 100, 100]]]),
          o: keys([[0, 100], [262, 100], [292, 0], [op, 0]], 'linear'),
        }), op),
    )
  })

  // window chrome
  layers.push(
    layer(ind++, 'dots', [
      grp('d1', [circle(13), fill('accent')], { p: [-122, -92] }),
      grp('d2', [circle(13), fill('secondary')], { p: [-100, -92] }),
      grp('d3', [circle(13), fill('fg', 40)], { p: [-78, -92] }),
      grp('bar', [poly([[-150, -68], [150, -68]]), stroke('fg', 3, 18)]),
    ], ks({ p: [200, 200, 0] }), op),
  )
  layers.push(
    layer(ind++, 'window', [grp('w', [rect(W, H, 24), fill('card'), stroke('fg', 4, 32)])], ks({ p: [200, 200, 0] }), op),
  )
  return comp('code', op, layers)
}

// ─────────────────────────────────────────────────────────────
// 2. Data chart: bars grow, a trend line draws across the tops, end dot pulses.
function chart() {
  const op = 300
  const base = 312
  const xs = [-108, -54, 0, 54, 108]
  const hs = [62, 104, 84, 144, 188]
  const layers = []
  let ind = 1
  const fadeOut = keys([[0, 100], [262, 100], [288, 0], [op, 0]], 'linear')

  // pulse rings + end dot
  const endX = 200 + xs[4], endY = base - hs[4] - 22
  layers.push(
    layer(ind++, 'ring', [grp('r', [circle(30), stroke('accent', 4)])],
      ks({
        p: [endX, endY, 0],
        s: keys([[0, [0, 0, 100], 1], [176, [40, 40, 100]], [214, [230, 230, 100]], [215, [40, 40, 100]], [252, [230, 230, 100]], [253, [0, 0, 100], 1]], 'linear'),
        o: keys([[0, 0, 1], [176, 80], [214, 0], [215, 80], [252, 0]], 'linear'),
      }), op),
  )
  layers.push(
    layer(ind++, 'dot', [grp('d', [circle(22), fill('accent'), stroke('card', 5)])],
      ks({ p: [endX, endY, 0], s: pop(160, 262, 100, 16) }), op),
  )

  // trend line
  const pts = xs.map((x, i) => [x, -hs[i] - 22])
  layers.push(
    layer(ind++, 'trend', [grp('t', [poly(pts), trim(0, keys([[0, 0, 1], [96, 0], [166, 100]])), stroke('fg', 6, 85)])],
      ks({ p: [200, base, 0], o: fadeOut }), op),
  )

  // bars
  xs.forEach((x, i) => {
    const t0 = 12 + i * 14
    layers.push(
      layer(ind++, `bar-${i}`, [grp('b', [rect(40, hs[i], 11, [0, -hs[i] / 2]), fill(i % 2 ? 'secondary' : 'accent')])],
        ks({
          p: [200 + x, base, 0],
          s: keys([[0, [100, 0, 100], 1], [t0, [100, 0, 100]], [t0 + 34, [100, 100, 100]]], 'back'),
          o: fadeOut,
        }), op),
    )
  })

  // axes + grid
  const grid = [-60, -10, 40].map((y, i) => grp(`g${i}`, [poly([[-150, y + 14], [150, y + 14]]), stroke('fg', 2, 12)]))
  layers.push(
    layer(ind++, 'axes', [
      ...grid,
      grp('axes', [poly([[-150, -126], [-150, 0], [160, 0]]), stroke('fg', 5, 34)]),
    ], ks({ p: [200, base, 0], o: life(4, 262, 288, op, 10) }), op),
  )
  return comp('chart', op, layers)
}

// ─────────────────────────────────────────────────────────────
// 3. Warm cup: steam wisps curl upwards, sparkles twinkle.
function cup() {
  const op = 300
  const L = 100
  const layers = []
  let ind = 1

  // sparkles
  ;[
    { x: 296, y: 168, R: 17, c: 'accent', ph: 0 },
    { x: 112, y: 150, R: 12, c: 'secondary', ph: 40 },
    { x: 274, y: 104, R: 9, c: 'secondary', ph: 70 },
  ].forEach((s, i) => {
    layers.push(
      layer(ind++, `spark-${i}`, [grp('s', [star(s.R, s.R * 0.26), fill(s.c)])],
        ks({
          p: [s.x, s.y, 0],
          s: sampled((t) => { const v = 100 * bump(t, L, s.ph); return [rnd(v), rnd(v), 100] }, op),
          r: sampled((t) => ((t + s.ph) % L) * 0.9, op),
        }), op),
    )
  })

  // steam wisps: a short segment of path travelling upwards
  const wisp = (ph, x, amp, h) => {
    const e = (u) => Math.min(100, (u / 52) * 100)
    const s = (u) => Math.max(0, ((u - 34) / 66) * 100)
    const at = (fn) => sampled((t) => rnd(fn((((t - ph) % L) + L) % L)), op)
    return layer(ind++, `steam-${x}`, [
      grp('w', [
        bez([[0, 0], [0, -h / 2], [0, -h]], [[0, 0], [-amp, amp * 0.9], [amp, amp * 0.9]], [[-amp, -amp * 0.9], [amp, -amp * 0.9], [0, 0]]),
        trim(at(s), at(e)),
        stroke('secondary', 9, 85),
      ]),
    ], ks({ p: [200 + x, 206, 0] }), op)
  }
  layers.push(wisp(0, -30, 18, 100))
  layers.push(wisp(34, 2, 20, 118))
  layers.push(wisp(68, 32, 16, 96))

  // mug
  layers.push(layer(ind++, 'gloss', [grp('g', [rect(14, 56, 7), fill('card', 30)])], ks({ p: [162, 262, 0] }), op))
  layers.push(layer(ind++, 'mug', [grp('m', [rect(128, 98, 30), fill('accent')])], ks({ p: [200, 264, 0] }), op))
  layers.push(layer(ind++, 'handle', [grp('h', [circle(54), stroke('accent', 14)])], ks({ p: [270, 262, 0] }), op))
  layers.push(layer(ind++, 'saucer', [grp('s', [rect(214, 15, 7.5), fill('fg', 32)])], ks({ p: [200, 322, 0] }), op))
  return comp('cup', op, layers)
}

// ─────────────────────────────────────────────────────────────
// 4. Web app icon: browser window assembles, cursor clicks.
function app() {
  const op = 300
  const layers = []
  let ind = 1
  const out = keys([[0, 100], [262, 100], [290, 0], [op, 0]], 'linear')

  // click ripple
  layers.push(
    layer(ind++, 'ripple', [grp('r', [circle(34), stroke('accent', 5)])],
      ks({
        p: [252, 214, 0],
        s: keys([[0, [0, 0, 100], 1], [152, [30, 30, 100]], [190, [200, 200, 100]], [191, [0, 0, 100], 1]], 'ease'),
        o: keys([[0, 0, 1], [152, 100], [190, 0]], 'linear'),
      }), op),
  )

  // cursor
  layers.push(
    layer(ind++, 'cursor',
      [grp('c', [poly([[0, 0], [0, 40], [10, 31], [17, 47], [26, 43], [19, 28], [32, 28]], true), fill('fg'), stroke('card', 5)])],
      ks({
        p: keys([[0, [338, 338, 0]], [112, [248, 208, 0]], [168, [248, 208, 0]], [214, [176, 158, 0]], [262, [176, 158, 0]], [292, [338, 338, 0]]]),
        s: keys([[0, [100, 100, 100]], [140, [100, 100, 100]], [152, [86, 86, 100]], [164, [100, 100, 100]]]),
        o: keys([[0, 0, 1], [8, 100], [262, 100], [290, 0], [op, 0]], 'linear'),
      }), op),
  )

  // content blocks
  const blocks = [
    { x: -88, y: 14, w: 66, h: 112, c: 'accent', o: 28, t: 20 },
    { x: 34, y: -28, w: 130, h: 52, c: 'secondary', o: 90, t: 40 },
    { x: -6, y: 52, w: 56, h: 38, c: 'accent', o: 100, t: 60 },
    { x: 70, y: 52, w: 56, h: 38, c: 'fg', o: 38, t: 76 },
  ]
  blocks.forEach((b, i) => {
    layers.push(
      layer(ind++, `block-${i}`, [grp('b', [rect(b.w, b.h, 12), fill(b.c, b.o)])],
        ks({ p: [200 + b.x, 205 + b.y, 0], s: pop(b.t, 262, 100, 22), o: out }), op),
    )
  })

  // chrome
  layers.push(
    layer(ind++, 'chrome', [
      grp('d1', [circle(12), fill('accent')], { p: [-104, -86] }),
      grp('d2', [circle(12), fill('secondary')], { p: [-82, -86] }),
      grp('d3', [circle(12), fill('fg', 40)], { p: [-60, -86] }),
      grp('bar', [poly([[-140, -60], [140, -60]]), stroke('fg', 6, 55)]),
    ], ks({ p: [200, 205, 0] }), op),
  )
  layers.push(layer(ind++, 'window', [grp('w', [rect(284, 224, 28), fill('card'), stroke('fg', 7, 60)])], ks({ p: [200, 205, 0] }), op))
  return comp('app', op, layers)
}

// ─────────────────────────────────────────────────────────────
// 5. API / backend icon: server stack with blinking LEDs and data packets.
function api() {
  const op = 300
  const layers = []
  let ind = 1
  const rows = [-74, 0, 74]

  // packets in (left → unit) and out (unit → right)
  rows.forEach((y, i) => {
    const t0 = 18 + i * 86
    const mk = (nm, from, to, t, c) =>
      layer(ind++, nm, [grp('p', [circle(17), fill(c)])],
        ks({
          p: keys([[0, [from, 200 + y, 0], 1], [t, [from, 200 + y, 0]], [t + 32, [to, 200 + y, 0]]]),
          o: keys([[0, 0, 1], [t, 0], [t + 6, 100], [t + 26, 100], [t + 32, 0]], 'linear'),
        }), op)
    layers.push(mk(`in-${i}`, 20, 88, t0, 'accent'))
    layers.push(mk(`out-${i}`, 312, 384, t0 + 44, 'secondary'))
  })

  // server units
  rows.forEach((y, i) => {
    const blink = (ph) => sampled((t) => (bump(t, 60, ph) > 0.5 ? 100 : 25), op, 4)
    layers.push(
      layer(ind++, `unit-${i}`, [
        grp('led1', [circle(15), fill('accent', blink(i * 20))], { p: [-84, 0] }),
        grp('led2', [circle(15), fill('secondary', blink(i * 20 + 30))], { p: [-56, 0] }),
        grp('slot', [rect(86, 11, 5.5), fill('fg', 30)], { p: [58, 0] }),
        grp('box', [rect(232, 60, 18), fill('card'), stroke('fg', 6, 60)]),
      ], ks({ p: [200, 200 + y, 0] }), op),
    )
  })
  return comp('api', op, layers)
}

// ─────────────────────────────────────────────────────────────
// 6. Rocket icon: gentle hover, flickering flame, speed streaks (launch).
function rocket() {
  const op = 240
  const layers = []
  let ind = 1

  // stars
  ;[
    { x: 92, y: 96, R: 11, ph: 0, c: 'secondary' },
    { x: 318, y: 132, R: 8, ph: 40, c: 'accent' },
    { x: 306, y: 300, R: 10, ph: 80, c: 'secondary' },
  ].forEach((s, i) => {
    layers.push(
      layer(ind++, `star-${i}`, [grp('s', [star(s.R, s.R * 0.28), fill(s.c)])],
        ks({ p: [s.x, s.y, 0], s: sampled((t) => { const v = 100 * bump(t, 80, s.ph); return [rnd(v), rnd(v), 100] }, op) }), op),
    )
  })

  // rocket (bobbing)
  const bob = (t) => 190 + 9 * Math.sin((t / 120) * TAU)
  layers.push(
    layer(ind++, 'rocket', [
      grp('flame', [poly([[-15, 50], [15, 50], [0, 96]], true), fill('secondary'), stroke('secondary', 7)],
        { a: [0, 50], p: [0, 50], s: sampled((t) => [rnd(100 - 10 * Math.sin(t * 0.55)), rnd(100 + 26 * Math.sin(t * 0.55 + 1))], op) }),
      grp('finL', [poly([[-34, 8], [-62, 56], [-34, 44]], true), fill('secondary'), stroke('secondary', 9)]),
      grp('finR', [poly([[34, 8], [62, 56], [34, 44]], true), fill('secondary'), stroke('secondary', 9)]),
      grp('window', [circle(32), fill('card'), stroke('fg', 6, 70)], { p: [0, -22] }),
      grp('body', [poly([[0, -98], [33, -30], [33, 42], [-33, 42], [-33, -30]], true), fill('accent'), stroke('accent', 14)]),
    ], ks({ p: sampled((t) => [200, rnd(bob(t)), 0], op), r: sampled((t) => rnd(2.5 * Math.sin((t / 120) * TAU + 1)), op) }), op),
  )

  // speed streaks falling away from the engine
  ;[-46, 0, 46].forEach((x, i) => {
    const L = 90, ph = i * 30
    const u = (t) => ((t + ph) % L) / L
    layers.push(
      layer(ind++, `streak-${i}`, [grp('s', [poly([[0, 0], [0, 38]]), stroke('fg', 6, 100)])],
        ks({
          p: sampled((t) => [200 + x, rnd(300 + 60 * u(t)), 0], op),
          o: sampled((t) => rnd(55 * Math.sin(Math.PI * u(t))), op),
        }), op),
    )
  })
  return comp('rocket', op, layers)
}

// ─────────────────────────────────────────────────────────────
// 7. AI icon: breathing spark, orbiting dot, twinkling stars.
function ai() {
  const op = 300
  const layers = []
  let ind = 1
  const cx = 186, cy = 206

  layers.push(
    layer(ind++, 'twinkle-a', [grp('s', [star(40, 10), fill('secondary')])],
      ks({ p: [292, 120, 0], s: sampled((t) => { const v = 70 + 30 * bump(t, 100, 10); return [rnd(v), rnd(v), 100] }, op), r: keys([[0, 0], [op, 90]], 'linear') }), op),
  )
  layers.push(
    layer(ind++, 'twinkle-b', [grp('s', [star(24, 6), fill('fg', 70)])],
      ks({ p: [300, 290, 0], s: sampled((t) => { const v = 60 + 40 * bump(t, 75, 30); return [rnd(v), rnd(v), 100] }, op), r: keys([[0, 0], [op, -90]], 'linear') }), op),
  )
  // orbiting dot
  layers.push(
    layer(ind++, 'orbit', [grp('dot', [circle(20), fill('accent'), stroke('card', 4)], { p: [128, 0] })],
      ks({ p: [cx, cy, 0], r: keys([[0, 0], [op, 360]], 'linear') }), op),
  )
  layers.push(layer(ind++, 'ring', [grp('r', [circle(256), stroke('fg', 3, 22)])], ks({ p: [cx, cy, 0] }), op))
  // main spark
  layers.push(
    layer(ind++, 'spark', [grp('s', [star(92, 22), fill('accent'), stroke('accent', 10)])],
      ks({
        p: [cx, cy, 0],
        s: sampled((t) => { const v = 100 + 9 * Math.sin((t / op) * TAU * 2); return [rnd(v), rnd(v), 100] }, op),
        r: keys([[0, 0], [op, 90]], 'linear'),
      }), op),
  )
  return comp('ai', op, layers)
}

// ─────────────────────────────────────────────────────────────
// 8. Paper plane flying along a curved trail (contact / enquiry).
function plane() {
  const op = 300
  const layers = []
  let ind = 1
  const X = (u) => -140 + 280 * u
  const Y = (u) => 70 - 150 * Math.sin(Math.PI * u) * (1 - 0.25 * u)
  const trail = Array.from({ length: 41 }, (_, i) => [rnd(X(i / 40)), rnd(Y(i / 40))])

  layers.push(
    layer(ind++, 'plane', [
      grp('wing2', [poly([[2, 12], [58, -40], [22, 42]], true), fill('secondary'), stroke('secondary', 6)]),
      grp('wing1', [poly([[-54, -8], [58, -40], [2, 12]], true), fill('accent'), stroke('accent', 6)]),
    ], ks({
      p: sampled((t) => { const u = t / op; return [rnd(200 + X(u)), rnd(200 + Y(u)), 0] }, op),
      r: sampled((t) => {
        const u = t / op
        const dy = -150 * Math.PI * Math.cos(Math.PI * u) * (1 - 0.25 * u) + 150 * 0.25 * Math.sin(Math.PI * u)
        return rnd((Math.atan2(dy, 280) * 180) / Math.PI + 35)
      }, op),
      o: keys([[0, 0], [22, 100], [262, 100], [290, 0], [op, 0]], 'linear'),
    }), op),
  )
  layers.push(
    layer(ind++, 'trail', [grp('t', [poly(trail), trim(
      sampled((t) => rnd(Math.max(0, ((t / op - 0.3) / 0.7) * 100)), op),
      sampled((t) => rnd(Math.min(100, (t / op) * 100)), op),
    ), stroke('fg', 4, 34)])], ks({ p: [200, 200, 0] }), op),
  )
  ;[{ x: 120, y: 120, R: 11, ph: 0, c: 'secondary' }, { x: 290, y: 300, R: 9, ph: 50, c: 'accent' }].forEach((s, i) => {
    layers.push(
      layer(ind++, `sp-${i}`, [grp('s', [star(s.R, s.R * 0.28), fill(s.c)])],
        ks({ p: [s.x, s.y, 0], s: sampled((t) => { const v = 100 * bump(t, 100, s.ph); return [rnd(v), rnd(v), 100] }, op) }), op),
    )
  })
  return comp('plane', op, layers)
}

// ─────────────────────────────────────────────────────────────
// 9. Success tick (plays once): ring draws, tick draws, confetti bursts.
function check() {
  const op = 96
  const layers = []
  let ind = 1

  // confetti
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU + 0.2
    const R = 150
    layers.push(
      layer(ind++, `conf-${i}`, [grp('c', i % 2 ? [star(11, 3), fill('secondary')] : [circle(11), fill('accent')])],
        ks({
          p: keys([[0, [200, 200, 0], 1], [38, [200, 200, 0]], [84, [rnd(200 + Math.cos(a) * R), rnd(200 + Math.sin(a) * R), 0]]]),
          s: keys([[0, [0, 0, 100], 1], [38, [0, 0, 100]], [54, [100, 100, 100]], [op, [0, 0, 100]]]),
        }), op),
    )
  }
  layers.push(
    layer(ind++, 'tick', [grp('t', [poly([[-46, 6], [-14, 38], [48, -30]]), trim(0, keys([[0, 0, 1], [26, 0], [50, 100]])), stroke('accent', 18)])],
      ks({ p: [200, 200, 0], s: keys([[0, [100, 100, 100]], [50, [100, 100, 100]], [62, [114, 114, 100]], [76, [100, 100, 100]]]) }), op),
  )
  layers.push(
    layer(ind++, 'ring', [grp('r', [circle(224), trim(0, keys([[0, 0, 1], [2, 0], [30, 100]])), stroke('accent', 14)])],
      ks({ p: [200, 200, 0] }), op),
  )
  layers.push(
    layer(ind++, 'disc', [grp('d', [circle(214), fill('accent', 14)])],
      ks({ p: [200, 200, 0], s: keys([[0, [0, 0, 100], 1], [12, [0, 0, 100]], [40, [100, 100, 100]]], 'back') }), op),
  )
  return comp('check', op, layers)
}

export const library = { code, chart, cup, app, api, rocket, ai, plane, check }
