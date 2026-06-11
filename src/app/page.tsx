import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <StorySection />
      </main>
      <SiteFooter />
    </>
  );
}
