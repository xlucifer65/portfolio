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
    <details
      open={defaultOpen}
      className="group mt-4 border-t border-line pt-4"
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium">
        <Chevron />
        How it works
      </summary>
      <ol className="mt-4 flex flex-col gap-4 border-t border-line pt-4 sm:pl-4">
        {steps.map((s, i) => (
          <li key={s.step} className="flex gap-4">
            <span className="font-display text-sm text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-sm font-medium">{s.step}</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                {s.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}
