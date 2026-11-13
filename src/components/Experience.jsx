import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { Reveal, SectionHeading, SpotlightCard } from './ui'
import { experience } from '../data'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading index="02" title="Experience" subtitle="Where I've worked, what I owned, and what I shipped." />

        <div ref={ref} className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-line" />
          <motion.div style={{ scaleY }} className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-accent to-accent2" />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.05} className="relative pl-14">
                <span
                  className={`absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border bg-surface ${
                    job.current ? 'border-accent text-accent shadow-[0_0_20px_rgb(var(--accent)/0.5)]' : 'border-line text-muted'
                  }`}
                >
                  <Briefcase size={17} />
                </span>
                <SpotlightCard className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                      <p className="mt-0.5 text-accent">{job.company}</p>
                    </div>
                    <span className="flex items-center gap-2 font-mono text-xs text-muted">
                      {job.current && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />}
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
