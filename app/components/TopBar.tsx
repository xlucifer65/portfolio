import Link from "next/link";
import { site } from "@/content/site";
import { LinkRail, LinkRow } from "@/app/components/LinkIcons";

// Quiet header: name on inner pages. Links are icons — a fixed column on the left edge
// from `xl` up, a row here on smaller screens.
export function TopBar({ showName = true }: { showName?: boolean }) {
  return (
    <>
      <LinkRail />
      <header className="shell flex min-h-16 flex-wrap items-center gap-x-6 gap-y-1 py-3 text-xs">
        {showName && (
          <Link href="/" className="font-medium">
            {site.name}
          </Link>
        )}
        <LinkRow />
      </header>
    </>
  );
}
