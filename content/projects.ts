// Content for the homepage's "Selected work" section and the full /projects page.
// `shipped` holds finished and in-progress work; `projects` is the 15-project roadmap.
// `highlight: true` marks the entries shown on the homepage "Selected work" list.

export type ProjectStatus = "in-progress" | "planned" | "done";

export const statusLabel: Record<ProjectStatus, string> = {
  "in-progress": "In progress",
  planned: "Planned",
  done: "Shipped",
};

export type Phase =
  | "Core foundations"
  | "Agentic & multi-system"
  | "Deep technical differentiation"
  | "Operational maturity & monetization";

export interface Project {
  id: number;
  slug: string;
  phase?: Phase; // roadmap projects only
  title: string;
  status: ProjectStatus;
  repo?: string; // public GitHub repository
  context?: string; // where it was built, e.g. "EPITA course project · team of 3"
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
  spotlight?: boolean; // the one project shown as the big featured case study on the homepage
  team?: string[]; // teammates to credit on team projects
  myRole?: string[]; // what I personally built on a team project (taken from my commits)
  metrics?: { value: string; label: string }[]; // measured results only, each from the project's own eval
  gallery?: { src: string; caption: string; width?: number; height?: number }[]; // REAL screenshots of the running app, under /public (width/height = pixel size, for uncropped display)
  deck?: string; // downloadable presentation under /public
  // Planning notes for roadmap entries; not rendered on the site.
  architecture?: string;
  significance?: string; // why it matters to recruiters/clients
  freelanceValue?: string;
  resumeBullet?: string;
  buildTime?: string;
  difficulty?: "Low-medium" | "Medium" | "Medium-high" | "High";
}

export const shipped: Project[] = [
  {
    id: 105,
    slug: "eu-ai-act-assistant",
    title: "EU AI Act Assistant",
    status: "done",
    highlight: true,
    spotlight: true,
    context: "EPITA · Team ParisAI",
    team: ["Sai Prasad Bandari", "Prodipta Paul"],
    tag: "RAG + Agent",
    oneLiner:
      "Cited question answering over the 144-page EU AI Act, with hybrid search, local re-ranking, an agent with human-approved actions and measured injection defences.",
    problem:
      "The EU AI Act is 144 pages of legal text: 113 articles, 13 annexes and 180 recitals. Answers about it have to be exact (fine amounts, dates, article numbers), so the assistant answers only from the regulation, cites the page, and refuses when the answer isn't there.",
    flow: {
      stages: [
        "Clean the question",
        "FAISS + BM25 → RRF",
        "bge-reranker (local GPU)",
        "Relevance gate ≥ 0.05",
        "Trimmed context",
        "Answer + page citations",
      ],
      branch: ["Cited answer + confidence score", "“I don't have information”"],
      caption:
        "Agent mode swaps the fixed path for a tool loop: six tools, a 6-step cap, and a code guard so a message can only reach the human approval gate when the user asks for it.",
    },
    metrics: [
      { value: "0.87", label: "Recall@5 on 44 eval questions" },
      { value: "0.63", label: "Recall@1 with re-ranking, up from 0.37" },
      { value: "10/10", label: "prompt-injection attacks resisted (was 7/10)" },
      { value: "0/3", label: "poisoned sends reached the approval gate" },
      { value: "0%", label: "wrong refusals on answerable questions" },
      { value: "$0", label: "per question in fully local mode" },
    ],
    gallery: [
      {
        src: "/projects/eu-ai-act/chat.jpg", width: 1330, height: 896,
        caption: "A cited answer with its confidence score and the live cost table.",
      },
      {
        src: "/projects/eu-ai-act/how-it-works.jpg", width: 1232, height: 961,
        caption: "The clickable How it works flowchart: RAG pipeline next to the agent loop.",
      },
      {
        src: "/projects/eu-ai-act/routing.jpg", width: 1330, height: 896,
        caption: "Routing check: does the agent pick the right tool for each kind of question?",
      },
      {
        src: "/projects/eu-ai-act/trace.jpg", width: 1470, height: 801,
        caption: "Retrieval trace: every step of a question, with what happened and how long it took.",
      },
    ],
    deck: "/ParisAI_RAG_Agent.pptx",
    myRole: [
      "Built the first version: FAISS retrieval, gpt-4o-mini answers with page citations, Gradio UI",
      "Moved re-ranking onto the local GPU and added query and retrieval caches",
      "Added api, hybrid and fully local run modes, streamed answers and smaller prompts",
      "Built the prompt-injection defences and test suite: 7/10 → 10/10 attacks resisted",
      "Wrote the eval runner: recall@k, MRR, ablation and threshold tables, regression checks",
      "Added the get_definition and date_diff agent tools, the send guard and the action-injection test",
      "Built the retrieval trace, the How it works, Routing and Evaluation pages, and the presentation deck",
    ],
    howItWorks: [
      {
        step: "Index",
        detail:
          "The 144-page regulation is extracted with PyMuPDF, split into 1,000-character chunks with 200 overlap, embedded (text-embedding-3-small, or bge-base on the local GPU) into FAISS, and indexed again for BM25 keyword search.",
      },
      {
        step: "Clean the question",
        detail:
          "Before anything runs, sentences that give the assistant orders and text posing as context or citations are stripped out, so a question can't smuggle in fake passages. That alone took injection resistance from 7/10 to 10/10.",
      },
      {
        step: "Hybrid search",
        detail:
          "FAISS (meaning) and BM25 (exact terms like “Article 6(1)” or “Annex III”) each return their top 15, merged by Reciprocal Rank Fusion. A question that names an article or annex also gets that unit's own text by its heading.",
      },
      {
        step: "Re-rank and gate",
        detail:
          "A bge-reranker cross-encoder scores up to 30 candidates on the local GPU. If the best passage scores below 0.05, the question is refused without calling the model at all.",
      },
      {
        step: "Answer with citations",
        detail:
          "At most 5 passages go to the model, trimmed to their relevant sentences (29% fewer tokens). Every claim cites source and page; a check flags any cited page the model was never given, and each answer gets a confidence score.",
      },
      {
        step: "Agent mode",
        detail:
          "The model picks from six tools (search, calculator, exact quote, definitions, date gaps and a send_message draft), capped at 6 steps. Sending is guarded in code and needs a person to confirm, so a poisoned document can't make it act.",
      },
      {
        step: "Evaluate everything",
        detail:
          "44 questions with expected pages drive recall@k, MRR, an ablation per retrieval stage, a refusal-threshold table and a regression script that fails on any regression. Every API call is priced, with a hard $5 budget cap.",
      },
    ],
    tech: ["Python", "FAISS", "BM25", "bge-reranker", "gpt-4o-mini", "Qwen2.5-3B", "Gradio", "uv"],
  },
  {
    id: 101,
    slug: "house-price-mlops",
    title: "House Price MLOps Pipeline",
    status: "done",
    highlight: true,
    repo: "https://github.com/xlucifer65/Housing-price-prediction",
    context: "EPITA · Data Science in Production",
    flow: {
      stages: [
        "New data files",
        "Airflow ingestion DAG",
        "Great Expectations checkpoint",
        "PostgreSQL + run stats",
        "FastAPI model service",
        "Streamlit app",
      ],
      caption:
        "Failing batches are routed away from training and trigger a Microsoft Teams alert; validation results are published as Data Docs.",
    },
    howItWorks: [
      {
        step: "Feature contract",
        detail:
          "A shared feature module defines every input field and its valid range, so training, the serving API and the Airflow DAGs build features the same way. That keeps training and serving in sync.",
      },
      {
        step: "Ingest and validate",
        detail:
          "An Airflow DAG picks up new data and runs it through a Great Expectations checkpoint. Passing and failing rows are split, and run statistics are written to PostgreSQL.",
      },
      {
        step: "Alert",
        detail:
          "When a checkpoint fails, the pipeline posts an alert to Microsoft Teams, so bad data is caught before it reaches the model.",
      },
      {
        step: "Serve",
        detail:
          "A FastAPI service loads the model and answers predictions; a scheduled prediction DAG scores new data. The Streamlit app only talks to the API, never to the model or database directly.",
      },
      {
        step: "Run anywhere",
        detail:
          "Every service runs from one Docker Compose file, so the whole stack starts with a single command.",
      },
    ],
    tag: "MLOps",
    oneLiner:
      "Validated data pipeline and model API with Airflow, Great Expectations and alerting.",
    problem:
      "A model is only as reliable as the data reaching it. This project wraps a house-price regression model in the production pieces around it: data validation, alerting, a serving API and an app.",
    tech: ["Airflow", "Great Expectations", "FastAPI", "PostgreSQL", "Streamlit", "Docker Compose"],
  },
  {
    id: 102,
    slug: "linkedin-hr-agent",
    title: "LinkedIn HR Agent",
    status: "done",
    highlight: true,
    repo: "https://github.com/xlucifer65/linkedin-hr-agent",
    flow: {
      stages: [
        "PDF · DOCX · URL · Drive",
        "Extract + chunk",
        "Local embeddings → pgvector",
        "Claude tool use",
        "Branded image card",
        "Review → LinkedIn / Drive",
      ],
      caption:
        "A daily scheduler runs the agent automatically; agent memory stops it repeating recent topics.",
    },
    howItWorks: [
      {
        step: "Build the knowledge base",
        detail:
          "Files, web pages and Google Drive documents are extracted, split into 500-word chunks with 50-word overlap, embedded locally with bge-small and stored in PostgreSQL with pgvector.",
      },
      {
        step: "Pick a topic",
        detail:
          "The agent chooses a service from the company catalog and checks its memory so it doesn't repeat a recent topic.",
      },
      {
        step: "Retrieve and write",
        detail:
          "The closest chunks are found by cosine similarity. Claude Sonnet writes the post from that context and returns it through tool calls, so the output is structured.",
      },
      {
        step: "Make the image",
        detail:
          "Claude Haiku writes an image prompt, DALL·E renders the visual, and Pillow composes a branded card with the headline and key points.",
      },
      {
        step: "Review and publish",
        detail:
          "Drafts appear in a Next.js dashboard for review, then publish to LinkedIn through OAuth or save to Google Drive.",
      },
    ],
    tag: "RAG agent",
    oneLiner:
      "An agent that writes branded LinkedIn posts grounded in a company's own documents.",
    problem:
      "An HR company wanted regular LinkedIn posts that stay accurate to its own services and documents, without someone writing each one by hand.",
    tech: ["FastAPI", "Claude API", "pgvector", "fastembed", "Next.js", "Docker Compose"],
  },
  {
    id: 103,
    slug: "epita-scheduler",
    title: "EPITA Class Scheduler",
    status: "done",
    highlight: true,
    repo: "https://github.com/xlucifer65/epita-scheduler",
    flow: {
      stages: [
        "Courses · teachers · rooms · timeslots",
        "Constraints encoded for Z3",
        "SMT solve",
        "Conflict-free weekly timetable",
        "React calendar UI",
      ],
      caption:
        "Versioned REST API over a repository/service layer, Alembic migrations, and tests on both backend and frontend.",
    },
    tag: "Optimization",
    oneLiner:
      "A timetable engine that turns room, teacher and slot rules into a conflict-free schedule with the Z3 solver.",
    problem:
      "Building a university timetable by hand means juggling room capacity, teacher availability and course clashes. Encoding those rules as constraints lets a solver find a valid week automatically.",
    tech: ["Z3 SMT solver", "FastAPI", "SQLAlchemy", "PostgreSQL", "React + TypeScript", "pytest"],
  },
  {
    id: 104,
    slug: "valeurs-foncieres",
    title: "Valeurs Foncières Analysis",
    status: "done",
    highlight: true,
    repo: "https://github.com/xlucifer65/valeurs-foncieres-project",
    context: "Team of 3",
    tag: "Data",
    oneLiner:
      "Loading and cleaning about 20 million French property sales from data.gouv.fr.",
    problem:
      "Five years of French real-estate transactions (2021–2025) is roughly 20 million rows. I wrote the loading, merging and cleaning notebooks (missing values, types, outliers, duplicates) and set up the repository conventions the team built its analysis on.",
    tech: ["Python", "pandas", "Jupyter"],
  },
];

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
