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
        {/* First screen: name, short bio, engraved portrait. Nothing else. */}
        <section className="shell grid min-h-[calc(100svh-4.5rem)] items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-sm self-center pb-6 text-[15px] leading-relaxed">
            <h1 className="font-medium">{site.name}</h1>
            <p className="text-muted">
              {site.role}, {site.contact.location.split(",")[0]}
            </p>
            <p className="mt-6">{site.lede}</p>
            <a href="#work" className="mt-10 inline-block text-xs text-muted hover:text-ink">
              Work ↓
            </a>
          </div>
          <Image
            src="/portrait-engraved.png"
            alt={`Engraved portrait of ${site.name} in sunglasses, sipping through a straw`}
            width={939}
            height={1675}
            priority
            sizes="(min-width: 768px) 50vh, 70vw"
            className="mx-auto h-[62svh] w-auto md:h-[86svh]"
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
