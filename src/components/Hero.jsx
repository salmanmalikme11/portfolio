import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import NeuralBackground from './NeuralBackground'
import { profile } from '../data'

function useTyping(words, speed = 75, pause = 1700) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setI((n) => n + 1)
      return
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? speed / 2 : speed,
    )
    return () => clearTimeout(t)
  }, [text, deleting, i, words, speed, pause])

  return text
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const K = ({ children }) => <span className="text-accent2">{children}</span>
const S = ({ children }) => <span className="text-emerald-500 dark:text-emerald-400">{children}</span>
const F = ({ children }) => <span className="text-accent">{children}</span>
const C = ({ children }) => <span className="text-muted/70">{children}</span>

function CodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden lg:block"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 to-accent2/30 opacity-60 blur-2xl" />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="card relative overflow-hidden bg-surface/80 shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-muted">salman.py</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
          <code>
            <K>class</K> <F>Engineer</F>:{'\n'}
            {'    '}name = <S>"Salman Ahmed"</S>{'\n'}
            {'    '}role = <S>"AI Engineer"</S>{'\n'}
            {'    '}based_in = <S>"Islamabad, PK"</S>{'\n'}
            {'    '}focus = [<S>"CV"</S>, <S>"ML"</S>, <S>"NLP"</S>, <S>"Backend"</S>]{'\n'}
            {'    '}stack = [<S>"Python"</S>, <S>"TensorFlow"</S>, <S>"OpenCV"</S>,{'\n'}
            {'             '}<S>"FastAPI"</S>, <S>"React"</S>, <S>"ASP.NET"</S>]{'\n'}
            {'\n'}
            {'    '}<K>def</K> <F>build</F>(self, idea):{'\n'}
            {'        '}<C># model + backend + ui → shipped</C>{'\n'}
            {'        '}<K>return</K> <F>ship</F>(idea, quality=<S>"production"</S>){'\n'}
          </code>
        </pre>
      </motion.div>

      {['Computer Vision', 'Machine Learning', 'NLP'].map((t, i) => (
        <motion.span
          key={t}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, i % 2 ? 8 : -8, 0] }}
          transition={{ opacity: { delay: 1 + i * 0.15 }, scale: { delay: 1 + i * 0.15 }, y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' } }}
          className={`card absolute px-3 py-1.5 font-mono text-xs shadow-lg ${
            ['-left-10 top-8', '-right-6 top-1/2', 'left-6 -bottom-5'][i]
          }`}
        >
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
          {t}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default function Hero() {
  const typed = useTyping(profile.roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28">
      <div className="grid-bg absolute inset-0" />
      <NeuralBackground />
      <div className="pointer-events-none absolute -top-48 left-1/4 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-[420px] w-[420px] rounded-full bg-accent2/20 blur-[130px]" />

      <div className="wrap relative z-10 grid items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.h1 {...fade(0.2)} className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm <br className="sm:hidden" />
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p {...fade(0.3)} className="mt-5 h-8 font-mono text-lg text-muted sm:text-xl">
            <span className="text-accent">&gt;</span> {typed}
            <span className="ml-0.5 inline-block w-2 animate-pulse text-accent">▍</span>
          </motion.p>

          <motion.p {...fade(0.4)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div {...fade(0.5)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary group">
              View my work <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={profile.cv} download className="btn-ghost">
              <Download size={16} /> Download CV
            </a>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: profile.github, icon: Github, label: 'GitHub' },
                { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="rounded-xl p-3 text-muted transition hover:-translate-y-0.5 hover:bg-surface hover:text-accent"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <CodeCard />
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.4 }, y: { duration: 2, repeat: Infinity } }}
          className="block text-muted hover:text-accent"
        >
          <ChevronDown size={26} />
        </motion.a>
      </div>
    </section>
  )
}
