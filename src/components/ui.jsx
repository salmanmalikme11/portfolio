import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Logo() {
  return (
    <a href="#home" aria-label="Salman Ahmed — home" className="group select-none font-mono text-lg font-semibold tracking-tight">
      <span className="text-accent transition-colors group-hover:text-accent2">&lt;</span>
      Salman
      <span className="text-accent transition-colors group-hover:text-accent2"> /&gt;</span>
    </a>
  )
}

export function SectionHeading({ index, title, subtitle }) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-sm text-accent">
        {index}. <span className="text-muted">// {title.toLowerCase()}</span>
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </Reveal>
  )
}

// Tracks the mouse so .spotlight cards can paint a glow under the cursor; optional 3D tilt.
export function SpotlightCard({ children, className = '', tilt = false, ...props }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    if (tilt) el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 6}deg)`
  }
  const onLeave = () => {
    if (tilt) ref.current.style.transform = ''
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card spotlight transition-[transform,border-color] duration-200 ease-out hover:border-accent/40 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}
