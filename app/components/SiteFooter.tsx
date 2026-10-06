import { site } from "@/content/site";

const links = [
  { href: `mailto:${site.contact.email}`, label: site.contact.email },
  { href: site.contact.github, label: "GitHub" },
  { href: site.contact.linkedin, label: "LinkedIn" },
  { href: site.contact.scholar, label: "Google Scholar" },
  { href: site.contact.cv, label: "CV (PDF)" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="shell grid gap-10 py-20 text-xs sm:grid-cols-3">
      <div>
        <h2 className="text-muted">Contact</h2>
        <ul className="mt-3 flex flex-col gap-1.5">
          {links.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="[overflow-wrap:anywhere] hover:text-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-muted">Education</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {site.education.map((ed) => (
            <li key={ed.school}>
              <p>{ed.school}</p>
              <p className="text-muted">
                {ed.degree} · {ed.dates}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-muted">Publication</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {site.publications.map((pub) => (
            <li key={pub.url}>
              <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {pub.title}
              </a>
              <p className="text-muted">{pub.venue}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-muted">
          © {new Date().getFullYear()} {site.name} · {site.contact.location}
        </p>
      </div>
    </footer>
  );
}
