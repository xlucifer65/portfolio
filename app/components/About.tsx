import { site } from "@/content/site";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-5xl gap-8 border-t border-line px-6 py-16 sm:px-8 sm:py-24 md:grid-cols-[1fr_2fr] md:gap-16"
    >
      <p className="text-xs uppercase tracking-[0.1em] text-muted">About</p>
      <div className="flex max-w-xl flex-col gap-5">
        <p className="font-display text-xl font-medium leading-relaxed sm:text-2xl">
          {site.about.lead}
        </p>
        <p className="text-sm leading-relaxed text-muted">
          {site.about.muted}
        </p>
      </div>
    </section>
  );
}
