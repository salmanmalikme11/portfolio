import { Reveal, SectionHeading, SpotlightCard } from './ui'
import { marquee, skillGroups } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading index="05" title="Skills & Stack" subtitle="The tools I reach for when turning data and ideas into working systems." />

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((g, i) => {
            const Icon = g.icon
            return (
              <Reveal key={g.title} delay={i * 0.08}>
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 p-2.5 text-accent"><Icon size={22} /></span>
                    <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-line bg-bg/50 px-3 py-1.5 text-sm text-muted transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>

      <div className="marquee-wrap relative mt-16 overflow-hidden border-y border-line bg-surface/40 py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee flex w-max gap-10">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-xl font-semibold text-muted/70 sm:text-2xl">
              {t}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
