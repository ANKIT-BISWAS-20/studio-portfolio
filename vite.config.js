import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { paletteCss, themeBootScript } from './src/config/theme.js'
import { site } from './src/config/content.js'

// Injects the colour variables from src/config/theme.js, plus the page title
// and description from src/config/content.js, so they live in one place.
const configInjector = () => ({
  name: 'config-injector',
  transformIndexHtml(html) {
    return {
      html: html
        .replace(/<title>.*<\/title>/, `<title>${site.seo.title}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(")/, `$1${site.seo.description}$2`),
      tags: [
        { tag: 'style', attrs: { id: 'theme-vars' }, children: paletteCss(), injectTo: 'head-prepend' },
        { tag: 'script', children: themeBootScript(), injectTo: 'head-prepend' },
      ],
    }
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), configInjector()],
})
