import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Copy, Download, Github, Linkedin, Mail, Moon, Search } from 'lucide-react'
import { nav, profile } from '../data'

export default function CommandPalette({ open, setOpen, toggleTheme, notify }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef(null)

  const actions = useMemo(
    () => [
      ...nav.map((n) => ({
        label: `Go to ${n.label}`,
        icon: ArrowRight,
        run: () => document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      { label: 'Copy email address', icon: Copy, run: () => navigator.clipboard.writeText(profile.email).then(() => notify('Email copied')) },
      { label: 'Send an email', icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: 'Download CV', icon: Download, run: () => window.open(profile.cv, '_blank') },
      { label: 'Toggle light / dark theme', icon: Moon, run: toggleTheme },
      { label: 'Open LinkedIn', icon: Linkedin, run: () => window.open(profile.linkedin, '_blank') },
      { label: 'Open GitHub', icon: Github, run: () => window.open(profile.github, '_blank') },
    ],
    [toggleTheme, notify],
  )

  const list = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  const run = (a) => {
    setOpen(false)
    a.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, list.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && list[index]) run(list[index])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setIndex(0)
                }}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
              {list.map((a, i) => (
                <li key={a.label}>
                  <button
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => run(a)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      i === index ? 'bg-accent/10 text-fg' : 'text-muted'
                    }`}
                  >
                    <a.icon size={16} className={i === index ? 'text-accent' : ''} />
                    {a.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
