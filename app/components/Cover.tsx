import type { Project } from "@/content/projects";
import { statusLabel } from "@/content/projects";
import { ProjectCoverArt } from "@/app/components/ProjectCoverArt";
import styles from "./Cover.module.css";

// Illustrated project cover. `caption` adds the title/status strip; the home rail turns it off
// because it already prints the title above each card.
export function Cover({
  project,
  className = "",
  caption = true,
}: {
  project: Project;
  className?: string;
  caption?: boolean;
}) {
  return (
    <div aria-hidden="true" className={`cover ${styles.root} ${className}`}>
      <div className={caption ? styles.art : styles.artFull}>
        <ProjectCoverArt slug={project.slug} />
      </div>
      {caption && (
        <div className={styles.caption}>
          <p className={styles.title}>{project.title}</p>
          <span className={styles.status}>{statusLabel[project.status]}</span>
        </div>
      )}
    </div>
  );
}
