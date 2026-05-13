import Link from 'next/link'
import { Github, Mail, Youtube, Linkedin } from 'lucide-react'

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/rayyanahemad' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@rayyanahemad' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/rayyanahemad' },
  { icon: Mail, label: 'Email', href: 'mailto:xlucifer65@gmail.com' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                R
              </div>
              <span className="font-display font-semibold text-sm">Rayyan Ahemad</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Building things while figuring life out.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground border border-white/5 hover:border-white/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {year} Rayyan Ahemad. Built with curiosity.
          </p>
        </div>
      </div>
    </footer>
  )
}
