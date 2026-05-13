import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function GlassCard({ children, className, hover = false, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl border border-white/[0.06]',
        hover && 'card-hover cursor-pointer',
        glow && 'glow-indigo',
        className
      )}
    >
      {children}
    </div>
  )
}
