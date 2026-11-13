import { Github, Linkedin, Mail } from 'lucide-react'
import { nav, profile } from '../data'
import { Logo } from './ui'

export default function Footer() {
  return (
    <footer className="border-t border-line pb-8 pt-14">
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {profile.title} based in {profile.location}. Building intelligent systems that solve real problems.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { href: profile.github, icon: Github, label: 'GitHub' },
                { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label} className="rounded-lg border border-line p-2.5 text-muted transition hover:border-accent/50 hover:text-accent">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Navigate</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="text-muted transition hover:text-accent">{n.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li><a href={`mailto:${profile.email}`} className="break-all transition hover:text-accent">{profile.email}</a></li>
              <li>{profile.phone}</li>
              <li><a href={profile.cv} download className="transition hover:text-accent">Download CV →</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="font-mono">
            Press <kbd className="rounded border border-line px-1.5 py-0.5">Ctrl</kbd> + <kbd className="rounded border border-line px-1.5 py-0.5">K</kbd> to navigate
          </p>
        </div>
      </div>
    </footer>
  )
}
