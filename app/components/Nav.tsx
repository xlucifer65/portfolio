import Link from "next/link";
import { site } from "@/content/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-6 gap-y-3 px-6 py-6 sm:px-8">
        <Link href="/" className="group whitespace-nowrap">
          <span className="font-display text-lg font-medium tracking-tight">
            {site.name}
          </span>
          <span className="ml-3 hidden text-xs uppercase tracking-[0.08em] text-muted sm:inline">
            {site.role}
          </span>
        </Link>
        <ul className="flex gap-5 text-sm sm:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="border-b border-transparent pb-0.5 transition-colors hover:border-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
