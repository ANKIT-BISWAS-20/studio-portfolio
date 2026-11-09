// ─────────────────────────────────────────────────────────────
//  PHOTOS (copyright-free)
//
//  All of these are from Unsplash and are free to use, including commercially,
//  with no permission or attribution required (https://unsplash.com/license).
//  Credits are still shown in the footer as a courtesy.
//
//  To swap one: open the photo on Unsplash, copy the long id from its image
//  address (the part after "photo-"), and paste it as `id`.
// ─────────────────────────────────────────────────────────────

export const photos = {
  night: {
    id: '1759662011366-8a743eae9649',
    alt: 'Developer hands typing on a keyboard in a dark office, code on the screens',
    by: 'Jakub Żerdzicki',
    page: 'https://unsplash.com/photos/8ljjFxQFwKM',
  },
  code: {
    id: '1509966756634-9c23dd6e6815',
    alt: 'Laptop on a dark desk showing lines of code',
    by: 'AltumCode',
    page: 'https://unsplash.com/photos/zE007SNgcdE',
  },
  learn: {
    id: '1763568258330-039d2f3dfc76',
    alt: 'Laptop screen displaying lines of code',
    by: 'Daniil Komov',
    page: 'https://unsplash.com/photos/Kv1cP82tyDw',
  },
  dash: {
    id: '1551288049-bebda4e38f71',
    alt: 'Performance analytics graphs on a laptop screen',
    by: 'Luke Chesser',
    page: 'https://unsplash.com/photos/JKUTrJ4vK00',
  },
  cafe: {
    id: '1658386321892-7139f2e6d5cb',
    alt: 'Warm café interior with a bar, stools and shelves',
    by: 'Sergei Tokarev',
    page: 'https://unsplash.com/photos/0eSXkdm0lm4',
  },
}

/** Resolves a photo key (e.g. 'code') to a sized Unsplash URL. Full http(s) URLs pass through. */
export function photoSrc(keyOrUrl, width = 900) {
  if (/^https?:\/\//.test(keyOrUrl)) return keyOrUrl
  const p = photos[keyOrUrl]
  if (!p) return ''
  return `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&w=${width}&q=70`
}

/** src + srcSet so phones download the small version. */
export function photoSet(keyOrUrl) {
  if (/^https?:\/\//.test(keyOrUrl)) return { src: keyOrUrl }
  return {
    src: photoSrc(keyOrUrl, 900),
    srcSet: [480, 900, 1400].map((w) => `${photoSrc(keyOrUrl, w)} ${w}w`).join(', '),
  }
}

export const photoAlt = (keyOrUrl, fallback = '') => photos[keyOrUrl]?.alt || fallback
