import { projects, shipped, type Project } from "@/content/projects";

// Built work shown on the site: the spotlight first, then shipped, then in progress.
// Roadmap ("planned") projects are deliberately left out so nothing unbuilt looks built.
export const built: Project[] = [
  ...shipped.filter((p) => p.spotlight),
  ...shipped.filter((p) => !p.spotlight),
  ...projects.filter((p) => p.status === "in-progress"),
];

export function findBuilt(slug: string) {
  const index = built.findIndex((p) => p.slug === slug);
  return index === -1 ? null : { project: built[index], index };
}
