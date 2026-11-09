// ─────────────────────────────────────────────────────────────
//  LOTTIE ANIMATIONS
//
//  Each slot below can use an animation from LottieFiles.
//  1. Find one at lottiefiles.com and open it.
//  2. Download → "Lottie JSON", then host the file anywhere that allows
//     cross-origin requests (e.g. put it in /public/lottie/ and use
//     '/lottie/hero.json'), or paste a direct lottie.host / CDN JSON link.
//  3. Paste the link into `url` below.
//
//  Animations are cached after the first load (in memory + the browser's
//  Cache Storage), so repeat visits don't download them again.
//
//  If `url` is empty or fails to load, a built-in animation is used,
//  so the site never shows an empty gap.
//
//  Tip: name shapes "accent", "secondary" or "fg" inside LottieFiles'
//  editor and they'll automatically follow your theme colours.
// ─────────────────────────────────────────────────────────────

export const animations = {
  // Big animation in the hero
  hero: { url: '', fallback: 'orbit', loop: true, still: 120 },
  // Paper plane next to the contact heading
  contact: { url: '', fallback: 'plane', loop: true, still: 150 },
  // Plays once after the enquiry form is submitted
  success: { url: '', fallback: 'check', loop: false, still: 95 },

  // "Craft" section cards
  craftCode: { url: '', fallback: 'code', loop: true, still: 240 },
  craftData: { url: '', fallback: 'chart', loop: true, still: 210 },
  craftDesign: { url: '', fallback: 'cup', loop: true, still: 120 },

  // Service row icons + panel badges
  svcApp: { url: '', fallback: 'app', loop: true, still: 140 },
  svcApi: { url: '', fallback: 'api', loop: true, still: 120 },
  svcSite: { url: '', fallback: 'rocket', loop: true, still: 60 },
  svcAi: { url: '', fallback: 'ai', loop: true, still: 40 },
}

export const animationCache = {
  preload: true, // fetch + cache all animation URLs on page load
  name: 'lottie-cache-v2', // bump (v2, v3…) to force everyone to re-download
}
