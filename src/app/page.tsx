import { Navbar } from "@/components/vexora/navbar";
import { Hero } from "@/components/vexora/hero";
import { StatsStrip } from "@/components/vexora/stats-strip";
import { Features } from "@/components/vexora/features";
import { FpsSection } from "@/components/vexora/fps-section";
import { Plans } from "@/components/vexora/plans";
import { HowItWorks } from "@/components/vexora/how-it-works";
import { Testimonials } from "@/components/vexora/testimonials";
import { Faq } from "@/components/vexora/faq";
import { DownloadCta } from "@/components/vexora/download-cta";
import { Footer } from "@/components/vexora/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white antialiased">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsStrip />
        <Features />
        <FpsSection />
        <Plans />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <DownloadCta />
      </main>
      <Footer />
    </div>
  );
}
