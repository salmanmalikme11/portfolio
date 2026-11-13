import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Command, Menu, Moon, Sun, X } from 'lucide-react'
import { nav } from '../data'
import { Logo } from './ui'

export default function Navbar({ theme, toggleTheme, openPalette }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['home', ...nav.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-accent2" />
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'pt-3' : 'pt-5'}`}>
        <div className="wrap">
          <nav
            className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
              scrolled ? 'border-line bg-surface/70 shadow-lg shadow-black/5 backdrop-blur-xl' : 'border-transparent'
            }`}
          >
            <Logo />

            <ul className="hidden items-center gap-1 md:flex">
              {nav.map((n) => (
                <li key={n.id} className="relative">
                  <a
                    href={`#${n.id}`}
                    className={`relative z-10 block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      active === n.id ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {n.label}
                  </a>
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-lg bg-accent/10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <button
                onClick={openPalette}
                className="hidden items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs text-muted transition hover:border-accent/50 hover:text-fg sm:flex"
                aria-label="Open command palette"
              >
                <Command size={13} /> K
              </button>
              <button onClick={toggleTheme} className="rounded-lg p-2 text-muted transition hover:bg-accent/10 hover:text-fg" aria-label="Toggle theme">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
              <a href="#contact" className="ml-1 hidden rounded-lg bg-gradient-to-r from-accent to-accent2 px-4 py-2 text-sm font-medium text-white shadow-md shadow-accent/20 transition hover:-translate-y-0.5 lg:block">
                Let's talk
              </a>
              <button onClick={() => setOpen((o) => !o)} className="rounded-lg p-2 text-muted hover:text-fg md:hidden" aria-label="Menu">
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="card mt-2 overflow-hidden bg-surface/95 p-2 shadow-xl backdrop-blur-xl md:hidden"
              >
                {nav.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-sm ${active === n.id ? 'bg-accent/10 text-fg' : 'text-muted'}`}
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
