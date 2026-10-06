import Image from "next/image";
import { site } from "@/content/site";
import { statusLabel } from "@/content/projects";
import { built } from "@/app/lib/work";
import { TopBar } from "@/app/components/TopBar";
import { Cover } from "@/app/components/Cover";
import { BookRail } from "@/app/components/BookRail";
import { SiteFooter } from "@/app/components/SiteFooter";

export default function Home() {
  return (
    <>
      <TopBar showName={false} />
      <main id="main-content" className="flex-1">
        {/* Wide portrait anchored bottom-right; the text sits in its empty left side. */}
        <section className="relative flex flex-col lg:block lg:h-[calc(100svh-4rem)] lg:min-h-[560px] lg:overflow-hidden">
          <div className="shell relative z-10 flex h-full items-center py-10 lg:py-0">
            <div className="max-w-sm text-[15px] leading-relaxed">
              <h1 className="font-medium">{site.name}</h1>
              <p className="text-muted">
                {site.role}, {site.contact.location.split(",")[0]}
              </p>
              <p className="mt-6">{site.lede}</p>
              <a href="#work" className="mt-10 inline-block text-xs text-muted hover:text-ink">
                Work ↓
              </a>
            </div>
          </div>
          <Image
            src="/portrait-wide.png"
            alt={`Engraved portrait of ${site.name} in sunglasses, sipping through a straw`}
            width={1676}
            height={939}
            priority
            sizes="100vw"
            className="h-auto w-full lg:absolute lg:right-0 lg:bottom-0 lg:w-[min(100vw,calc((100svh-4rem)*1.785))] lg:max-w-none"
          />
        </section>

        <BookRail
          items={built.map((p) => ({
            slug: p.slug,
            title: p.title,
            // Status shown at discovery whenever the work isn't finished.
            note: p.status === "done" ? undefined : statusLabel[p.status],
            cover: <Cover project={p} caption={false} className="aspect-[5/3] rounded-[3px]" />,
          }))}
        />
      </main>
      <SiteFooter />
    </>
  );
}
