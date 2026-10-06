import Link from "next/link";
import { site } from "@/content/site";

// Small icon set for the link rail. Brand marks (GitHub, LinkedIn) are filled; the rest are line icons.
type IconProps = { className?: string };
const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Projects = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
  </svg>
);

const Cv = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

const GitHub = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

const LinkedIn = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const Scholar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
    <path d="M2 9 12 4l10 5-10 5L2 9Z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
  </svg>
);

const Mail = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

type LinkItem = { href: string; label: string; Icon: (p: IconProps) => React.ReactElement; internal?: boolean };

const links: LinkItem[] = [
  { href: "/projects", label: "Projects", Icon: Projects, internal: true },
  { href: site.contact.cv, label: "CV", Icon: Cv },
  { href: site.contact.github, label: "GitHub", Icon: GitHub },
  { href: site.contact.linkedin, label: "LinkedIn", Icon: LinkedIn },
  { href: site.contact.scholar, label: "Google Scholar", Icon: Scholar },
  { href: `mailto:${site.contact.email}`, label: "Email", Icon: Mail, internal: true },
];

function IconLink({ item, tip }: { item: LinkItem; tip: "right" | "below" }) {
  const { href, label, Icon, internal } = item;
  const className =
    "group relative grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-accent focus-visible:text-accent";
  const content = (
    <>
      <Icon className="h-[18px] w-[18px]" />
      {/* Name appears on hover and keyboard focus. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded bg-ink px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
          tip === "right" ? "left-full ml-2" : "top-full mt-1"
        }`}
      >
        {label}
      </span>
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} aria-label={label} className={className}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      aria-label={label}
      className={className}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  );
}

// Desktop: a slim column fixed to the left edge, vertically centred.
export function LinkRail() {
  return (
    <nav
      aria-label="Links"
      className="fixed top-1/2 left-2 z-40 hidden -translate-y-1/2 lg:block xl:left-6"
    >
      <ul className="flex flex-col gap-1 rounded-lg border border-line bg-bg/90 p-1 backdrop-blur">
        {links.map((item) => (
          <li key={item.label}>
            <IconLink item={item} tip="right" />
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Phones and tablets: the same icons in a row.
export function LinkRow() {
  return (
    <nav aria-label="Links" className="lg:hidden">
      <ul className="-ml-3 flex flex-wrap">
        {links.map((item) => (
          <li key={item.label}>
            <IconLink item={item} tip="below" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
