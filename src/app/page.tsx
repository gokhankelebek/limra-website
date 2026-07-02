import IntroProvider from "@/components/IntroContext";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import MenuPreview from "@/components/MenuPreview";
import VisitStrip from "@/components/VisitStrip";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <IntroProvider>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <StorySection />
        <MenuPreview />
        <VisitStrip />
      </main>
      <SiteFooter />
    </IntroProvider>
  );
}
