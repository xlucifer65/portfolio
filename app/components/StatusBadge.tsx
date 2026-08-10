import { statusLabel, type ProjectStatus } from "@/content/projects";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span
        className={
          "inline-block h-1.5 w-1.5 rounded-full " +
          (status === "in-progress" ? "bg-ink" : "border border-muted")
        }
      />
      {statusLabel[status]}
    </span>
  );
}
