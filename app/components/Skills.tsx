import { skillGroups } from "@/content/skills";

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl border-t border-line px-6 py-16 sm:px-8 sm:py-24"
    >
      <p className="mb-10 text-xs uppercase tracking-[0.1em] text-muted">
        Skills
      </p>
      <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="font-display text-lg font-medium">
              {group.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-[3px] border border-line px-2.5 py-1 text-xs text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
