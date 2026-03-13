import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import CursorDot from "@/components/CursorDot";

import ThemeWrapper from "@/components/ThemeWrapper";

export default function Home() {
  return (
    <ThemeWrapper>
      <CursorDot />
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <ExperimentsSection />
        <AboutSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </ThemeWrapper>
  );
}
