// Content for the homepage's "Selected work" section and the full /projects page.
// Source of truth: the 15-project AI Engineer 2026 portfolio plan.
// `highlight: true` marks the 3-5 shown on the homepage — pick these once you've decided
// which projects best represent you; everything here is shown in full on /projects.

export type ProjectStatus = "in-progress" | "planned" | "done";

export const statusLabel: Record<ProjectStatus, string> = {
  "in-progress": "In progress",
  planned: "Planned",
  done: "Live",
};

export type Phase =
  | "Core foundations"
  | "Agentic & multi-system"
  | "Deep technical differentiation"
  | "Operational maturity & monetization";

export interface Project {
  id: number;
  slug: string;
  phase: Phase;
  title: string;
  status: ProjectStatus;
  highlight?: boolean; // set true on 3-5 entries to feature them in the homepage "Selected work" list
  image?: string; // path under /public — reserve for a REAL product screenshot once a project actually ships, not a mockup
  flow?: {
    stages: string[]; // pipeline nodes rendered left-to-right (top-to-bottom on mobile)
    branch?: string[]; // optional fan-out at the end of the pipeline, e.g. auto-resolve vs. escalate
    caption?: string; // one line under the diagram — the detail that doesn't fit in a box
  };
  howItWorks?: { step: string; detail: string }[]; // expandable step-by-step walkthrough, for projects worth explaining in depth
  tag: string; // short one/two-word tag for the homepage row
  oneLiner: string; // homepage "Selected work" description
  problem: string; // /projects page: business use case
  tech: string[];
  architecture: string;
  significance: string; // why it matters to recruiters/clients
  freelanceValue: string;
  resumeBullet: string;
  buildTime: string;
  difficulty: "Low-medium" | "Medium" | "Medium-high" | "High";
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "rag-starter-kit",
    phase: "Core foundations",
    title: "RAG Starter Kit",
    status: "in-progress",
    highlight: true,
    flow: {
      stages: [
        "Next.js chat UI",
        "FastAPI",
        "LangGraph retrieval node",
        "pgvector similarity search",
        "LLM synthesis + citations",
      ],
      caption:
        "Every call traced in Langfuse — a DeepEval CI check fails the build if retrieval precision drops below threshold.",
    },
    howItWorks: [
      {
        step: "Ingest",
        detail:
          "Documents (PDFs, DOCX, email exports) go through the FastAPI backend, get chunked with LlamaIndex, embedded with OpenAI's text-embedding-3-small, and stored in Postgres — each chunk's embedding lives in a pgvector Vector(1536) column next to the source document and page number it came from.",
      },
      {
        step: "Ask",
        detail:
          "The Next.js chat UI sends the question to FastAPI, which hands it to a LangGraph retrieval node — a small state graph rather than a single hard-coded function, so the retrieval logic can grow branches later without a rewrite.",
      },
      {
        step: "Retrieve",
        detail:
          "The node embeds the incoming question and runs a similarity search against pgvector to pull back the chunks most relevant to it.",
      },
      {
        step: "Synthesize",
        detail:
          "Those chunks go to the LLM with instructions to answer only from what was retrieved and attach a citation — source document and page — to every claim, so nothing in the answer is unsourced.",
      },
      {
        step: "Trace",
        detail:
          "Every step of that call — retrieval, synthesis, latency, token counts — is logged to Langfuse, so any single run can be pulled up and inspected after the fact.",
      },
      {
        step: "Gate",
        detail:
          "Before any change ships, a DeepEval golden set of 20-30 real question/answer pairs runs against the retrieval pipeline in CI. If precision drops below threshold, the build fails and the deploy is blocked — the eval isn't a report, it's a gate.",
      },
    ],
    tag: "RAG",
    oneLiner: "Citation-grounded document Q&A for SMBs, gated by an automated eval suite.",
    problem:
      "SMBs (law firms, clinics, agencies) have policies, SOPs, and past client emails scattered across drives with no searchable interface.",
    tech: ["FastAPI", "Next.js", "Postgres + pgvector", "LangGraph", "LlamaIndex", "Langfuse", "DeepEval"],
    architecture:
      "Next.js chat UI to FastAPI to LangGraph retrieval node to pgvector similarity search to LLM synthesis with citations, traced in Langfuse on every call.",
    significance:
      "Table stakes done right — most candidates skip the eval gate, which is the actual signal. A /eval CI step fails the build if retrieval precision drops below threshold.",
    freelanceValue: "$2K-$25K — the single most-requested SMB gig",
    resumeBullet:
      "Built and deployed a production RAG system with citation-grounded answers and an automated eval suite that gates every deploy on retrieval-quality regression.",
    buildTime: "1-1.5 weeks",
    difficulty: "Low-medium",
  },
  {
    id: 2,
    slug: "support-agent",
    phase: "Core foundations",
    title: "Multi-Tenant Customer Support Agent",
    status: "planned",
    flow: {
      stages: ["Ticket webhook", "Classify", "Retrieve", "Draft reply", "Confidence gate"],
      branch: ["Auto-resolve", "Escalate to human"],
      caption: "CRM write-back and a per-tenant Langfuse trace on every ticket.",
    },
    tag: "Agent",
    oneLiner: "A confidence-gated support agent that escalates to a human instead of guessing.",
    problem:
      "SaaS companies are drowning in repetitive tickets and need escalation logic they can trust.",
    tech: ["LangGraph", "Zendesk/Intercom API", "Stripe", "multi-tenant Postgres"],
    architecture:
      "Ticket webhook to LangGraph agent (classify to retrieve to draft to confidence-gate) to auto-resolve or escalate, with CRM write-back and a per-tenant Langfuse trace.",
    significance:
      "The exact shape of the highest-value freelance category (agentic systems with measurable outcomes) and the top hiring signal: stateful orchestration, not just retrieval.",
    freelanceValue: "$500-$3K project or retainer — best repeat-client category",
    resumeBullet:
      "Shipped a multi-tenant support agent with a confidence-gated escalation policy, reducing simulated ticket-handling time while keeping human-in-the-loop on low-confidence cases.",
    buildTime: "1.5-2 weeks",
    difficulty: "Medium",
  },
  {
    id: 3,
    slug: "document-intelligence",
    phase: "Core foundations",
    title: "Document Intelligence Pipeline",
    status: "planned",
    highlight: true,
    flow: {
      stages: [
        "Upload",
        "Parse (native / OCR fallback)",
        "Chunk vs. clause schema",
        "Risk-flag scoring",
        "Reviewer UI",
      ],
      caption: "Every flag links back to its exact page in the source document.",
    },
    tag: "Extraction",
    oneLiner: "Contract and compliance clause extraction with page-level citations.",
    problem:
      "Legal, insurance, and real-estate teams manually re-read contracts for clause risk.",
    tech: ["unstructured.io / LlamaParse", "OCR fallback", "Pydantic-constrained generation"],
    architecture:
      "Upload to parse (native text or OCR fallback) to chunked extraction against a clause schema to risk-flag scoring to reviewer UI with source highlighting.",
    significance:
      "Document AI is one of the highest-freelance-demand, lowest-portfolio-saturation categories — most candidates only ever build chat-based RAG.",
    freelanceValue: "$3K-$15K — high budget, repeat-client-heavy",
    resumeBullet:
      "Built a document-intelligence pipeline combining OCR fallback and schema-constrained extraction, achieving strong clause-detection accuracy against a hand-labeled eval set.",
    buildTime: "1.5 weeks",
    difficulty: "Medium",
  },
  {
    id: 4,
    slug: "mcp-server",
    phase: "Core foundations",
    title: "MCP Server for Internal Data Access",
    status: "planned",
    highlight: true,
    flow: {
      stages: [
        "Claude Desktop / Cursor",
        "MCP server (auth-scoped)",
        "list_customers · get_order_history · flag_risk_account",
        "Internal Postgres / CRM",
      ],
      caption:
        "Published to the MCP registry — callable by any client, including the agents from projects 02 and 05.",
    },
    tag: "MCP",
    oneLiner: "A published MCP server exposing scoped, auth-gated access to a relational dataset.",
    problem:
      "Every agent needs to query internal systems (CRM, database, ticketing) but hand-rolled tool schemas don't compose.",
    tech: ["MCP Python/TS SDK", "OAuth-scoped access control"],
    architecture:
      "MCP server exposes list_customers, get_order_history, flag_risk_account as typed tools/resources callable by any MCP client, including the agents from projects 2 and 5.",
    significance:
      "78% of enterprise AI teams have MCP in production; almost no junior/mid candidates have shipped one yet — the cheapest high-signal project in the backlog.",
    freelanceValue: "A new consulting line: connect internal systems to Claude/Cursor",
    resumeBullet:
      "Published an MCP server to the official registry exposing scoped, auth-gated access to a relational dataset.",
    buildTime: "3-5 days",
    difficulty: "Low-medium",
  },
  {
    id: 5,
    slug: "lead-qualification",
    phase: "Agentic & multi-system",
    title: "Multi-Agent Workflow Automation",
    status: "planned",
    tag: "Multi-agent",
    oneLiner: "Role-based agents qualify inbound leads and draft outreach with a human approval gate.",
    problem: "Sales/ops teams manually qualify inbound leads and draft outreach.",
    tech: ["CrewAI", "LangGraph", "enrichment APIs"],
    architecture:
      "New lead to enrichment agent (calls an enrichment API and the MCP server from project 4) to qualification agent scores against ICP to writer agent drafts outreach to human-approval gate to send.",
    significance:
      "Directly demonstrates the 'know when to use which framework' judgment call that separates mid from senior — role-based (CrewAI) composed with stateful (LangGraph).",
    freelanceValue: "One of the highest-retainer freelance categories",
    resumeBullet:
      "Designed a multi-agent lead-qualification pipeline combining role-based and stateful orchestration, with a human-approval gate before any external send.",
    buildTime: "1.5 weeks",
    difficulty: "Medium-high",
  },
  {
    id: 6,
    slug: "competitive-monitoring",
    phase: "Agentic & multi-system",
    title: "Browser Agent for Competitive Monitoring",
    status: "planned",
    tag: "Browser agent",
    oneLiner: "A scheduled browser agent that tracks competitor pricing and alerts on changes.",
    problem:
      "Businesses want to track competitor pricing/inventory changes without a human checking daily.",
    tech: ["Playwright", "browser-use-style agent loop", "cron", "diff-based change detection"],
    architecture:
      "Scheduled job to browser agent navigates target sites to extracts structured pricing data to diffs against last run to alerts via the notification layer from project 2.",
    significance:
      "Computer-use/browser agents are the fastest-growing specialization; almost no portfolio projects touch this outside of toy demos.",
    freelanceValue: "Competitive monitoring, data-entry automation, web-to-CRM sync",
    resumeBullet:
      "Built a scheduled browser-automation agent for competitive price monitoring, with change-detection alerting and resilient selector strategies.",
    buildTime: "1 week",
    difficulty: "Medium",
  },
  {
    id: 7,
    slug: "voice-receptionist",
    phase: "Agentic & multi-system",
    title: "Voice AI Receptionist",
    status: "planned",
    highlight: true,
    tag: "Voice",
    oneLiner: "An inbound phone agent that transcribes, decides, and books a real calendar slot.",
    problem:
      "Local service businesses (clinics, salons, restaurants) miss calls constantly and can't afford 24/7 staff.",
    tech: ["Whisper / streaming STT", "ElevenLabs", "Twilio", "LangGraph booking flow"],
    architecture:
      "Incoming call to Twilio to streaming STT to LangGraph booking agent (checks calendar via the MCP server from project 4) to ElevenLabs TTS to spoken response.",
    significance:
      "Voice AI is a distinct, high-visibility specialization most text-only AI-engineer portfolios never touch.",
    freelanceValue: "AI phone receptionist — obvious ROI story for local businesses",
    resumeBullet:
      "Built a real-time voice AI receptionist handling inbound calls end-to-end — transcription, intent handling, and calendar booking — with sub-2-second response latency.",
    buildTime: "1.5-2 weeks",
    difficulty: "Medium-high",
  },
  {
    id: 8,
    slug: "fine-tuned-vllm",
    phase: "Deep technical differentiation",
    title: "Fine-Tuned Local Model + vLLM Deployment",
    status: "planned",
    tag: "Fine-tuning",
    oneLiner: "A self-hosted classifier fine-tuned via LoRA, benchmarked against an API baseline.",
    problem:
      "API costs and latency don't scale for a narrow, high-volume classification or style-matching task.",
    tech: ["PyTorch", "LoRA / PEFT", "vLLM", "Ollama"],
    architecture:
      "Fine-tune a LoRA adapter on labeled data (reusing tickets from project 2) to merge/quantize to serve via vLLM to benchmark against the same task via the Claude/OpenAI API from project 1.",
    significance:
      "Directly rebuts the 'just an API wrapper' critique — the number one thing separating candidates who get filtered from those who get interviews.",
    freelanceValue: "Cost-optimization consulting for high API-spend companies",
    resumeBullet:
      "Fine-tuned and self-hosted a domain-specific classifier via LoRA and vLLM, cutting per-request cost versus the equivalent API call at matched accuracy.",
    buildTime: "1.5 weeks",
    difficulty: "High",
  },
  {
    id: 9,
    slug: "eval-guardrails-toolkit",
    phase: "Deep technical differentiation",
    title: "Open-Source Eval & Guardrails Toolkit",
    status: "planned",
    tag: "OSS",
    oneLiner: "A pip-installable middleware for PII redaction, injection scoring, and CI-gated eval.",
    problem:
      "Eval and injection-defense get rebuilt ad hoc inside every LLM project instead of shipped once as a reusable, testable layer.",
    tech: ["Python package", "PyPI", "GitHub Actions"],
    architecture:
      "A pip install-able middleware wrapping any LLM call: redacts PII pre-call, scores injection risk on user input, and runs golden-set regression in CI.",
    significance:
      "The single highest-leverage project in the whole plan — the one gap the research flags at every seniority level, retrofitted into projects 1-8.",
    freelanceValue: "'AI safety/guardrails audit' as a premium add-on to every other service",
    resumeBullet:
      "Built and published an open-source guardrails toolkit (PII redaction, prompt-injection scoring, CI-gated eval), retrofitted across five other production projects.",
    buildTime: "1-1.5 weeks initial, then ongoing",
    difficulty: "Medium-high",
  },
  {
    id: 10,
    slug: "graphrag",
    phase: "Deep technical differentiation",
    title: "GraphRAG for Relationship Intelligence",
    status: "planned",
    tag: "GraphRAG",
    oneLiner: "Hybrid graph and vector retrieval for multi-hop relationship queries.",
    problem:
      "Some questions aren't 'find the similar chunk,' they're 'how are these entities connected' — vector search alone fails here.",
    tech: ["Neo4j", "entity/relationship extraction", "hybrid retrieval"],
    architecture:
      "Documents to entity/relationship extraction to Neo4j graph; at query time, vector search for relevant nodes plus graph traversal for N-hop relationships, with the traversal path shown.",
    significance:
      "Explicitly flagged as a differentiator — GraphRAG appears in job reqs but almost never in candidate portfolios because it's genuinely harder than tutorial RAG.",
    freelanceValue: "Premium due-diligence / relationship-intelligence consulting",
    resumeBullet:
      "Built a GraphRAG system combining Neo4j relationship traversal with vector retrieval, answering multi-hop relationship queries vector-only RAG can't resolve.",
    buildTime: "1.5-2 weeks",
    difficulty: "High",
  },
  {
    id: 11,
    slug: "recsys",
    phase: "Deep technical differentiation",
    title: "Recommendation & Personalization Engine",
    status: "planned",
    tag: "Classical ML",
    oneLiner: "A hybrid embeddings and collaborative-filtering engine for ranking and recommendation.",
    problem:
      "Personalized ranking rarely needs an LLM in the loop — embeddings and collaborative filtering are usually faster and cheaper to serve.",
    tech: ["scikit-learn", "embedding-based similarity", "Redis"],
    architecture:
      "Batch job computes embeddings and collaborative-filtering signals to Redis feature store to low-latency serving endpoint to A/B-testable ranking.",
    significance:
      "Signals breadth beyond 'LLM wrapper' — convinces an ML-hiring-manager you're a real ML engineer, not only a prompt engineer.",
    freelanceValue: "Mainly a hiring-signal project, useful for e-commerce clients",
    resumeBullet:
      "Built a hybrid embeddings and collaborative-filtering recommendation engine served from Redis at sub-50ms latency, with offline precision@k evaluation against a popularity baseline.",
    buildTime: "1 week",
    difficulty: "Medium",
  },
  {
    id: 12,
    slug: "mlops-orchestration",
    phase: "Operational maturity & monetization",
    title: "MLOps Orchestration Layer",
    status: "planned",
    tag: "MLOps",
    oneLiner: "Nightly eval and retraining runs across every deployed project, with cross-project tracing.",
    problem:
      "All prior projects need a real retraining/monitoring loop, not manual reruns.",
    tech: ["Airflow / Prefect", "MLflow", "Terraform", "OpenTelemetry"],
    architecture:
      "Airflow DAGs schedule nightly eval runs (project 9's toolkit) across every deployed project, log results to MLflow, alert on regression — all infra defined in Terraform.",
    significance:
      "Reads as senior regardless of years of experience — operational maturity applied across a real portfolio, not a toy pipeline.",
    freelanceValue: "'AI ops audit / monitoring setup' — a premium retainer service",
    resumeBullet:
      "Built an Airflow and MLflow orchestration layer running nightly evals across production AI systems, with Terraform-managed infra and cross-project OpenTelemetry tracing.",
    buildTime: "1.5 weeks",
    difficulty: "High",
  },
  {
    id: 13,
    slug: "support-agent-saas",
    phase: "Operational maturity & monetization",
    title: "Monetized Micro-SaaS (Support Agent, Productized)",
    status: "planned",
    tag: "SaaS",
    oneLiner: "Project 2, turned into an actual product with billing, onboarding, and real signups.",
    problem:
      "Take the multi-tenant support agent and turn it into a product with paying customers, not a demo.",
    tech: ["Stripe billing", "marketing landing page", "self-serve onboarding"],
    architecture:
      "Signup to Stripe checkout to tenant provisioning automation to usage-based billing to in-app upgrade prompts.",
    significance:
      "'I shipped a product with paying customers' outranks every other resume line — proof of end-to-end ownership no take-home test can replicate.",
    freelanceValue: "The strongest freelance sales pitch available",
    resumeBullet:
      "Launched a self-serve AI support-agent SaaS product handling billing, onboarding, and multi-tenant provisioning end to end.",
    buildTime: "1-1.5 weeks on top of project 2's infra",
    difficulty: "Medium",
  },
  {
    id: 14,
    slug: "compliance-layer",
    phase: "Operational maturity & monetization",
    title: "Enterprise Security/Compliance Layer for Agents",
    status: "planned",
    tag: "Security",
    oneLiner: "An audit and approval layer that blocks and escalates high-risk agent actions.",
    problem:
      "Enterprises won't deploy an agent that can't prove it's safe.",
    tech: ["structured audit logging", "RBAC middleware", "approval-queue UI"],
    architecture:
      "Every agent action from projects 2, 4, and 5 routes through this layer before execution — scoped by role, logged immutably, high-risk actions queued for human approval.",
    significance:
      "Explicitly named in 2026 hiring checklists and confirmed underrepresented — pairs with project 9 for the strongest 'responsible AI' story in the portfolio.",
    freelanceValue: "Compliance/security audits — premium, low-competition",
    resumeBullet:
      "Built an audit-and-approval layer for agentic tool-calling — RBAC-scoped access, immutable action logging, and human-approval gating for high-risk actions.",
    buildTime: "1 week",
    difficulty: "Medium",
  },
  {
    id: 15,
    slug: "benchmark-dashboard",
    phase: "Operational maturity & monetization",
    title: "Public LLM/Vector-DB Cost & Latency Benchmark Dashboard",
    status: "planned",
    tag: "Benchmark",
    oneLiner: "A continuously-updated public dashboard comparing providers on cost, latency, and accuracy.",
    problem:
      "Nobody has a trustworthy, independent, continuously-updated comparison of LLM providers and vector DBs on a fixed task.",
    tech: ["Airflow", "Next.js", "vLLM", "pgvector / Qdrant"],
    architecture:
      "Scheduled Airflow job runs a fixed eval task against each provider to results in Postgres to a public Next.js dashboard with historical trendlines.",
    significance:
      "A marketing asset disguised as a project — the thing most likely to get organically shared, generating inbound recruiter and client interest.",
    freelanceValue: "A lead-generation engine — every comparison converts into 'can you build ours'",
    resumeBullet:
      "Built and maintain a public benchmark dashboard tracking cost, latency, and accuracy across LLM providers and vector databases.",
    buildTime: "1 week initial, ongoing thereafter",
    difficulty: "Medium",
  },
];
