import { useState } from 'react'
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
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const pick = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  // Opens the visitor's email app with the brief pre-filled (no backend needed).
  // To receive submissions in a dashboard instead, POST to Formspree / Web3Forms here (see README).
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(contact.mailSubject.replace('{type}', form.type))
    const l = contact.labels
    const body = encodeURIComponent(
      `${l.name}: ${form.name}\n${l.email}: ${form.email}\n${l.type}: ${form.type}\n${l.budget}: ${form.budget}\n\n${form.message}`,
    )
    setSent(true)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
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
            {site.whatsapp && (
              <a className="contact-link" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" data-cursor>
                WhatsApp us
              </a>
            )}
          </Reveal>

          <div className="contact-lottie" aria-hidden>
            <LottiePlayer id="contact" />
          </div>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="relative grid gap-4 rounded-[20px] border border-line bg-card p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:gap-5 sm:p-8"
          >
            <Field label={contact.labels.name} name="name" required value={form.name} onChange={set('name')} autoComplete="name" />
            <Field label={contact.labels.email} name="email" type="email" required value={form.email} onChange={set('email')} autoComplete="email" inputMode="email" />

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <Select label={contact.labels.type} value={form.type} onChange={pick('type')} options={contact.types} />
              <Select label={contact.labels.budget} value={form.budget} onChange={pick('budget')} options={contact.budgets} />
            </div>

            <Field as="textarea" rows={4} label={contact.labels.message} name="message" required value={form.message} onChange={set('message')} className="resize-y" />

            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button type="submit" className="w-full sm:w-auto">
                  {sent ? contact.sentLabel : contact.submitLabel}
                </Button>
              </Magnetic>
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
