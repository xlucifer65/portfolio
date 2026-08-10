import Link from "next/link";
import { projects } from "@/content/projects";
import { StatusBadge } from "@/app/components/StatusBadge";

const featured = projects.filter((p) => p.highlight).slice(0, 5);

export function SelectedWork() {
  return (
    <section
      id="work"
      className="mx-auto max-w-5xl border-t border-line px-6 py-16 sm:px-8 sm:py-24"
    >
      <div className="mb-10 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Selected work
        </h2>
        <Link
          href="/projects"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          All projects →
        </Link>
      </div>

      <ol className="border-t border-line">
        {featured.map((project, i) => (
          <li key={project.id} className="border-b border-line">
            <Link
              href={`/projects#${project.slug}`}
              className="group flex items-baseline gap-6 py-6 transition-transform hover:-translate-x-1 sm:gap-10"
            >
              <span className="font-display text-sm text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-lg font-medium sm:text-xl">
                    {project.title}
                  </span>
                  <StatusBadge status={project.status} />
                </span>
                <span className="mt-1 block max-w-lg text-sm text-muted">
                  {project.oneLiner}
                </span>
              </span>
              <span className="hidden shrink-0 text-xs uppercase tracking-[0.08em] text-muted sm:inline">
                {project.tag}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
