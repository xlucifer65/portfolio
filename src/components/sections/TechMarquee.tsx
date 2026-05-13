const TECH = [
  'Next.js', 'Python', 'AWS', 'TypeScript', 'Framer Motion',
  'Flask', 'OpenAI', 'Tailwind', 'PostgreSQL', 'Docker',
  'Vercel', 'React', 'Node.js', 'Git', 'Linux',
]

export function TechMarquee() {
  const doubled = [...TECH, ...TECH]

  return (
    <section
      aria-label="Technologies"
      style={{
        padding: '36px 0',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: `linear-gradient(180deg, var(--bg-2), var(--bg))`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div
          className="anim-marquee"
          style={{
            display: 'flex',
            gap: '32px',
            width: 'max-content',
          }}
        >
          {doubled.map((tech, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(22px, 3vw, 30px)',
                letterSpacing: '-0.02em',
                color: 'var(--fg-3)',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              {tech}
              <span style={{ color: 'var(--accent-1)', fontSize: '13px' }}>●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
