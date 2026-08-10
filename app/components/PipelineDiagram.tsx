type Flow = {
  stages: string[];
  branch?: string[];
  caption?: string;
};

function Arrow() {
  return (
    <div className="flex shrink-0 rotate-90 items-center justify-center px-1 text-muted sm:rotate-0 sm:px-2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2 8h11M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function PipelineDiagram({ stages, branch, caption }: Flow) {
  return (
    <div className="my-6">
      <div className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
        {stages.map((stage, i) => (
          <div className="flex items-center sm:contents" key={stage}>
            <div className="flex min-w-0 flex-1 items-center justify-center rounded-[3px] border border-line px-3 py-2.5 text-center text-xs leading-snug sm:text-[13px]">
              {stage}
            </div>
            {i < stages.length - 1 && <Arrow />}
          </div>
        ))}
      </div>

      {branch && (
        <div className="mt-2 flex items-center gap-2 pl-0 sm:pl-6">
          <Arrow />
          <div className="flex flex-wrap items-center gap-2">
            {branch.map((b, i) => (
              <span key={b} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-xs italic text-muted">or</span>
                )}
                <span className="rounded-[3px] border border-line px-3 py-1.5 text-xs">
                  {b}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {caption && (
        <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted">
          {caption}
        </p>
      )}
    </div>
  );
}
