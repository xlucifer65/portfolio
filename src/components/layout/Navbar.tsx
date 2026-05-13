'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Work' },
  { href: '/#blog', label: 'Writing' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
      >
        {/* Pill nav */}
        <nav
          className="glass flex items-center gap-1 px-2 pr-2 py-2 rounded-full shadow-card transition-all duration-200"
          style={{
            paddingTop: scrolled ? '7px' : '10px',
            paddingBottom: scrolled ? '7px' : '10px',
            paddingLeft: '22px',
          }}
        >
          {/* Wordmark */}
          <Link href="/" className="t-grad font-display font-extrabold text-[17px] tracking-tight mr-3 flex-shrink-0">
            Rayyan
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 hover:text-[var(--fg)] text-[var(--fg-2)] hover:bg-[var(--bg-3)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 ml-1">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="btn-grad px-4 py-2 rounded-full text-[12px] font-bold tracking-tight flex items-center gap-1.5 flex-shrink-0"
            >
              Contact <span>→</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2 ml-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="fixed top-20 left-4 right-4 z-40 glass rounded-2xl shadow-lift p-4 flex flex-col gap-1 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm text-[var(--fg-2)] hover:text-[var(--fg)] hover:bg-[var(--bg-3)] transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-1 btn-grad px-4 py-3 rounded-xl text-sm font-bold text-center"
            >
              Contact →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
