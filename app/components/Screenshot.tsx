import Image from "next/image";

// A real app screenshot shown uncropped. The image links to the full-size file.
export function Screenshot({
  src,
  caption,
  width = 1330,
  height = 896,
  priority,
  sizes = "(min-width: 1040px) 1040px, 100vw",
  compact,
}: {
  src: string;
  caption: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
}) {
  return (
    <figure className="min-w-0">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-[4px] border border-line bg-surface transition-colors hover:border-accent"
      >
        <Image
          src={src}
          alt={caption}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
        <span className="sr-only"> (opens full-size image)</span>
      </a>
      <figcaption
        className={`mt-2 flex items-baseline justify-between gap-4 text-muted ${
          compact ? "text-[11px]" : "text-xs"
        } leading-relaxed`}
      >
        <span>{caption}</span>
        <span aria-hidden="true" className="shrink-0 font-mono text-[10px]">
          Full size ↗
        </span>
      </figcaption>
    </figure>
  );
}
