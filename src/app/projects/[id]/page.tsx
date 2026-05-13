import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/lib/data/projects'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.id)
  if (!project) notFound()

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-max px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to projects
        </Link>

        {/* Accent line */}
        <div
          className="w-full h-px mb-10 opacity-60"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        {/* Title */}
        <h1 className="font-display font-black text-4xl md:text-6xl mb-3">{project.title}</h1>
        <p className="font-mono text-sm mb-6 opacity-60" style={{ color: project.accent }}>
          &ldquo;{project.tagline}&rdquo;
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs glass border border-white/[0.06] rounded-full text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {project.stats.map(({ label, value }) => (
            <div key={label} className="glass rounded-xl border border-white/[0.06] p-4 text-center">
              <p className="font-display font-black text-2xl" style={{ color: project.accent }}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Long description */}
        <div className="glass rounded-2xl border border-white/[0.06] p-8 md:p-10 mb-8">
          <h2 className="font-display font-bold text-xl mb-5">The Story</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4 whitespace-pre-line text-sm md:text-base">
            {project.longDescription}
          </div>
        </div>

        {/* Highlights */}
        <div className="glass rounded-2xl border border-white/[0.06] p-8 md:p-10">
          <h2 className="font-display font-bold text-xl mb-5">What it does</h2>
          <ul className="space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: project.accent }} />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
