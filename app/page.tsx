import { Nav } from "@/app/components/Nav";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { SelectedWork } from "@/app/components/SelectedWork";
import { SiteFooter } from "@/app/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <SelectedWork />
      </main>
      <SiteFooter />
    </>
  );
}
