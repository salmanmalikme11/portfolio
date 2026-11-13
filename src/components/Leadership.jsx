import { Reveal, SectionHeading, SpotlightCard } from './ui'
import { leadership } from '../data'

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading index="06" title="Leadership & Achievements" subtitle="Beyond code — leading teams, running campaigns and pitching ideas." />

        <div className="grid gap-6 sm:grid-cols-2">
          {leadership.map((l, i) => {
            const Icon = l.icon
            return (
              <Reveal key={l.title + l.org} delay={i * 0.08}>
                <SpotlightCard className={`h-full p-6 sm:p-7 ${l.award ? 'border-accent/40' : ''}`}>
                  {l.award && (
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <span className={`rounded-xl p-2.5 ${l.award ? 'bg-amber-400/15 text-amber-500' : 'bg-accent/10 text-accent'}`}>
                      <Icon size={22} />
                    </span>
                    <span className="font-mono text-xs text-muted">{l.period}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{l.title}</h3>
                  <p className="mt-0.5 text-sm text-accent">{l.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{l.text}</p>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
