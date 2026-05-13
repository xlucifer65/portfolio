import Link from 'next/link'
import { Github, Mail, Youtube, Linkedin } from 'lucide-react'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/xlucifer65' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@rayyanahemad' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/rayyanahemad' },
  { icon: Mail, label: 'Email', href: 'mailto:xlucifer65@gmail.com' },
]

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        padding: '32px',
      }}
    >
      <div
        className="container-max"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="t-grad"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '-0.02em',
          }}
        >
          Rayyan Ahemad
        </Link>

        {/* Socials */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {socials.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                border: '1px solid var(--line)',
                color: 'var(--fg-3)',
                transition: 'color 160ms, border-color 160ms, transform 160ms',
              }}
              className="hover:text-[var(--fg)] hover:border-[var(--line-2)] hover:-translate-y-0.5 transition-all"
            >
              <Icon size={14} />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--fg-3)',
          }}
        >
          © {new Date().getFullYear()} Rayyan Ahemad · Built with Next.js · Tailwind · Framer Motion
        </span>
      </div>
    </footer>
  )
}
