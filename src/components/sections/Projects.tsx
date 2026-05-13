'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { projects, type ProjectStatus } from '@/lib/data/projects'
import { Activity, FlaskConical, Rocket, TrendingUp } from 'lucide-react'

const statusConfig: Record<ProjectStatus, { label: string; color: string; icon: typeof Activity }> = {
  live: { label: 'Live', color: 'color: var(--accent-3)', icon: Activity },
  'in-development': { label: 'In Development', color: 'color: #f59e0b', icon: TrendingUp },
  experimental: { label: 'Experimental', color: 'color: var(--accent-2)', icon: FlaskConical },
  scaling: { label: 'Scaling', color: 'color: var(--accent-3)', icon: Rocket },
}

const thumbGradients = [
  'linear-gradient(135deg, #312e81, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #064e3b, #06b6d4, #0891b2)',
  'linear-gradient(135deg, #4c1d95, #8b5cf6, #c026d3)',
]

export function Projects() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <AnimatedSection className="mb-14">
          <div className="eyebrow mb-4">// selected work</div>
          <h2
            className="t-shimmer"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 62px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Things I&apos;ve built
          </h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '17px', lineHeight: 1.6, maxWidth: '54ch' }}>
            Real products, real edge cases, real lessons. Some are in production. Some are experiments.
            All are honest.
          </p>
        </AnimatedSection>

        {/* Featured card */}
        <AnimatedSection className="mb-6">
          <FeaturedCard project={featured} />
        </AnimatedSection>

        {/* Other projects */}
        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          {rest.map((project, i) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} thumbGradient={thumbGradients[i + 1] || thumbGradients[0]} />
            </StaggerItem>
          ))}

          {/* Placeholder */}
          <StaggerItem>
            <div
              className="rounded-3xl flex flex-col items-center justify-center gap-3 text-center min-h-[260px]"
              style={{
                border: '1px dashed var(--line-2)',
                background: 'transparent',
              }}
            >
              <span style={{ fontSize: 32 }}>🔮</span>
              <p style={{ color: 'var(--fg-3)', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                Next project loading...
              </p>
              <p style={{ color: 'var(--fg-3)', fontSize: '12px', opacity: 0.6 }}>
                Something&apos;s always in the works.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}

function FeaturedCard({ project }: { project: (typeof projects)[0] }) {
  const { icon: StatusIcon, label: statusLabel } = statusConfig[project.status]

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--line)',
        borderRadius: '28px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: 0.7,
        }}
      />

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Thumbnail */}
        <div
          style={{
            height: '280px',
            background: thumbGradients[0],
            backgroundSize: '300% 300%',
            animation: 'gradient-shift 8s ease infinite',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Dot grid overlay */}
          <div
            style={{
              position: 'absolute', inset: 0, opacity: 0.22, mixBlendMode: 'overlay',
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.5) 1px, transparent 0)',
              backgroundSize: '4px 4px',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 30% 40%, transparent, rgba(0,0,0,.5) 100%)',
            }}
          />
          {/* Filename label */}
          <div
            style={{
              position: 'absolute', bottom: 14, left: 16,
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: 'rgba(255,255,255,.8)',
              background: 'rgba(0,0,0,.4)',
              padding: '3px 10px', borderRadius: '6px', letterSpacing: '.04em',
            }}
          >
            {project.id}.py
          </div>
          {/* Stats overlay */}
          <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-2">
            {project.stats.slice(0, 2).map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: 'rgba(0,0,0,.55)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: '#fff', lineHeight: 1 }}>
                  {value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,.6)', marginTop: '2px' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'var(--bg-3)', border: '1px solid var(--line)', color: project.accent }}
            >
              <StatusIcon size={10} />
              {statusLabel}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-3)' }}>Featured</span>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 38px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '6px' }}>
              {project.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: project.accent, opacity: 0.8 }}>
              &ldquo;{project.tagline}&rdquo;
            </p>
          </div>

          <p style={{ color: 'var(--fg-2)', fontSize: '14px', lineHeight: 1.65, flex: 1 }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--fg-3)', background: 'var(--bg-3)',
                  border: '1px solid var(--line)',
                  padding: '3px 9px', borderRadius: '999px', letterSpacing: '.02em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={project.href ?? `/projects/${project.id}`}
              target={project.href ? '_blank' : undefined}
              rel={project.href ? 'noopener noreferrer' : undefined}
              className="self-start btn-grad px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              {project.href ? 'Visit site →' : 'Deep dive →'}
            </Link>
            {project.href && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--fg-3)', letterSpacing: '.02em',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-3)', display: 'inline-block', boxShadow: '0 0 8px var(--accent-3-glow)' }} />
                {project.href.replace('https://', '')}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectCard({ project, thumbGradient }: { project: (typeof projects)[0]; thumbGradient: string }) {
  const { icon: StatusIcon, label: statusLabel } = statusConfig[project.status]

  return (
    <motion.article
      whileHover={{ y: -5, borderColor: 'var(--accent-1)' }}
      transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--line)',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: '170px', background: thumbGradient, position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', inset: 0, opacity: 0.22, mixBlendMode: 'overlay',
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.5) 1px, transparent 0)',
            backgroundSize: '4px 4px',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 30% 40%, transparent, rgba(0,0,0,.5) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: 12, left: 14,
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: 'rgba(255,255,255,.8)',
            background: 'rgba(0,0,0,.4)',
            padding: '3px 8px', borderRadius: '6px', letterSpacing: '.04em',
          }}
        >
          {project.id}.py
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: 'var(--bg-3)', border: '1px solid var(--line)', color: project.accent }}
          >
            <StatusIcon size={10} />
            {statusLabel}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-3)' }}>2026</span>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: project.accent, opacity: 0.7 }}>
            &ldquo;{project.tagline}&rdquo;
          </p>
        </div>

        <p style={{ color: 'var(--fg-2)', fontSize: '13px', lineHeight: 1.6, flex: 1 }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: 'var(--fg-3)', background: 'var(--bg-3)',
                border: '1px solid var(--line)',
                padding: '2px 8px', borderRadius: '999px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={project.href ?? `/projects/${project.id}`}
          target={project.href ? '_blank' : undefined}
          rel={project.href ? 'noopener noreferrer' : undefined}
          style={{ color: project.accent, fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          className="hover:opacity-80 transition-opacity"
        >
          {project.href ? 'Visit site →' : 'View project →'}
        </Link>
      </div>
    </motion.article>
  )
}
