import { statusLabel, type ProjectStatus } from "@/content/projects";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const marker = status === "done"
    ? "bg-accent"
    : status === "in-progress"
      ? "border border-accent"
      : "border border-muted rounded-full";

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] leading-relaxed text-muted">
      <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 ${marker}`} />
      {statusLabel[status]}
    </span>
  );
}
