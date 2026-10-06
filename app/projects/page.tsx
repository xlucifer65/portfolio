import type { Metadata } from "next";
import Link from "next/link";
import { built } from "@/app/lib/work";
import { TopBar } from "@/app/components/TopBar";
import { Cover } from "@/app/components/Cover";

export const metadata: Metadata = {
  title: "Projects — Rayyan Ahemad",
  description: "Shipped AI and data systems, and the RAG Starter Kit in progress.",
};

// Thumbnails only. Each link's accessible name is the project title.
export default function ProjectsPage() {
  return (
    <>
      <TopBar />
      <main id="main-content" className="shell flex-1 pt-6 pb-24">
        <h1 className="sr-only">Projects</h1>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {built.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                aria-label={p.title}
                className="group block"
              >
                <Cover
                  project={p}
                  className="aspect-[4/3] rounded-[3px] transition-transform duration-300 group-hover:-translate-y-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
