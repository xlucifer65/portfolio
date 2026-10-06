import Link from "next/link";
import { site } from "@/content/site";

const external = [
  { href: site.contact.cv, label: "CV" },
  { href: site.contact.github, label: "GitHub" },
  { href: site.contact.linkedin, label: "LinkedIn" },
  { href: site.contact.scholar, label: "Google Scholar" },
];

// Quiet header, everything aligned left: name (except on the home page), then all links.
export function TopBar({ showName = true }: { showName?: boolean }) {
  return (
    <header className="shell flex flex-wrap items-center gap-x-8 gap-y-3 py-6 text-xs">
      {showName && (
        <Link href="/" className="font-medium">
          {site.name}
        </Link>
      )}
      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-muted">
          <li>
            <Link href="/projects" className="hover:text-ink">
              Projects
            </Link>
          </li>
          {external.map(({ href, label }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.contact.email}`} className="hover:text-ink">
              Email
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
