"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Item = { slug: string; title: string; note?: string; cover: ReactNode };

// Base layout (server render, no JS, phones, reduced motion): a native horizontal scroller with
// snap points, so every cover is reachable by swipe, trackpad, scrollbar or Tab.
// Enhancement (JS + desktop + motion allowed): the section pins and vertical scroll moves the row.
const DESKTOP = "(min-width: 768px)";
const REDUCE = "(prefers-reduced-motion: reduce)";

const canPin = () =>
  window.matchMedia(DESKTOP).matches && !window.matchMedia(REDUCE).matches;

// Distance the row must move so the last cover ends where the first one starts (centred).
// Measured from the cards, because the track's right padding isn't counted in scrollWidth.
function railTravel(track: HTMLElement) {
  const first = track.firstElementChild as HTMLElement | null;
  const last = track.lastElementChild as HTMLElement | null;
  return first && last ? Math.max(0, last.offsetLeft - first.offsetLeft) : 0;
}

export function BookRail({ items }: { items: Item[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const n = items.length;

  // Decide whether to enhance, and re-decide when the window size or motion preference changes.
  useEffect(() => {
    const decide = () => setPinned(canPin());
    decide();
    const queries = [window.matchMedia(DESKTOP), window.matchMedia(REDUCE)];
    queries.forEach((q) => q.addEventListener("change", decide));
    window.addEventListener("resize", decide);
    return () => {
      queries.forEach((q) => q.removeEventListener("change", decide));
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const update = () => {
      if (!pinned) {
        const p = track.scrollLeft / Math.max(1, track.scrollWidth - track.clientWidth);
        setActive(Math.round(p * (n - 1)));
        return;
      }
      const max = railTravel(track);
      section.style.height = `${max + window.innerHeight}px`;
      const p = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(1, max)));
      track.style.transform = `translate3d(${-p * max}px, 0, 0)`;
      setActive(Math.round(p * (n - 1)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      track.removeEventListener("scroll", update);
      section.style.height = "";
      track.style.transform = "";
    };
  }, [pinned, n]);

  // Bring cover i into view: page scroll when pinned, otherwise scroll the row itself.
  const goTo = (i: number) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!section || !track || !card) return;
    if (pinned) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (n > 1 ? (i / (n - 1)) * railTravel(track) : 0) });
    } else {
      track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2 });
    }
  };

  return (
    <section id="work" ref={sectionRef} aria-label="Projects" className="relative scroll-mt-4">
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "flex flex-col justify-center py-12 md:py-20"
        }
      >
        <div className="mb-6 flex items-center justify-center" role="group" aria-label="Choose a project">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${item.title}`}
              aria-current={i === active ? "true" : undefined}
              className="group flex h-11 min-w-6 items-center justify-center px-1"
            >
              <span
                aria-hidden="true"
                className={
                  i === active
                    ? "block h-3.5 w-7 border border-ink/60"
                    : "block h-3.5 w-px bg-ink/30 group-hover:bg-ink/70"
                }
              />
            </button>
          ))}
        </div>

        <div
          ref={trackRef}
          className={`flex gap-5 px-6 pb-3 md:gap-8 md:px-[calc((100vw-min(62vw,860px))/2)] ${
            pinned ? "overflow-visible will-change-transform" : "snap-x snap-mandatory overflow-x-auto"
          }`}
        >
          {items.map((item, i) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              aria-label={item.note ? `${item.title} (${item.note})` : item.title}
              onFocus={pinned ? () => goTo(i) : undefined}
              className="group w-[82vw] shrink-0 snap-center md:w-[min(62vw,860px)]"
            >
              <p className="mb-2 text-xs text-muted transition-colors group-hover:text-ink" aria-hidden="true">
                {item.title}
                {item.note && <span className="text-faint"> · {item.note}</span>}
              </p>
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                {item.cover}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
