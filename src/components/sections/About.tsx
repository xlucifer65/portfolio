'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { GlassCard } from '@/components/ui/GlassCard'
import { MapPin, Youtube, Cpu, Zap, BookOpen, Globe } from 'lucide-react'

const traits = [
  { icon: Cpu, label: 'Builder', desc: 'From idea to deployed product' },
  { icon: Globe, label: 'Explorer', desc: 'India → France and still going' },
  { icon: Youtube, label: 'Creator', desc: 'Under 500 subs. Still proud.' },
  { icon: Zap, label: 'Experimenter', desc: 'Breaking things to learn them' },
  { icon: BookOpen, label: 'Learner', desc: 'AWS, AI, real-world systems' },
  { icon: MapPin, label: 'Grounded', desc: 'Ambitious but self-aware' },
]

const galleryItems = [
  { label: 'Building ParserAI', color: 'from-indigo-600/30 to-violet-600/20', icon: '🧾' },
  { label: 'Life in France', color: 'from-sky-600/30 to-cyan-600/20', icon: '🇫🇷' },
  { label: 'Gym sessions', color: 'from-orange-600/30 to-amber-600/20', icon: '💪' },
  { label: 'YouTube experiments', color: 'from-red-600/30 to-pink-600/20', icon: '🎬' },
  { label: 'Woxsen days', color: 'from-emerald-600/30 to-teal-600/20', icon: '🎓' },
  { label: 'AWS learnings', color: 'from-yellow-600/30 to-orange-600/20', icon: '☁️' },
]

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase mb-3 block">
            The Person Behind the Code
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
            A bit about me
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            The story version. Not the resume version.
          </p>
        </AnimatedSection>

        {/* Main story */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-center">
          <AnimatedSection direction="left">
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-foreground text-lg font-medium">
                I started in India, curious about technology, creativity, and what was possible if
                you actually tried building things.
              </p>
              <p>
                That curiosity took me to Woxsen University, then to France, and currently to a
                rabbit hole of AI tools, AWS architecture, invoice parsing systems, and occasionally
                filming life for a YouTube channel that has fewer subscribers than most people have
                contacts in their phone.
              </p>
              <p>
                I don&apos;t want to stay inside one identity forever. Engineer is a starting point,
                not an endpoint. The best builders I&apos;ve read about were also writers, artists,
                business thinkers, and storytellers. I&apos;m trying to be all of those things,
                badly, and improving every month.
              </p>
              <p>
                I&apos;m still learning. Still experimenting. Still figuring out which problems are
                worth solving. And honestly, that&apos;s the most interesting place to be.
              </p>
            </div>
          </AnimatedSection>

          {/* Trait grid */}
          <AnimatedSection direction="right">
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {traits.map(({ icon: Icon, label, desc }) => (
                <StaggerItem key={label}>
                  <GlassCard
                    className="p-4 flex flex-col gap-2 hover:border-white/[0.1] transition-all duration-300 group"
                    hover
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors duration-200">
                      <Icon size={16} />
                    </div>
                    <p className="font-semibold text-sm text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>
        </div>

        {/* YouTube section */}
        <AnimatedSection className="mb-20">
          <GlassCard className="p-8 md:p-10 relative overflow-hidden border border-red-500/10">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <Youtube size={22} className="text-red-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl mb-1">My Tiny YouTube Era</h3>
                  <p className="text-muted-foreground text-sm">
                    Below 500 subscribers still counts as a YouTuber, right?
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I started making videos because I had things I wanted to say and no other
                    format felt right. Nobody tells you how weirdly satisfying it is to edit a
                    video at 2am and feel like you actually made something.
                  </p>
                  <p>
                    Under 500 subscribers. Still genuinely proud of it. Those weren&apos;t
                    algorithmic ghosts — they were real people who watched, and some even came
                    back. That means something.
                  </p>
                  <p>
                    YouTube taught me storytelling, editing, confidence, how to speak on camera
                    without looking like I just saw a ghost, and the value of showing up even when
                    nobody&apos;s watching yet.
                  </p>
                  <p className="text-foreground font-medium">
                    I want to keep creating. Work just got loud. But it&apos;s on the list.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Subscribers', value: '<500', desc: 'Real ones though' },
                    { label: 'What I learned', value: '∞', desc: 'Storytelling & confidence' },
                    { label: 'Videos made', value: 'Several', desc: "Quality over quantity" },
                    { label: 'Plan to continue', value: 'Yes', desc: 'When life lets me' },
                  ].map(({ label, value, desc }) => (
                    <div
                      key={label}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                    >
                      <p className="text-2xl font-display font-bold text-foreground">{value}</p>
                      <p className="text-xs font-medium text-foreground/70 mb-0.5">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Gallery section */}
        <AnimatedSection>
          <h3 className="font-display font-bold text-2xl mb-2 text-center">Life in Snapshots</h3>
          <p className="text-muted-foreground text-sm text-center mb-8">
            Add your own photos here — this is just the frame.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryItems.map(({ label, color, icon }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
                className={`relative aspect-square rounded-2xl bg-gradient-to-br ${color} border border-white/[0.06] overflow-hidden flex flex-col items-center justify-center gap-3 cursor-pointer group`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-4xl">{icon}</span>
                <span className="text-sm font-medium text-foreground/80 z-10">{label}</span>
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-2xl transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
