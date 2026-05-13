'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { GlassCard } from '@/components/ui/GlassCard'
import { blogPosts, categoryLabels, categoryColors, type BlogCategory } from '@/lib/data/blog-posts'
import { formatDate } from '@/lib/utils'
import { ArrowRight, Clock, Search } from 'lucide-react'

const categories: BlogCategory[] = ['tech', 'life', 'travel', 'fitness', 'creator', 'education']

export function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <section id="blog" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase mb-3 block">
            Writing Things Down
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
            Blog
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Some posts are technical. Some are just me trying to understand life. All of them are
            honest.
          </p>
        </AnimatedSection>

        {/* Search + Filters */}
        <AnimatedSection className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm glass border border-white/[0.06] rounded-xl bg-transparent text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-indigo-500/40 transition-colors duration-200"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 border ${
                  activeCategory === 'all'
                    ? 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                    : 'glass border-white/[0.06] text-muted-foreground hover:text-foreground hover:border-white/[0.1]'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 border ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                      : 'glass border-white/[0.06] text-muted-foreground hover:text-foreground hover:border-white/[0.1]'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-4xl mb-3">🤔</p>
            <p>Nothing matches that. Try something else.</p>
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <AnimatedSection className="mb-6">
            <FeaturedPost post={featured} />
          </AnimatedSection>
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post) => (
              <StaggerItem key={post.id}>
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}

function FeaturedPost({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className="glass rounded-3xl border border-white/[0.06] overflow-hidden"
      >
        {/* Gradient header */}
        <div className="h-48 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <span className="text-7xl relative z-10">{post.emoji}</span>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${categoryColors[post.category]}`}>
              {categoryLabels[post.category]}
            </span>
            <span className="text-xs text-muted-foreground">Featured</span>
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 group-hover:text-indigo-400 transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>
            <span className="group-hover:text-indigo-400 text-muted-foreground transition-colors duration-200 flex items-center gap-1 text-sm font-medium">
              Read
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function PostCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="glass rounded-2xl border border-white/[0.06] p-6 h-full flex flex-col"
      >
        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-2xl mb-4">
          {post.emoji}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 text-xs rounded-md border font-medium ${categoryColors[post.category]}`}>
            {categoryLabels[post.category]}
          </span>
        </div>

        <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-indigo-400 transition-colors duration-200 flex-1">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={10} />
            <span>{post.readTime}</span>
          </div>
          <span className="text-xs font-medium text-indigo-400 group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-1">
            Read <ArrowRight size={11} />
          </span>
        </div>
      </motion.div>
    </Link>
  )
}
