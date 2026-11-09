import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { paletteCss, themeBootScript } from './src/config/theme.js'
import { site, services, hero } from './src/config/content.js'

// Public URL: explicit env var > Vercel's production domain > the value in content.js
const siteUrl = (
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url)
).replace(/\/+$/, '')

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (path) => (/^https?:\/\//.test(path) ? path : `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`)

/** Structured data (JSON-LD) so search engines understand who and what this site is. */
function structuredData() {
  const logo = { '@type': 'ImageObject', '@id': `${siteUrl}/#logo`, url: abs('/icon-512.png'), width: 512, height: 512 }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${siteUrl}/#org`,
        name: site.name,
        url: `${siteUrl}/`,
        logo,
        image: abs(site.seo.image),
        description: site.seo.description,
        email: site.email,
        telephone: site.phone,
        contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', name: site.contactPerson.name, email: site.email, telephone: site.phone },
        ...(site.seo.sameAs?.length ? { sameAs: site.seo.sameAs } : {}),
        knowsAbout: services.flatMap((s) => s.tags),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.desc },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: site.name,
        inLanguage: 'en',
        publisher: { '@id': `${siteUrl}/#org` },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: site.seo.title,
        description: site.seo.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#org` },
        primaryImageOfPage: { '@type': 'ImageObject', url: abs(site.seo.image) },
      },
    ],
  }
}

/** Plain-HTML copy of the page's key content for crawlers and visitors that don't run JavaScript. */
function noscriptContent() {
  const list = services.map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.desc)}</li>`).join('')
  return `<noscript><main style="max-width:44rem;margin:12vh auto;padding:0 1.25rem;font-family:system-ui,sans-serif;line-height:1.6"><h1>${esc(site.name)}: ${esc(hero.title.before)} ${esc(hero.title.words.join(', '))} ${esc(hero.title.after)}</h1><p>${esc(site.seo.description)}</p><ul>${list}</ul><p>Contact: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p><p>Please enable JavaScript for the full interactive site.</p></main></noscript>`
}

// Injects colours, SEO meta tags, social cards and structured data from src/config at build time,
// and writes robots.txt + sitemap.xml, so everything lives in one place.
const configInjector = () => ({
  name: 'config-injector',
  transformIndexHtml(html) {
    const { seo } = site
    const image = abs(seo.image)
    const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
    return {
      html: html
        .replace(/<title>.*<\/title>/, `<title>${esc(seo.title)}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(seo.description)}$2`),
      tags: [
        { tag: 'style', attrs: { id: 'theme-vars' }, children: paletteCss(), injectTo: 'head-prepend' },
        { tag: 'script', children: themeBootScript(), injectTo: 'head-prepend' },
        { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
        meta({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }),
        meta({ name: 'author', content: site.name }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: site.name }),
        meta({ property: 'og:locale', content: seo.locale }),
        meta({ property: 'og:url', content: `${siteUrl}/` }),
        meta({ property: 'og:title', content: seo.title }),
        meta({ property: 'og:description', content: seo.description }),
        meta({ property: 'og:image', content: image }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: seo.imageAlt }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: seo.title }),
        meta({ name: 'twitter:description', content: seo.description }),
        meta({ name: 'twitter:image', content: image }),
        meta({ name: 'twitter:image:alt', content: seo.imageAlt }),
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(structuredData()), injectTo: 'head' },
      ],
    }
  },
  // crawler files, generated so the URL always matches the one above
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` })
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
    })
  },
})

// no-JS fallback content goes straight into <body>
const noscriptInjector = () => ({
  name: 'noscript-content',
  transformIndexHtml: { order: 'pre', handler: (html) => html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscriptContent()}`) },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), noscriptInjector(), configInjector()],
})
