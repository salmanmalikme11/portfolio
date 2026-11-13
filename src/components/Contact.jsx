import { useState } from 'react'
import { AlertCircle, Check, CheckCircle2, Copy, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Reveal, SectionHeading, SpotlightCard } from './ui'
import { profile } from '../data'

const field =
  'w-full rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20'

export default function Contact({ notify }) {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true)
      notify('Email copied')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Messages are delivered to your inbox by Web3Forms (free, no backend) using profile.formKey.
  // Without a key, falls back to opening the visitor's mail app.
  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)

    if (!profile.formKey) {
      const subject = encodeURIComponent(`Portfolio message from ${f.get('name')}`)
      const body = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.formKey,
          subject: `Portfolio message from ${f.get('name')}`,
          from_name: 'Portfolio contact form',
          name: f.get('name'),
          email: f.get('email'),
          message: f.get('message'),
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Something went wrong.')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err instanceof TypeError ? "Couldn't reach the mail server." : err.message)
      setStatus('error')
    }
  }

  const links = [
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/-/g, '')}` },
    { icon: MapPin, label: profile.location },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: Github, label: 'GitHub', href: profile.github },
  ]

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="wrap relative">
        <SectionHeading index="07" title="Get In Touch" />

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Let's build something <span className="text-gradient">intelligent</span> together.
            </h3>
            <p className="mt-4 max-w-md text-muted">
              Hiring for an AI, ML or software role, or have a project in mind? My inbox is always open. I usually reply within a day.
            </p>

            <button
              onClick={copyEmail}
              className="group mt-8 flex w-full max-w-md items-center justify-between gap-3 rounded-2xl border border-line bg-surface/60 p-4 text-left transition hover:border-accent/50"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="rounded-xl bg-accent/10 p-2.5 text-accent"><Mail size={20} /></span>
                <span className="truncate text-sm sm:text-base">{profile.email}</span>
              </span>
              <span className="shrink-0 text-muted group-hover:text-accent">{copied ? <Check size={18} /> : <Copy size={18} />}</span>
            </button>

            <ul className="mt-6 space-y-3">
              {links.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-3 text-muted transition hover:text-accent">
                      <Icon size={17} /> {label}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-muted"><Icon size={17} /> {label}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <SpotlightCard className="p-6 sm:p-8">
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-muted">Name</span>
                    <input name="name" required placeholder="Your name" className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
                    <input name="email" type="email" required placeholder="you@company.com" className={field} />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">Message</span>
                  <textarea name="message" required rows={5} placeholder="Tell me about the role or project…" className={`${field} resize-none`} />
                </label>
                <button type="submit" disabled={status === 'sending'} className="btn-primary group w-full justify-center disabled:cursor-wait disabled:opacity-70">
                  {status === 'sending' ? (
                    <>Sending… <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Send message <Send size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" /></>
                  )}
                </button>

                {status === 'sent' && (
                  <p className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={18} className="shrink-0" /> Thanks! Your message has been sent. I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>
                      {error} You can also email me directly at{' '}
                      <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>.
                    </span>
                  </p>
                )}
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
