import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl mb-6">🤔</p>
      <h1 className="font-display font-black text-5xl mb-3">404</h1>
      <p className="text-muted-foreground text-lg mb-2">This page doesn&apos;t exist.</p>
      <p className="text-muted-foreground/60 text-sm mb-8">
        Either you typed the wrong URL, or I haven&apos;t built it yet.
        <br />
        Both are valid possibilities.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/25"
      >
        Take me home
      </Link>
    </div>
  )
}
