'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { GlassCard } from '@/components/ui/GlassCard'
import { projects, type ProjectStatus } from '@/lib/data/projects'
import { ArrowRight, Activity, FlaskConical, Rocket, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const statusConfig: Record<ProjectStatus, { label: string; color: string; icon: typeof Activity }> = {
  live: { label: 'Live', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: Activity },
  'in-development': { label: 'In Development', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', icon: TrendingUp },
  experimental: { label: 'Experimental', color: 'text-violet-400 bg-violet-400/10 border-violet-400/20', icon: FlaskConical },
  scaling: { label: 'Scaling', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20', icon: Rocket },
}

export function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase mb-3 block">
            What I&apos;m Building
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
            Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Real products, real edge cases, real lessons. Some are production-ready. Some are
            experiments. All are honest.
          </p>
        </AnimatedSection>

        {/* Featured project */}
        {featured && (
          <AnimatedSection className="mb-8">
            <FeaturedProjectCard project={featured} />
          </AnimatedSection>
        )}

        {/* Other projects */}
        <StaggerContainer className="grid md:grid-cols-2 gap-4">
          {rest.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}

          {/* Placeholder card */}
          <StaggerItem>
            <div className="rounded-2xl border border-dashed border-white/[0.08] p-8 flex flex-col items-center justify-center gap-3 min-h-[200px] text-center">
              <div className="text-3xl">🔮</div>
              <p className="font-medium text-sm text-muted-foreground">Next product loading...</p>
              <p className="text-xs text-muted-foreground/60">
                Something&apos;s always in the works.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}

function FeaturedProjectCard({ project }: { project: (typeof projects)[0] }) {
  const StatusIcon = statusConfig[project.status].icon
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative glass rounded-3xl border border-white/[0.06] overflow-hidden group"
      style={{ '--project-accent': project.accent } as React.CSSProperties}
    >
      {/* Accent gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: project.accent }}
      />

      <div className="p-8 md:p-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[project.status].color}`}
              >
                <StatusIcon size={11} />
                {statusConfig[project.status].label}
              </span>
              <span className="text-xs text-muted-foreground">Featured</span>
            </div>

            <h3 className="font-display font-black text-4xl md:text-5xl mb-2">{project.title}</h3>
            <p
              className="text-sm font-mono mb-5 opacity-70"
              style={{ color: project.accent }}
            >
              &ldquo;{project.tagline}&rdquo;
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs glass border border-white/[0.06] rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <ul className="space-y-2 mb-6">
              {project.highlights.slice(0, 4).map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                  {h}
                </li>
              ))}
            </ul>

            <Link
              href={`/projects/${project.id}`}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${project.accent}, ${project.accent}dd)`,
                boxShadow: `0 8px 24px ${project.accent}30`,
              }}
            >
              Deep Dive
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="lg:w-52 grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-3 content-start">
            {project.stats.map(({ label, value }) => (
              <div
                key={label}
                className="p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] text-center lg:text-left"
              >
                <p
                  className="font-display font-black text-2xl lg:text-3xl mb-0.5"
                  style={{ color: project.accent }}
                >
                  {value}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const StatusIcon = statusConfig[project.status].icon
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative glass rounded-2xl border border-white/[0.06] overflow-hidden group h-full"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />
      <div className="p-6 relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[project.status].color}`}
          >
            <StatusIcon size={10} />
            {statusConfig[project.status].label}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl mb-1">{project.title}</h3>
        <p className="text-xs font-mono mb-3 opacity-60" style={{ color: project.accent }}>
          &ldquo;{project.tagline}&rdquo;
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs border border-white/[0.06] rounded-full text-muted-foreground bg-white/[0.02]">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="group self-start inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
          style={{ color: project.accent }}
        >
          View Project
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
