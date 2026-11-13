import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, X } from 'lucide-react'
import { SectionHeading, SpotlightCard } from './ui'
import { projects } from '../data'

const filters = ['All', ...new Set(projects.map((p) => p.category))]
const pad = (n) => String(n).padStart(2, '0')

// Full details: screenshots (or the cover), metrics, problem / solution / role, links.
function ProjectModal({ project, onClose }) {
  const gallery = project.images.length ? project.images : [project.cover]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-surface shadow-2xl"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70">
          <X size={18} />
        </button>

        <img src={gallery[active]} alt={`${project.title} preview`} className="aspect-video w-full bg-black object-contain" />
        {gallery.length > 1 && (
          <div className="flex gap-2 px-6 pt-4 sm:px-8">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`h-12 w-20 overflow-hidden rounded-lg border-2 transition ${i === active ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <p className="font-mono text-xs text-accent">{project.category}</p>
          <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{project.title}</h3>

          {project.metrics.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-6 rounded-2xl border border-line bg-bg/50 p-4">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-gradient font-display text-2xl font-bold">{m.value}</p>
                  <p className="text-xs text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          <dl className="mt-6 space-y-4 text-sm leading-relaxed sm:text-[15px]">
            {[
              ['Problem', project.problem],
              ['Solution', project.solution],
              ['Role', project.role],
            ].map(([label, text]) => (
              <div key={label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-accent">{label}</dt>
                <dd className="mt-1 text-muted">{text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>

          {(project.github || project.live) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary">{project.liveLabel || 'View live'} <ArrowUpRight size={16} /></a>}
              {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16} /> Source code</a>}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, number, onOpen }) {
  return (
    <SpotlightCard
      tilt
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      className="group flex h-full cursor-pointer flex-col overflow-hidden"
    >
      <div className="relative overflow-hidden border-b border-line">
        <img src={project.cover} alt="" loading="lazy" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur">{pad(number)}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] text-accent">{project.category}</p>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
          {project.stack.length > 3 && <span className="chip text-[11px]">+{project.stack.length - 3}</span>}
        </div>

        <div className="mt-5 flex min-h-[46px] items-center justify-between border-t border-line pt-3 text-sm">
          <span className="flex items-center gap-1 text-muted transition group-hover:text-accent">
            View details <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} source code`}
              className="rounded-lg p-1.5 text-muted transition hover:bg-accent/10 hover:text-accent"
            >
              <Github size={17} />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const shown = projects.filter((p) => filter === 'All' || p.category === filter)

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading index="03" title="Selected Work" subtitle="Things I've built, from fine-tuned LLMs to computer vision and backend systems. Click a card for the full story." />

        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${filter === f ? 'text-white' : 'text-muted hover:text-fg'}`}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent2" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={p} number={projects.indexOf(p) + 1} onOpen={() => setSelected(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}
