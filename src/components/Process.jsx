import { Reveal, SectionHeading, SpotlightCard } from './ui'
import { workProcess } from '../data'

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading index="04" title="How I Work" subtitle="A simple, repeatable process from idea to a system that runs in production." />

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line behind the cards on large screens */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block" />

          {workProcess.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={i * 0.1}>
                <SpotlightCard className="h-full bg-surface/90 p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-gradient-to-br from-accent to-accent2 p-2.5 text-white shadow-lg shadow-accent/20">
                      <Icon size={20} />
                    </span>
                    <span className="font-display text-4xl font-bold text-line">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
