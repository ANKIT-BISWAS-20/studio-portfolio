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

`theme.js` ships with six palettes: **Indigo Night** (the default and original look), Ocean, Emerald, Sunset, Rose and Amber, each with light and dark values. Visitors pick one from the colour button in the navbar; the choice is remembered on their device and a "Reset to default" button appears once they change it. To add a palette, copy one `pal(...)` line in `theme.js`. Set `defaultMode` to `'light'`, `'dark'` or `'system'`, and `defaultPalette` to change what first-time visitors see.

### Photos

`images.js` lists the copyright-free Unsplash photos used for the project cards, the service panels and the collage. Swap a photo by pasting a new Unsplash photo id. Credits appear in the footer. Project cards can also take any full image URL (`image` in `content.js`), with `imageFallback` as a backup.

### Project videos and links

Each project in `content.js` can have `video` (`youtube` or `loom`) and `links`. A video opens in a pop-up player that only loads when opened.

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

## Mobile performance notes

On phones and tablets (no mouse) the site skips the custom cursor, hero spotlight, parallax, card tilt and magnetic buttons, removes `backdrop-filter` blurs, and animates the floating chips with CSS instead of JavaScript. Test on a real device after deploying.

## Contact form → MongoDB

The enquiry form POSTs to `api/contact.js` (a Vercel serverless function), which saves each message to
database `northlight_studio`, collection `contact_submissions` (created automatically on first submit).
If saving fails, the visitor's email app opens instead.

1. Vercel → Project → Settings → Environment Variables: add `MONGODB_URI` (and optionally `MONGODB_DB`), then redeploy.
2. MongoDB Atlas → Network Access: allow `0.0.0.0/0` (Vercel has no fixed IPs).
3. Local testing needs `npm i -g vercel && vercel dev` (plain `npm run dev` doesn't serve `/api`). `.env.local` is git-ignored.
