import { GraduationCap } from 'lucide-react'
import { Counter, Reveal, SectionHeading, SpotlightCard } from './ui'
import { education, profile, stats } from '../data'

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading index="01" title="About Me" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <p className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
                {profile.intro.split(' ').slice(0, -3).join(' ')}{' '}
                <span className="text-gradient">{profile.intro.split(' ').slice(-3).join(' ')}</span>
              </p>
            </Reveal>

            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {profile.facts.map((f) => (
                  <div key={f.label} className="bg-surface/90 p-4">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-accent">{f.label}</dt>
                    <dd className="mt-1 text-sm font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 content-start gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <SpotlightCard className="flex h-full flex-col justify-between p-6">
                  <p className="text-gradient font-display text-4xl font-bold sm:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 text-sm leading-snug text-muted">{s.label}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <SpotlightCard className="mt-12 p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-accent/10 p-2.5 text-accent"><GraduationCap size={22} /></span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{education.degree}</h3>
                  <p className="text-sm text-muted">{education.school}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-accent">{education.period}</span>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">Academic focus</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {education.focus.map((f) => <span key={f} className="chip border-accent/30 text-accent">{f}</span>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">Coursework</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {education.coursework.map((c) => <span key={c} className="chip">{c}</span>)}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
