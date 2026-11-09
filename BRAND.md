# Northlight Studio: brand notes

**Mark**: an "N" whose right stem points north to a small guiding light (the four-point spark).
**Name**: Northlight, with "Studio" set small in spaced mono capitals.

| Token | Light | Dark |
|---|---|---|
| Accent | `#5B5BF0` | `#7B7DFF` |
| Accent 2 | `#06B6D4` | `#22D3EE` |
| Ink | `#0E1020` | `#EEF0FF` |
| Surface | `#F7F8FC` | `#0B0D1A` |

Type: Google Sans Flex (display + body), Google Sans Code (labels).

Files in `public/`: `favicon.svg`, `brand/mark.svg`, `brand/mark-mono.svg`, `brand/logo-light.svg`, `brand/logo-dark.svg`,
PNG app icons, `og-image.png` (1200x630 social card). In the site the logo is `src/components/Logo.jsx` and
re-colours with the palette picker.

To rename the studio: change `site.name` in `src/config/content.js`, then update the text in the SVG files above.
