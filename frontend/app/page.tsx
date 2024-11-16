import CTA from "@/components/cta";
import Hero from "@/components/hero";
import Nav from "@/components/nav";
import DynamicProvider from "@/providers/dynamic-provider";

export default function Home() {
  return (
    <DynamicProvider>
      <Nav />
      <main className="min-h-screen w-full bg-zinc-950 text-frost-100 overflow-hidden font-sans pt-16 px-4">
        <Hero />
        <CTA />
      </main>
    </DynamicProvider>
  );
}
