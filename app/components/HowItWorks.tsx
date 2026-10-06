import { Chevron } from "@/app/components/Chevron";

type Step = { step: string; detail: string };

export function HowItWorks({
  steps,
  defaultOpen,
}: {
  steps: Step[];
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group mt-6 border-t border-line">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 py-3 text-sm">
        <Chevron />
        How it works
        <span className="eyebrow ml-auto">{steps.length} steps</span>
      </summary>
      <ol className="flex flex-col gap-4 pb-2">
        {steps.map((s, i) => (
          <li key={s.step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
            <span aria-hidden="true" className="font-mono text-[11px] leading-6 text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-sm font-medium">{s.step}</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}
