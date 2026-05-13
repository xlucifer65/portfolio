'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name needs at least 2 characters.'),
  email: z.string().email('That email looks off.'),
  reason: z.string().min(1, 'Please pick a reason.'),
  message: z.string().min(20, 'Say a bit more — at least 20 characters.'),
})

type FormData = z.infer<typeof schema>

const reasons = [
  { value: 'work', label: '💼  Work / Collaboration' },
  { value: 'consultation', label: '🧠  Consultation' },
  { value: 'france', label: '🇫🇷  France Experience' },
  { value: 'woxsen', label: '🎓  Woxsen Experience' },
  { value: 'general', label: '☕  General Conversation' },
  { value: 'other', label: '✨  Other' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputBase = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--line)',
  color: 'var(--fg)',
  fontSize: '14px',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'border-color 160ms',
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong.')
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error. Try emailing directly.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '140px',
        paddingBottom: '140px',
      }}
    >
      {/* Giant gradient orb */}
      <div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px',
          borderRadius: '50%',
          background: 'var(--grad-shift)',
          backgroundSize: '200% 200%',
          filter: 'blur(130px)',
          opacity: 0.22,
          animation: 'gradient-shift 8s ease infinite, float 10s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <div className="container-max px-6 sm:px-8" style={{ position: 'relative', zIndex: 1 }}>
        {/* Display header */}
        <AnimatedSection className="text-center mb-14">
          <div className="eyebrow mb-5">// say hi</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(48px, 7vw, 88px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: '20px',
            }}
          >
            Let&apos;s build{' '}
            <span className="t-grad">something good.</span>
          </h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '18px', lineHeight: 1.6, maxWidth: '48ch', margin: '0 auto' }}>
            Drop a line. I read every message — usually back within 24 hours.
            Work, conversations, France thoughts, anything.
          </p>
        </AnimatedSection>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-4xl mx-auto">
          {/* Left info */}
          <AnimatedSection direction="left" className="space-y-5">
            {[
              {
                label: 'Work & Collaboration',
                value: 'rayyanahemad04@gmail.com',
                note: 'For professional stuff, projects, builds',
                icon: '💼',
              },
              {
                label: 'Everything Else',
                value: 'xlucifer65@gmail.com',
                note: 'Conversations, France, Woxsen, life',
                icon: '☕',
              },
            ].map(({ label, value, note, icon }) => (
              <div
                key={label}
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ fontSize: '22px', flexShrink: 0, marginTop: '2px' }}>{icon}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--fg)', marginBottom: '2px' }}>{label}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-1)', marginBottom: '4px' }}>{value}</p>
                  <p style={{ fontSize: '12px', color: 'var(--fg-3)' }}>{note}</p>
                </div>
              </div>
            ))}

            <p
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'var(--fg-3)', lineHeight: 1.6,
                padding: '16px',
                background: 'rgba(99,102,241,0.05)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: '12px',
              }}
            >
              // The form routes automatically — pick your reason<br />
              // and I&apos;ll get it in the right inbox.
            </p>
          </AnimatedSection>

          {/* Right form */}
          <AnimatedSection direction="right">
            <div
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--line)',
                borderRadius: '24px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner glow */}
              <div
                style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '200px', height: '200px',
                  background: 'var(--accent-1)',
                  filter: 'blur(80px)', opacity: 0.06,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-4"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 280 }}>
                      <CheckCircle2 size={52} style={{ color: '#34d399' }} />
                    </motion.div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px' }}>Message sent!</h3>
                    <p style={{ color: 'var(--fg-2)', fontSize: '14px', maxWidth: '32ch' }}>
                      Got it. I usually reply within a day or two. Thanks for reaching out.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', marginBottom: '6px' }}>Name</label>
                      <input
                        {...register('name')}
                        placeholder="Your name"
                        style={{
                          ...inputBase,
                          borderColor: errors.name ? 'rgba(239,68,68,0.5)' : 'var(--line)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)' }}
                        onBlur={(e) => { e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.5)' : 'var(--line)' }}
                      />
                      {errors.name && <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', marginBottom: '6px' }}>Email</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        style={{
                          ...inputBase,
                          borderColor: errors.email ? 'rgba(239,68,68,0.5)' : 'var(--line)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)' }}
                        onBlur={(e) => { e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.5)' : 'var(--line)' }}
                      />
                      {errors.email && <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>}
                    </div>

                    {/* Reason */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', marginBottom: '6px' }}>Why are you reaching out?</label>
                      <select
                        {...register('reason')}
                        defaultValue=""
                        style={{
                          ...inputBase,
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundColor: 'var(--bg)',
                          borderColor: errors.reason ? 'rgba(239,68,68,0.5)' : 'var(--line)',
                        }}
                      >
                        <option value="" disabled>Pick a reason...</option>
                        {reasons.map(({ value, label }) => (
                          <option key={value} value={value} style={{ background: 'var(--bg-2)' }}>{label}</option>
                        ))}
                      </select>
                      {errors.reason && <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>{errors.reason.message}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', marginBottom: '6px' }}>Message</label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="What's on your mind?"
                        style={{
                          ...inputBase,
                          resize: 'none',
                          borderColor: errors.message ? 'rgba(239,68,68,0.5)' : 'var(--line)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)' }}
                        onBlur={(e) => { e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.5)' : 'var(--line)' }}
                      />
                      {errors.message && <p style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>{errors.message.message}</p>}
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 p-3 rounded-xl text-sm"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
                      >
                        <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '1px' }} />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={status !== 'loading' ? { y: -2 } : {}}
                      whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
                      className="btn-grad w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {status === 'loading' ? (
                        <><Loader2 size={15} className="animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={14} /> Send message</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
