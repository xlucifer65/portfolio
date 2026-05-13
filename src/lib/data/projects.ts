export type ProjectStatus = 'live' | 'in-development' | 'experimental' | 'scaling'

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  longDescription: string
  status: ProjectStatus
  tags: string[]
  stats: { label: string; value: string }[]
  highlights: string[]
  accent: string
  featured: boolean
  href?: string
  github?: string
}

export const projects: Project[] = [
  {
    id: 'parserai',
    title: 'ParserAI',
    tagline: "Anybody can parse one invoice. The real pain starts at invoice #47.",
    description:
      'An invoice parsing system that extracts structured data from any invoice format. Started as a weekend experiment. Turned into an obsession with 20+ formats and counting.',
    longDescription: `Let's be honest — parsing one invoice is easy. You write some regex, feel clever, and ship it. Then the next client sends a PDF with Arabic fonts embedded backwards, and suddenly you're questioning your life choices.

ParserAI started as a tool to solve a real problem: too many invoice formats, too much manual data entry. It's now an AI-assisted extraction workflow that handles 20+ different supplier formats and is actively learning from edge cases.

The goal? A complete hands-off API that any business can point at their invoice pile and get clean JSON back. No babysitting. No reformatting. Just structured data.

Not quite there yet. But getting closer every week.`,
    status: 'in-development',
    tags: ['Python', 'AWS', 'OpenAI', 'PDF Parsing', 'OCR', 'Flask', 'Automation'],
    stats: [
      { label: 'Invoice Formats', value: '20+' },
      { label: 'Accuracy Target', value: '99%' },
      { label: 'Automation Goal', value: '100%' },
      { label: 'Suppliers Covered', value: '15+' },
    ],
    highlights: [
      'Multi-format PDF extraction with AI-assisted OCR correction',
      'Auto-routing to supplier-specific parsers',
      'Self-improving post-processing from edge case training',
      'Multi-invoice splitting from single PDFs',
      'Real-time validation with structured JSON output',
    ],
    accent: '#6366f1',
    featured: true,
    href: 'https://parserai.xyz',
  },
  {
    id: 'mauk-reconciliation',
    title: 'MAUK Reconciliation',
    tagline: 'Turning 3 Excel spreadsheets into one source of truth.',
    description:
      'A Flask web app that automates billing reconciliation for a luxury freight logistics company. Replaced a deeply manual VLOOKUP process. Operations team was happy. Excel was not.',
    longDescription: `MAUK Reconciliation was built for Malca-Amit UK Ltd, a luxury goods freight company at Heathrow. The problem: reconciling three completely different billing systems manually using VLOOKUP in Excel. Every. Single. Month.

The app now ingests MAUK internal exports, CASS airline billing statements, and HCH cargo handling invoices, matches them by MAWB number, and spits out a clean reconciliation report in minutes.

Saved hours of manual work. Made someone's Monday mornings significantly less painful.`,
    status: 'live',
    tags: ['Python', 'Flask', 'Pandas', 'Excel Automation', 'Data Reconciliation'],
    stats: [
      { label: 'Data Sources', value: '3' },
      { label: 'Time Saved', value: 'Hours/month' },
      { label: 'Match Rate', value: '~98%' },
      { label: 'Status', value: 'Live' },
    ],
    highlights: [
      'Automated MAWB-based matching across 3 billing systems',
      'Exception reporting for unmatched entries',
      'Clean web UI for non-technical operations staff',
      'Export to formatted Excel reconciliation reports',
    ],
    accent: '#06b6d4',
    featured: false,
  },
  {
    id: 'ai-workflow-lab',
    title: 'AI Workflow Lab',
    tagline: 'Where I break things to learn how they actually work.',
    description:
      'A collection of AI workflow experiments: agents, automation chains, document processing pipelines. Not shipping yet. Learning a lot.',
    longDescription: `This isn't a product. It's a lab.

I'm actively experimenting with AI agents, multi-step reasoning chains, workflow automation, and the kind of systems that can actually do useful things without constant human hand-holding. Some of it works. Some of it spectacularly doesn't.

The goal is to understand how production AI workflows are actually built — not the tutorial version, but the version that handles weird edge cases, rate limits, and the occasional completely unhinged model output.`,
    status: 'experimental',
    tags: ['AI Agents', 'LLMs', 'Automation', 'Python', 'Workflows'],
    stats: [
      { label: 'Experiments', value: 'Ongoing' },
      { label: 'Things Broken', value: 'Many' },
      { label: 'Things Learned', value: 'More' },
      { label: 'Status', value: 'Lab' },
    ],
    highlights: [
      'Multi-agent workflow orchestration experiments',
      'Document processing and extraction pipelines',
      'LLM prompt engineering and chain optimization',
      'Exploring real-world production AI patterns',
    ],
    accent: '#8b5cf6',
    featured: false,
  },
]
