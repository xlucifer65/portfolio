export type BlogCategory =
  | 'tech'
  | 'life'
  | 'travel'
  | 'fitness'
  | 'creator'
  | 'education'
  | 'reflection'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  tags: string[]
  readTime: string
  date: string
  featured: boolean
  emoji: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-i-accidentally-built-parserai',
    title: 'How I Accidentally Built an Invoice Parsing System',
    excerpt:
      'It started with one invoice and a naive assumption that regex would be enough. It was not. Here\'s what happened when "quick script" became a full product.',
    content: `Coming soon.`,
    category: 'tech',
    tags: ['Python', 'AI', 'Building in Public', 'ParserAI'],
    readTime: '7 min read',
    date: '2025-04-15',
    featured: true,
    emoji: '🧾',
  },
  {
    id: '2',
    slug: 'france-everything-and-nothing-i-expected',
    title: 'France: Everything I Expected, Nothing I Expected',
    excerpt:
      'Moving to a country where you don\'t speak the language teaches you things very quickly. Some practical. Some existential. Some involve cheese.',
    content: `Coming soon.`,
    category: 'travel',
    tags: ['France', 'Life', 'Travel', 'Growth'],
    readTime: '5 min read',
    date: '2025-03-20',
    featured: false,
    emoji: '🇫🇷',
  },
  {
    id: '3',
    slug: 'below-500-subscribers-is-still-a-youtube-channel',
    title: 'Below 500 Subscribers Still Counts as a YouTube Channel',
    excerpt:
      "Nobody talks about what it's like to make videos that reach 200 people and still feel proud. I will. Because those 200 people were real.",
    content: `Coming soon.`,
    category: 'creator',
    tags: ['YouTube', 'Content Creation', 'Authenticity', 'Growth'],
    readTime: '4 min read',
    date: '2025-02-10',
    featured: false,
    emoji: '🎬',
  },
  {
    id: '4',
    slug: 'gym-teaches-you-more-than-gym',
    title: 'The Gym Teaches You More Than the Gym',
    excerpt:
      'I started lifting to get stronger. I kept going because showing up every day to something that\'s hard is the closest thing to a life philosophy I\'ve found.',
    content: `Coming soon.`,
    category: 'fitness',
    tags: ['Fitness', 'Discipline', 'Growth', 'Lifestyle'],
    readTime: '3 min read',
    date: '2025-01-28',
    featured: false,
    emoji: '💪',
  },
  {
    id: '5',
    slug: 'what-woxsen-taught-me',
    title: 'What Woxsen Taught Me (And What It Didn\'t)',
    excerpt:
      'College is a weird thing. You go in one person and come out different — sometimes better, sometimes just more caffeinated. Here\'s my honest take on it.',
    content: `Coming soon.`,
    category: 'education',
    tags: ['Woxsen', 'College', 'Learning', 'India'],
    readTime: '6 min read',
    date: '2024-12-05',
    featured: false,
    emoji: '🎓',
  },
  {
    id: '6',
    slug: 'deploying-to-production-and-what-that-word-actually-means',
    title: 'Deploying to Production (And What That Word Actually Means)',
    excerpt:
      'There\'s a big gap between code that works on your laptop and code that works when actual humans use it. AWS taught me this the hard way.',
    content: `Coming soon.`,
    category: 'tech',
    tags: ['AWS', 'DevOps', 'Production', 'Learning'],
    readTime: '8 min read',
    date: '2025-05-01',
    featured: false,
    emoji: '🚀',
  },
]

export const categoryLabels: Record<BlogCategory, string> = {
  tech: 'Tech',
  life: 'Life',
  travel: 'Travel',
  fitness: 'Fitness',
  creator: 'Creator',
  education: 'Education',
  reflection: 'Reflection',
}

export const categoryColors: Record<BlogCategory, string> = {
  tech: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
  life: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  travel: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
  fitness: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  creator: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
  education: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  reflection: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
}
