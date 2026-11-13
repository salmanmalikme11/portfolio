import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Check } from 'lucide-react'
import Navbar from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Leadership from './components/Leadership'
import Contact from './components/Contact'
import Process from './components/Process'
import Footer from './components/Footer'
import { profile } from './data'

function OpenToWorkTicker() {
  const items = Array.from({ length: 8 }, () => ['Open to work', 'Available for projects'])
  return (
    <div className="overflow-hidden bg-gradient-to-r from-accent to-accent2 py-3 text-white">
      <div className="marquee flex w-max gap-8">
        {[...items, ...items].flat().map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-sm font-semibold uppercase tracking-widest">
            {t} <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => (document.documentElement.classList.contains('dark') ? 'dark' : 'light'))
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  const notify = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }, [])

  return (
    <>
      <Cursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} openPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} toggleTheme={toggleTheme} notify={notify} />

      <main>
        <Hero />
        {profile.available && <OpenToWorkTicker />}
        <About />
        <Experience />
        <Projects />
        <Process />
        <Skills />
        <Leadership />
        <Contact notify={notify} />
      </main>

      <Footer />

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#home"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-to-r from-accent to-accent2 p-3 text-white shadow-lg shadow-accent/30 transition hover:-translate-y-1"
          >
            <ArrowUp size={18} />
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[90] flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm shadow-xl"
          >
            <Check size={16} className="text-emerald-500" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
