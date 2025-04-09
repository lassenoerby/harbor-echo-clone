
import React from "react";
import HarborNavbar from "@/components/HarborNavbar";
import HeroSection from "@/components/HeroSection";
import CtaSection from "@/components/CtaSection";
import HarborFooter from "@/components/HarborFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HarborNavbar />
      <main>
        <HeroSection />
        <CtaSection />
      </main>
      <HarborFooter />
    </div>
  );
};

export default Index;
