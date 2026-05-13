'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MessageSquare } from 'lucide-react'
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

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

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
    <section id="contact" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase mb-3 block">
            Say Hello
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
            Let&apos;s Talk
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Whether it&apos;s work, a question about France, or you just want to talk about
            invoices — I read every message. Usually reply too.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — info */}
          <AnimatedSection direction="left" className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-2xl mb-3">Before you reach out</h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m open to interesting conversations. Work, collaborations, consulting,
                sharing experiences about living in France, talking about Woxsen, or just general
                life. Pick what fits.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: Mail,
                  label: 'Work & Collaboration',
                  value: 'rayyanahemad04@gmail.com',
                  note: 'For professional stuff',
                },
                {
                  icon: MessageSquare,
                  label: 'Everything Else',
                  value: 'xlucifer65@gmail.com',
                  note: 'For literally everything else',
                },
              ].map(({ icon: Icon, label, value, note }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 glass rounded-xl border border-white/[0.06]"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-sm text-indigo-400 font-mono">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 glass rounded-xl border border-white/[0.06]">
              <p className="text-sm text-muted-foreground italic">
                &ldquo;The form below automatically routes your message to the right inbox. You
                don&apos;t need to think about which email to use — just pick your reason and
                write.&rdquo;
              </p>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection direction="right">
            <div className="glass rounded-2xl border border-white/[0.06] p-6 md:p-8 relative overflow-hidden">
              {/* Accent glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                    >
                      <CheckCircle2 size={52} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl">Message sent!</h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Got it. I usually reply within a day or two. Thanks for reaching out — it
                      genuinely means something.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 relative z-10"
                    noValidate
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                        Name
                      </label>
                      <input
                        {...register('name')}
                        placeholder="Your name"
                        className={cn(
                          'w-full px-4 py-3 rounded-xl text-sm bg-white/[0.03] border text-foreground placeholder-muted-foreground/50 focus:outline-none transition-all duration-200',
                          errors.name
                            ? 'border-red-500/40 focus:border-red-500/60'
                            : 'border-white/[0.08] focus:border-indigo-500/40'
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                        Email
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        className={cn(
                          'w-full px-4 py-3 rounded-xl text-sm bg-white/[0.03] border text-foreground placeholder-muted-foreground/50 focus:outline-none transition-all duration-200',
                          errors.email
                            ? 'border-red-500/40 focus:border-red-500/60'
                            : 'border-white/[0.08] focus:border-indigo-500/40'
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                        Why are you reaching out?
                      </label>
                      <select
                        {...register('reason')}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl text-sm bg-[hsl(var(--background))] border text-foreground focus:outline-none transition-all duration-200 appearance-none cursor-pointer',
                          errors.reason
                            ? 'border-red-500/40 focus:border-red-500/60'
                            : 'border-white/[0.08] focus:border-indigo-500/40'
                        )}
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[hsl(var(--surface))]">
                          Pick a reason...
                        </option>
                        {reasons.map(({ value, label }) => (
                          <option key={value} value={value} className="bg-[hsl(var(--surface))]">
                            {label}
                          </option>
                        ))}
                      </select>
                      {errors.reason && (
                        <p className="text-red-400 text-xs mt-1">{errors.reason.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                        Message
                      </label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="What's on your mind?"
                        className={cn(
                          'w-full px-4 py-3 rounded-xl text-sm bg-white/[0.03] border text-foreground placeholder-muted-foreground/50 focus:outline-none transition-all duration-200 resize-none',
                          errors.message
                            ? 'border-red-500/40 focus:border-red-500/60'
                            : 'border-white/[0.08] focus:border-indigo-500/40'
                        )}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Error state */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={status !== 'loading' ? { scale: 1.01, y: -1 } : {}}
                      whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-500/20"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
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
