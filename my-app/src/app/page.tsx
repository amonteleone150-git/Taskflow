import { Hero } from "@/components/home-hero";
import { Features } from "@/components/home-features";
import { CTA } from "@/components/home-cta";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center py-16 px-4">
      <main className="w-full max-w-3xl space-y-12">
        <Hero />
        <Features />
        <CTA />
      </main>
    </div>
  );
}