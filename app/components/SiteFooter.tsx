import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-5xl border-t border-line px-6 py-16 sm:px-8 sm:py-24"
    >
      <p className="max-w-lg font-display text-2xl font-medium leading-snug sm:text-3xl">
        Hiring, or building something similar? Reach out at{" "}
        <a
          href={`mailto:${site.contact.email}`}
          className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
        >
          {site.contact.email}
        </a>
        .
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
        <span>{site.contact.location}</span>
        <a href={`mailto:${site.contact.email}`} className="hover:text-ink">
          Email
        </a>
        <a
          href={site.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink"
        >
          GitHub
        </a>
        <a
          href={site.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
