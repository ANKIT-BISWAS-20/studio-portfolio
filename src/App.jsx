import { useEffect } from 'react'
import { useTheme } from './useTheme'
import { ScrollProgress, Cursor } from './components/ui'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Work from './components/Work'
import Showcase from './components/Showcase'
import Process from './components/Process'
import Contact from './components/Contact'
import { Brand } from './components/Logo'
import { site, animations, animationCache, photos } from './config'
import { preloadLottie } from './lib/lottie'

export default function App() {
  const { theme, toggleTheme, palette, setPalette } = useTheme()

  // warm the cache with every configured LottieFiles URL
  useEffect(() => {
    if (animationCache.preload) preloadLottie(Object.values(animations).map((a) => a.url))
  }, [])

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav theme={theme} toggleTheme={toggleTheme} palette={palette} setPalette={setPalette} />
      <main>
        <Hero />
        <Services />
        <Work />
        <Showcase />
        <Process />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-brand">
            <Brand name={site.name} size={28} />
            <span>
              © {new Date().getFullYear()} {site.name}
              {site.footerNote ? ` · ${site.footerNote}` : ''}
            </span>
          </span>
          <span className="credits">
            Photos:{' '}
            {Object.values(photos).map((p, i, all) => (
              <span key={p.page}>
                <a href={p.page} target="_blank" rel="noreferrer">{p.by}</a>
                {i < all.length - 1 ? ', ' : ''}
              </span>
            ))}{' '}
            on Unsplash
          </span>
          <a href="#top" data-cursor>Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}
