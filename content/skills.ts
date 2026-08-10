// Skills shown on the homepage. Edit freely — categories and order are yours to change.

export const skillGroups: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "TypeScript / JavaScript", "SQL"] },
  {
    category: "Backend & APIs",
    items: ["FastAPI", "Flask", "Node.js / Express", "REST API design"],
  },
  { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
  { category: "Data & ML", items: ["Pandas", "NumPy", "scikit-learn"] },
  {
    category: "AI / LLM Engineering",
    items: ["LangGraph", "LlamaIndex", "OpenAI API", "Langfuse", "DeepEval", "pgvector"],
  },
  { category: "Infra & Data", items: ["PostgreSQL", "MongoDB", "Docker", "Git"] },
];
