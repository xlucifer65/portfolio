import type { Project } from "@/content/projects";
import { StatusBadge } from "@/app/components/StatusBadge";
import { PipelineDiagram } from "@/app/components/PipelineDiagram";
import { RAGIllustration } from "@/app/components/RAGIllustration";
import styles from "./RAGCaseStudy.module.css";

function illustrationFor(step: string) {
  switch (step) {
    case "Index": case "Ingest": return "documents";
    case "Clean the question": return "clean";
    case "Hybrid search": case "Retrieve": return "retrieve";
    case "Re-rank and gate": case "Gate": return "gate";
    case "Answer with citations": case "Synthesize": case "Ask": return "answer";
    case "Agent mode": return "agent";
    case "Evaluate everything": case "Trace": return "evaluate";
    default: return "overview";
  }
}

export function RAGProjectHero({ project }: { project: Project }) {
  const legal = project.slug === "eu-ai-act-assistant";
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.intro}>
          <div className={styles.kicker}><span className="eyebrow">{project.tag}</span><StatusBadge status={project.status} /></div>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.oneLiner}</p>
          <div className={styles.links}>
            <a className="text-link" href="#architecture">Explore the architecture ↓</a>
            {project.gallery?.length ? <a className="text-link" href="#screenshots">See it running ↓</a> : null}
            {project.deck && <a className="text-link" href={project.deck} download>Download the deck ↓</a>}
            {project.repo && <a className="text-link" href={project.repo} target="_blank" rel="noopener noreferrer">Source code ↗</a>}
          </div>
        </div>
        <figure className={styles.visual} aria-label="Illustration of source documents, retrieval and cited answers">
          <RAGIllustration kind="overview" legal={legal} />
        </figure>
      </header>
      {project.metrics && <dl className={styles.results}>{project.metrics.slice(0,3).map((m) => <div key={m.label} className={styles.result}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>}
    </>
  );
}

export function RAGArchitecture({ project }: { project: Project }) {
  const legal = project.slug === "eu-ai-act-assistant";
  return (
    <section id="architecture" className={styles.process} aria-labelledby="rag-architecture-title">
      <p className="eyebrow">Architecture</p>
      <h2 id="rag-architecture-title" className={`${styles.processTitle} mt-3`}>How it works</h2>
      {project.flow && <div className={styles.overview}><PipelineDiagram {...project.flow} /></div>}
      <ol className={styles.steps}>
        {project.howItWorks?.map((s, i) => (
          <li className={styles.step} key={s.step}>
            <div className={styles.stepCopy}>
              <p aria-hidden="true" className="eyebrow">{String(i+1).padStart(2,"0")} / {String(project.howItWorks?.length).padStart(2,"0")}</p>
              <h3 className={styles.stepTitle}>{s.step}</h3>
              <p className={styles.stepText}>{s.detail}</p>
            </div>
            <div className={styles.stepVisual} aria-hidden="true"><RAGIllustration kind={illustrationFor(s.step)} legal={legal} /></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
