import { useEffect } from 'react'
import { useTheme } from './useTheme'
import { ScrollProgress, Cursor } from './components/ui'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import Contact from './components/Contact'
import { site, animations, animationCache } from './config'
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
        <Process />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} {site.name}
            {site.footerNote ? ` · ${site.footerNote}` : ''}
          </span>
          <a href="#top" data-cursor>Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}
