
import React from "react";
import HarborNavbar from "@/components/HarborNavbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import HarborFooter from "@/components/HarborFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HarborNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <HarborFooter />
    </div>
  );
};

export default Index;
