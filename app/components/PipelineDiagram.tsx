type Flow = {
  stages: string[];
  branch?: string[];
  caption?: string;
};

// Layout follows the diagram's own width (container query), not the viewport:
// - narrow: a vertical list with ↓ between stages
// - wide, up to 4 stages: one row with → between stages
// - wide, 5+ stages: a numbered grid of three per row (numbers carry the order),
//   so long labels never get squeezed into word fragments.
export function PipelineDiagram({ stages, branch, caption }: Flow) {
  const row = stages.length <= 4;

  return (
    <figure className="@container my-6 min-w-0">
      <ol
        aria-label="Architecture stages"
        className={`flex flex-col ${
          row ? "@2xl:flex-row @2xl:items-stretch" : "@2xl:grid @2xl:grid-cols-3 @2xl:gap-3"
        }`}
      >
        {stages.map((stage, index) => (
          <li
            key={`${index}-${stage}`}
            className={`flex min-w-0 flex-col ${row ? "@2xl:flex-1 @2xl:flex-row" : ""}`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[3px] border border-line bg-surface px-3 py-3">
              <span aria-hidden="true" className="shrink-0 font-mono text-[10px] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xs leading-relaxed [overflow-wrap:break-word]">{stage}</span>
            </div>
            {index < stages.length - 1 && (
              <span
                aria-hidden="true"
                className={`flex justify-center px-2 py-1 text-muted ${
                  row ? "@2xl:items-center" : "@2xl:hidden"
                }`}
              >
                <span className={row ? "@2xl:hidden" : ""}>↓</span>
                {row && <span className="hidden @2xl:inline">→</span>}
              </span>
            )}
          </li>
        ))}
      </ol>
      {branch && (
        <ul aria-label="Possible outcomes" className="mt-3 flex flex-wrap gap-3 border-l-2 border-accent pl-4">
          {branch.map((outcome, index) => (
            <li key={`${index}-${outcome}`} className="text-xs leading-relaxed text-muted">
              {outcome}
            </li>
          ))}
        </ul>
      )}
      {caption && (
        <figcaption className="mt-4 max-w-3xl text-xs leading-relaxed text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
