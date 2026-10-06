// Skills shown on the homepage. Edit freely — categories and order are yours to change.

export const skillGroups: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "TypeScript / JavaScript", "SQL", "Java"] },
  {
    category: "AI / LLM Engineering",
    items: ["RAG", "Claude API", "pgvector", "LangGraph", "DeepEval", "Agents & tool use"],
  },
  {
    category: "Data & ML",
    items: ["pandas", "NumPy", "scikit-learn", "CNNs", "Clustering", "Feature engineering"],
  },
  {
    category: "Data & MLOps",
    items: ["Apache Airflow", "Great Expectations", "Docker Compose", "PostgreSQL"],
  },
  {
    category: "Backend & APIs",
    items: ["FastAPI", "Node.js / Express", "SQLAlchemy", "Pydantic", "REST API design"],
  },
  {
    category: "Frontend & Tooling",
    items: ["Next.js", "React", "Tailwind CSS", "Git", "pytest", "Z3 SMT solver"],
  },
];
