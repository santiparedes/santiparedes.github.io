import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DemosSection from "@/components/DemosSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ContactSection />
      <DemosSection />
      <div id="experience">
        <ExperienceSection />
      </div>
      <EducationSection />
      <SkillsSection />
      <AboutSection />
      <Footer />
    </main>
  );
};

export default Index;
