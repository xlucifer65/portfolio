import type { Project } from "@/content/projects";
import { StatusBadge } from "@/app/components/StatusBadge";
import { PipelineDiagram } from "@/app/components/PipelineDiagram";
import { ProjectCoverArt } from "@/app/components/ProjectCoverArt";
import { ProjectStepArt } from "@/app/components/ProjectStepArt";
import styles from "./ProjectStory.module.css";

function stepKind(step: string) {
  switch(step) {
    case "Feature contract": case "Ingest and validate": case "Gate": return "contract";
    case "Alert": return "alert";
    case "Serve": case "Trace": return "service";
    case "Run anywhere": return "containers";
    case "Pick a topic": case "Retrieve": return "data";
    case "Make the image": return "image";
    case "Review and publish": case "Retrieve and write": case "Ask": case "Synthesize": return "review";
    default: return "documents";
  }
}

export function ProjectStoryHero({ project }: { project: Project }) {
  return (
    <header className={styles.hero}>
      <div className={styles.intro}>
        <div className={styles.kicker}><span className="eyebrow">{project.tag}</span><StatusBadge status={project.status} /></div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.oneLiner}</p>
        <div className={styles.links}>
          <a className="text-link" href={project.flow ? "#architecture" : "#information"}>{project.flow ? "Explore the architecture ↓" : "Read the project ↓"}</a>
          {project.repo && <a className="text-link" href={project.repo} target="_blank" rel="noopener noreferrer">Source code ↗</a>}
        </div>
      </div>
      <div className={styles.visual} aria-hidden="true"><ProjectCoverArt slug={project.slug} /></div>
    </header>
  );
}

export function ProjectStoryArchitecture({ project }: { project: Project }) {
  if (!project.flow) return null;
  return (
    <section id="architecture" className={styles.process} aria-labelledby="project-architecture-title">
      <p className="eyebrow">Architecture</p>
      <h2 id="project-architecture-title" className={`${styles.processTitle} mt-3`}>How it works</h2>
      <div className={styles.overview}><PipelineDiagram {...project.flow} /></div>
      {project.howItWorks && <ol className={styles.steps}>
        {project.howItWorks.map((s,i)=><li key={s.step} className={styles.step}>
          <div className={styles.stepCopy}>
            <p className="eyebrow" aria-hidden="true">{String(i+1).padStart(2,"0")} / {String(project.howItWorks?.length).padStart(2,"0")}</p>
            <h3 className={styles.stepTitle}>{s.step}</h3>
            <p className={styles.stepText}>{s.detail}</p>
          </div>
          <div className={styles.stepVisual} aria-hidden="true"><ProjectStepArt kind={stepKind(s.step)} /></div>
        </li>)}
      </ol>}
    </section>
  );
}
