'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'

const taglines = [
  'Building things while figuring life out.',
  'Engineer. Creator. Problem Solver.',
  'Deploying ideas into reality.',
  'Future AWS Solutions Architect.',
  'Sometimes coding. Sometimes filming life.',
  'Vibe coding into production.',
]

const techPills = ['AWS', 'Python', 'Next.js', 'AI/LLMs', 'Automation', 'Flask', 'Framer Motion']

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % taglines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen hero-gradient flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-3xl"
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-indigo-500/20 text-sm text-indigo-400">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <Sparkles size={13} />
            <span>Open to interesting work & conversations</span>
          </div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 blur-md opacity-40 scale-110" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
              {/* Placeholder avatar — replace with <Image src="/images/rayyan.jpg" alt="Rayyan Ahemad" fill className="object-cover" /> */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-5xl">R</span>
              </div>
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-background shadow-lg shadow-emerald-400/50" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4"
        >
          <span className="gradient-text">Rayyan</span>{' '}
          <span className="text-foreground">Ahemad</span>
        </motion.h1>

        {/* Rotating tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-8 flex items-center justify-center mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-muted-foreground text-base md:text-lg font-medium"
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-balance">
            I deploy projects on <span className="text-indigo-400 font-medium">AWS</span>, build{' '}
            <span className="text-violet-400 font-medium">AI tools</span> that actually do
            something useful, and spend too much time thinking about how real systems scale.
            Preparing for{' '}
            <span className="text-cyan-400 font-medium">AWS Solutions Architect</span>. Still
            learning. Honestly, that&apos;s the fun part.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            See My Work
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold glass border border-white/[0.08] text-foreground hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200 hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
        </motion.div>

        {/* Tech pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {techPills.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.85 + i * 0.06 }}
              className="px-3 py-1 text-xs glass border border-white/[0.06] rounded-full text-muted-foreground hover:text-foreground hover:border-white/[0.12] transition-all duration-200 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer"
          >
            <ArrowDown size={20} />
          </motion.div>
          <span className="text-xs text-muted-foreground/30">scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}
