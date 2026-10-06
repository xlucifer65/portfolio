import Link from "next/link";
import { site } from "@/content/site";

// Quiet header: name on the left (except on the home page), three small links on the right.
export function TopBar({ showName = true }: { showName?: boolean }) {
  return (
    <header className="shell flex items-center justify-between py-6 text-xs">
      {showName ? (
        <Link href="/" className="font-medium">
          {site.name}
        </Link>
      ) : (
        <span />
      )}
      <nav aria-label="Main navigation">
        <ul className="flex gap-5 text-muted">
          <li>
            <Link href="/projects" className="hover:text-ink">
              Projects
            </Link>
          </li>
          <li>
            <a href={site.contact.cv} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              CV
            </a>
          </li>
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
