# Studio Portfolio

React + Vite + Tailwind CSS + Framer Motion + Headless UI + Lottie. Font: Google Sans Flex (Google's open-source sibling of Google Sans) with Google Sans Code for labels, self-hosted via Fontsource.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Everything editable lives in `src/config/`

| File | What it controls |
| --- | --- |
| `content.js` | Studio name, email, WhatsApp, hero text and rotating words, section headings, services, projects, process, team, stats, form labels/options, page title and description |
| `theme.js` | **All colours.** Light and dark values per palette; edit a hex and the whole site updates (including Lottie animations) |
| `animations.js` | Lottie sources and cache settings |

No component code needs to change for any of these.

### Colours

`theme.js` ships with **Indigo Night** (accent `#5B5BF0`, secondary `#22D3EE`, following the visitor's device light/dark setting). To add another palette, copy the `indigo` block under a new key. When more than one palette exists, a colour switcher appears in the navbar automatically. Set `defaultMode` to `'light'`, `'dark'` or `'system'`.

### Lottie animations

Each slot in `animations.js` (hero, contact, success) takes a `url`:

1. Pick an animation on lottiefiles.com and download it as **Lottie JSON**.
2. Put the file in `public/lottie/` and use `'/lottie/hero.json'`, or paste any direct JSON link that allows cross-origin requests.
3. Leave `url` empty to use the built-in animation.

Animations are cached on first load (in memory and in the browser's Cache Storage), so repeat visits don't download them again. Bump `animationCache.name` (`v1` → `v2`) to force a refresh. Inside the LottieFiles editor, name a shape's fill/stroke `accent`, `secondary` or `fg` and it will follow your theme colours automatically.

## Contact form

By default it opens the visitor's email app with the brief pre-filled (no backend needed). To collect enquiries in a dashboard instead, create a free form on Formspree or Web3Forms and replace the `submit` function in `src/components/Contact.jsx` with a `fetch` POST to its endpoint.

## Deploy (free)

Vercel, Netlify or Cloudflare Pages: build command `npm run build`, output directory `dist`.

## Before you go live

- Don't show client work from your employer (names, screenshots, data). Use your own projects, concepts, and anything you build as a freelancer.
- Check your employment contract for moonlighting, conflict-of-interest and IP clauses.
- Keep project labels honest (`Case study`, `Personal project`, `Concept`).
