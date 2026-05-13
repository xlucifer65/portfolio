import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts, categoryColors, categoryLabels } from '@/lib/data/blog-posts'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Clock } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen pt-24 pb-20">
      <article className="container-max px-4 sm:px-6 lg:px-8 max-w-2xl">
        {/* Back */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${categoryColors[post.category]}`}>
              {categoryLabels[post.category]}
            </span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock size={11} />
              <span>{post.readTime}</span>
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{post.emoji}</span>
            <h1 className="font-display font-black text-3xl md:text-4xl leading-tight">{post.title}</h1>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-indigo-500/40 pl-4">
            {post.excerpt}
          </p>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl border border-white/[0.06] p-8 md:p-10">
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="text-5xl">✍️</span>
            <h3 className="font-display font-bold text-xl">This post is coming soon.</h3>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Still writing this one. Check back soon — or if you really want to read it, send
              me a message and it&apos;ll motivate me to finish it faster.
            </p>
            <Link
              href="/#contact"
              className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              Poke me to finish this
            </Link>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs glass border border-white/[0.06] rounded-full text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  )
}
