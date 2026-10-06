import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { built, findBuilt } from "@/app/lib/work";
import { TopBar } from "@/app/components/TopBar";
import { Cover } from "@/app/components/Cover";
import { Screenshot } from "@/app/components/Screenshot";
import { RAGProjectHero, RAGArchitecture } from "@/app/components/RAGCaseStudy";
import { ProjectStoryHero, ProjectStoryArchitecture } from "@/app/components/ProjectStory";

export function generateStaticParams() {
  return built.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const found = findBuilt((await params).slug);
  if (!found) return {};
  return {
    title: `${found.project.title} — Rayyan Ahemad`,
    description: found.project.oneLiner,
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
      <h2 className="text-xs text-muted">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = findBuilt((await params).slug);
  if (!found) notFound();
  const { project: p, index } = found;
  const illustratedRag = p.slug === "eu-ai-act-assistant";
  const prev = built[(index - 1 + built.length) % built.length];
  const next = built[(index + 1) % built.length];

  return (
    <>
      <TopBar />
      <main id="main-content" className="shell flex-1 pb-20">
        <Link href="/projects" className="text-xs text-muted hover:text-ink">
          ← All projects
        </Link>

        {illustratedRag ? <RAGProjectHero project={p} /> : <ProjectStoryHero project={p} />}
        {illustratedRag ? <RAGArchitecture project={p} /> : <ProjectStoryArchitecture project={p} />}

        {p.gallery && p.gallery.length > 0 && (
          <div id="screenshots"><Block label="Screenshots">
            <div className="grid gap-8">
              {p.gallery.map((g, i) => (
                <Screenshot
                  key={g.src}
                  src={g.src}
                  caption={g.caption}
                  width={g.width}
                  height={g.height}
                  priority={i === 0}
                  sizes="(min-width: 1040px) 820px, 100vw"
                />
              ))}
            </div>
          </Block></div>
        )}

        <div id="information"><Block label="Information">
          <p className="max-w-2xl text-[15px] leading-relaxed">{p.problem}</p>

          {(p.context || p.team) && (
            <p className="mt-4 text-xs text-muted">
              {p.context}
              {p.context && p.team && " · "}
              {p.team && <>Team of {p.team.length + 1}, with {p.team.join(" & ")}</>}
            </p>
          )}

          {p.metrics && (
            <dl className="mt-8 grid grid-cols-2 border-t border-line sm:grid-cols-3">
              {p.metrics.map((m) => (
                <div key={m.label} className="border-b border-line py-4 pr-4">
                  <dt className="text-xs leading-snug text-muted">{m.label}</dt>
                  <dd className="mt-1 font-mono text-lg tabular-nums">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {p.myRole && (
            <div className="mt-8">
              <h3 className="text-xs text-muted">What I built</h3>
              <ul className="mt-3 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {p.myRole.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ul aria-label="Technologies" className="mt-8 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <li key={t} className="tech-tag">
                {t}
              </li>
            ))}
          </ul>

          {(p.deck || p.repo) && (
            <p className="mt-8 flex flex-wrap gap-3">
              {p.deck && (
                <a href={p.deck} download className="button">
                  Download the deck (.pptx)
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="button">
                  Code on GitHub ↗
                </a>
              )}
            </p>
          )}
        </Block></div>

        <nav aria-label="More projects" className="grid grid-cols-2 gap-4 border-t border-line pt-10">
          {[
            { p: prev, label: "Previous" },
            { p: next, label: "Next" },
          ].map(({ p: q, label }) => (
            <Link
              key={label}
              href={`/projects/${q.slug}`}
              aria-label={`${label}: ${q.title}`}
              className={`group block ${label === "Next" ? "text-right" : ""}`}
            >
              <p className="mb-2 text-xs text-muted group-hover:text-ink" aria-hidden="true">
                {label === "Previous" ? "←" : ""} {q.title} {label === "Next" ? "→" : ""}
              </p>
              <Cover project={q} className="aspect-[5/3] rounded-[3px]" />
            </Link>
          ))}
        </nav>
      </main>
    </>
  );
}
