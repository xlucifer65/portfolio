import type { Metadata } from "next";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: `${site.name} — ${site.role}`,
  description: site.lede,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.lede,
    images: [{ url: "/og-editorial.png", width: 1200, height: 630,
      alt: "Abstract pipeline passing through an evaluation gate" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-editorial.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-screen flex-col bg-bg font-sans text-ink">
        <a href="#main-content" className="fixed left-4 top-4 z-50 -translate-y-32 rounded-[3px] bg-ink px-4 py-3 text-sm text-bg focus:translate-y-0">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
