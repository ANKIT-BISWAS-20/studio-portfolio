import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, Magnetic } from './ui'
import Button from './Button'
import { Field, Select } from './Form'
import LottiePlayer from './LottiePlayer'
import { site, contact } from '../config'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: contact.types[0],
    budget: contact.defaultBudget,
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [cooldownUntil, setCooldownUntil] = useState(0)
  const sent = status === 'sent'

  useEffect(() => {
    if (!cooldownUntil) return undefined
    const remaining = cooldownUntil - Date.now()
    if (remaining <= 0) {
      setCooldownUntil(0)
      setStatus('idle')
      return undefined
    }
    const timeout = window.setTimeout(() => {
      setCooldownUntil(0)
      setStatus('idle')
    }, remaining)
    return () => window.clearTimeout(timeout)
  }, [cooldownUntil])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const pick = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  // Saves the enquiry through /api/contact (MongoDB). If that fails, falls back to the visitor's email app.
  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending' || status === 'sent' || status === 'limited') return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: e.target.elements.website?.value || '' }),
      })
      if (res.status === 429) {
        const retryAfter = Number(res.headers.get('Retry-After')) || 600
        setCooldownUntil(Date.now() + retryAfter * 1000)
        setStatus('limited')
        return
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setCooldownUntil(Date.now() + 10 * 60 * 1000)
      setStatus('sent')
    } catch {
      setStatus('error')
      const l = contact.labels
      const subject = encodeURIComponent(contact.mailSubject.replace('{type}', form.type))
      const body = encodeURIComponent(
        `${l.name}: ${form.name}\n${l.email}: ${form.email}\n${l.type}: ${form.type}\n${l.budget}: ${form.budget}\n\n${form.message}`,
      )
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div>
          <Reveal>
            <p className="eyebrow mono">{contact.eyebrow}</p>
            <h2 className="display h2 big">
              {contact.title} <span className="grad-text">{contact.accent}</span>
            </h2>
            <p className="lede">
              {contact.lede} {site.responseTime}.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="contact-links">
            <a className="contact-link" href={`mailto:${site.email}`} data-cursor>{site.email}</a>
            {site.phone && (
              <a className="contact-link" href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} data-cursor>{site.phone}</a>
            )}
            {site.whatsapp && (
              <a className="contact-link" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" data-cursor>
                WhatsApp us
              </a>
            )}
          </Reveal>

          <p className="contact-person mono">
            {site.contactPerson.name} · {site.contactPerson.role}
          </p>

          <div className="contact-lottie" aria-hidden>
            <LottiePlayer id="contact" />
          </div>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="relative grid gap-4 rounded-[20px] border border-line bg-card p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:gap-5 sm:p-8"
          >
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <Field label={contact.labels.name} name="name" required value={form.name} onChange={set('name')} autoComplete="name" />
            <Field label={contact.labels.email} name="email" type="email" required value={form.email} onChange={set('email')} autoComplete="email" inputMode="email" />

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <Select label={contact.labels.type} value={form.type} onChange={pick('type')} options={contact.types} />
              <Select label={contact.labels.budget} value={form.budget} onChange={pick('budget')} options={contact.budgets} />
            </div>

            <Field as="textarea" rows={4} label={contact.labels.message} name="message" required value={form.message} onChange={set('message')} />

            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button type="submit" disabled={status === 'sending' || sent || status === 'limited'} className="w-full sm:w-auto">
                  {status === 'sending' ? contact.sentLabel : sent ? contact.doneLabel : status === 'limited' ? contact.rateLimitLabel : contact.submitLabel}
                </Button>
              </Magnetic>
              {status === 'error' && <p className="font-mono text-xs text-accent">{contact.errorNote}</p>}
              {status === 'limited' && <p className="font-mono text-xs text-accent">{contact.rateLimitNote}</p>}
              <AnimatePresence>
                {sent && (
                  <motion.p
                    className="font-mono text-xs text-accent"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {contact.sentNote}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {sent && (
                <motion.div
                  className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 sm:-right-5 sm:-top-5 sm:h-24 sm:w-24"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LottiePlayer id="success" />
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
