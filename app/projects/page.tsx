import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/app/components/Nav";
import { SiteFooter } from "@/app/components/SiteFooter";
import { PipelineDiagram } from "@/app/components/PipelineDiagram";
import { HowItWorks } from "@/app/components/HowItWorks";
import { StatusBadge } from "@/app/components/StatusBadge";
import { Chevron } from "@/app/components/Chevron";
import { projects, type Phase } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects — Rayyan Ahemad",
  description: "The full build plan: fifteen production AI systems, in dependency order.",
};

const phases: Phase[] = [
  "Core foundations",
  "Agentic & multi-system",
  "Deep technical differentiation",
  "Operational maturity & monetization",
];

const phaseNote: Record<Phase, string> = {
  "Core foundations":
    "RAG, agentic orchestration, document intelligence, MCP — the infrastructure every later project reuses.",
  "Agentic & multi-system":
    "Multi-agent orchestration, browser automation, real-time voice.",
  "Deep technical differentiation":
    "Fine-tuning, guardrails, graph retrieval, classical ML — proof this goes past API wrapping.",
  "Operational maturity & monetization":
    "Orchestration across everything above, a shipped product, an audit layer, a public asset.",
};

const shippedCount = projects.filter((p) => p.status !== "planned").length;
const plannedCount = projects.length - shippedCount;

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <header className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
          <p className="text-xs uppercase tracking-[0.1em] text-muted">Projects</p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl">
            Fifteen systems, built in dependency order.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Each phase reuses the infrastructure — auth, eval, observability,
            deploy — established in the phase before it. This is a build
            order, not a list.
          </p>
          <p className="mt-6 font-display text-sm text-muted">
            {shippedCount} in progress · {plannedCount} planned
          </p>
        </header>

        {phases.map((phase) => {
          const phaseProjects = projects.filter((p) => p.phase === phase);
          const hasRealWork = phaseProjects.some((p) => p.status !== "planned");

          return (
            <details
              key={phase}
              open={hasRealWork}
              className="group mx-auto max-w-5xl border-t border-line px-6 py-12 sm:px-8"
            >
              <summary className="mb-8 flex cursor-pointer list-none flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <span className="flex items-center gap-2 font-display text-xl font-medium tracking-tight">
                  <Chevron />
                  {phase}
                  <span className="font-sans text-xs font-normal normal-case tracking-normal text-muted">
                    ({phaseProjects.length})
                  </span>
                </span>
                <p className="max-w-sm text-sm text-muted sm:text-right">
                  {phaseNote[phase]}
                </p>
              </summary>

              <ol className="border-t border-line">
                {phaseProjects.map((project) => (
                  <li
                    key={project.id}
                    id={project.slug}
                    className="scroll-mt-24 border-b border-line py-6"
                  >
                    {project.image && (
                      <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-line sm:ml-16">
                        <Image
                          src={project.image}
                          alt={`${project.title} interface`}
                          fill
                          sizes="(min-width: 640px) 60vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
                      <span className="font-display text-sm text-muted sm:w-8">
                        {String(project.id).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="font-display text-lg font-medium sm:text-xl">
                            {project.title}
                          </h3>
                          <StatusBadge status={project.status} />
                        </div>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                          {project.problem}
                        </p>
                        {project.flow && (
                          <PipelineDiagram
                            stages={project.flow.stages}
                            branch={project.flow.branch}
                            caption={project.flow.caption}
                          />
                        )}
                        {project.flow ? (
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {project.tech.slice(0, 5).map((t) => (
                              <li
                                key={t}
                                className="rounded-[3px] border border-line px-2 py-0.5 text-xs text-muted"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-3 text-xs text-muted">
                            {project.tech.join(" · ")}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-xs uppercase tracking-[0.08em] text-muted sm:text-right">
                        {project.tag}
                      </span>
                    </div>
                    {project.howItWorks && (
                      <div className="sm:pl-16">
                        <HowItWorks
                          steps={project.howItWorks}
                          defaultOpen={project.status === "in-progress"}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </details>
          );
        })}
      </main>
      <SiteFooter />
    </>
  );
}
