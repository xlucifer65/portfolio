import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 sm:px-8 sm:py-24 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
      <div className="order-2 flex flex-col gap-7 md:order-1">
        <p className="text-xs uppercase tracking-[0.1em] text-muted">
          {site.heroEyebrow}
        </p>
        <h1 className="text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          {site.headline.pre}
          <em className="font-display italic">{site.headline.italic}</em>
          {site.headline.post}
        </h1>
        <p className="max-w-md text-base leading-relaxed text-muted">
          {site.lede}
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/#work"
            className="rounded-[3px] bg-ink px-6 py-3 text-sm text-cream transition-opacity hover:opacity-85"
          >
            See the work
          </Link>
          <Link
            href="/#contact"
            className="rounded-[3px] border border-ink px-6 py-3 text-sm transition-colors hover:bg-ink hover:text-cream"
          >
            Get in touch
          </Link>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <div className="relative aspect-[4/5] w-[60%] max-w-xs overflow-hidden rounded-[3px] border border-line sm:w-full sm:max-w-none">
          <Image
            src="/portrait.png"
            alt={site.name}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
