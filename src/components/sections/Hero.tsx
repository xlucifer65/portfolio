'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

const taglines = [
  'Building things while figuring life out.',
  'Engineer. Creator. Problem Solver.',
  'Deploying ideas into reality.',
  'Future AWS Solutions Architect.',
  'Sometimes coding. Sometimes filming life.',
  'Vibe coding into production.',
]

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTaglineIndex((i) => (i + 1) % taglines.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
      id="top"
    >
      {/* Static gradient backdrop — visible without JS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(800px 400px at 20% -10%, rgba(99,102,241,.18), transparent 60%),
            radial-gradient(700px 350px at 90% 110%, rgba(6,182,212,.14), transparent 60%),
            radial-gradient(600px 300px at 50% 50%, rgba(139,92,246,.08), transparent 60%)
          `,
        }}
      />

      {/* Animated blobs */}
      <div
        className="absolute rounded-full pointer-events-none anim-float"
        style={{
          width: 340, height: 340,
          background: 'var(--accent-1)',
          top: '10%', left: '6%',
          filter: 'blur(70px)', opacity: 0.12,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none anim-float-delay"
        style={{
          width: 380, height: 380,
          background: 'var(--accent-2)',
          bottom: '8%', right: '8%',
          filter: 'blur(70px)', opacity: 0.1,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 240, height: 240,
          background: 'var(--accent-3)',
          top: '60%', left: '40%',
          filter: 'blur(60px)', opacity: 0.07,
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '-5s',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-max px-6 sm:px-8 text-center" style={{ paddingTop: '120px', paddingBottom: '80px' }}>

        {/* Availability chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex justify-center mb-10"
        >
          <div
            className="glass inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono tracking-wide"
            style={{ color: 'var(--fg-2)' }}
          >
            <span className="status-dot" />
            Open to new work &amp; conversations · 2026
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.4, 1.4, 0.6, 1] }}
          className="flex justify-center mb-9"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-50 scale-110"
              style={{ background: 'var(--grad)' }}
            />
            <div
              className="relative rounded-full overflow-hidden border-2"
              style={{
                width: 136, height: 136,
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              <Image
                src="/images/rayyan.jpg"
                alt="Rayyan Ahemad"
                fill
                className="object-cover object-top"
                priority
                sizes="136px"
              />
            </div>
            {/* Online dot */}
            <div
              className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2"
              style={{
                background: '#34d399',
                borderColor: 'var(--bg)',
                boxShadow: '0 0 10px rgba(52,211,153,.6)',
              }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(52px, 9vw, 108px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            marginBottom: '16px',
          }}
        >
          <span className="t-grad">Rayyan</span>{' '}
          <span style={{ color: 'var(--fg)' }}>Ahemad</span>
        </motion.h1>

        {/* Rotating tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-7 flex items-center justify-center mb-7"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{ color: 'var(--fg-2)', fontSize: 'clamp(15px, 1.4vw, 19px)', fontWeight: 400 }}
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-balance mx-auto mb-10"
          style={{
            maxWidth: '54ch',
            color: 'var(--fg-2)',
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            lineHeight: 1.65,
          }}
        >
          I deploy projects on{' '}
          <span style={{ color: 'var(--accent-1)', fontWeight: 500 }}>AWS</span>, build{' '}
          <span style={{ color: 'var(--accent-2)', fontWeight: 500 }}>AI tools</span> that actually
          do something useful, and obsess over how real systems scale. Preparing for{' '}
          <span style={{ color: 'var(--accent-3)', fontWeight: 500 }}>AWS Solutions Architect</span>.
          Still learning — honestly, that&apos;s the fun part.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <Link
            href="/#projects"
            className="btn-grad inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-tight"
          >
            View my work <span>→</span>
          </Link>
          <Link
            href="/#contact"
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
            style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}
          >
            Get in touch
          </Link>
        </motion.div>

        {/* Meta mono line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.72 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-14"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-3)', letterSpacing: '0.03em' }}
        >
          <span>// based in France</span>
          <span>// building since curiosity hit</span>
          <span>// aws · python · next.js · ai</span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col items-center gap-1.5"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            <ArrowDown size={18} />
          </motion.div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>
            scroll
          </span>
        </motion.div>
      </div>
    </section>
  )
}
