
import React from "react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="bg-harbor-600 py-16">
      <div className="section-container">
        <div className="bg-harbor-700 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your marina operations?
          </h2>
          <p className="text-harbor-100 text-lg max-w-2xl mx-auto mb-8">
            Join hundreds of marinas already using our platform to increase occupancy, 
            streamline operations, and delight boaters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-harbor-700 hover:bg-harbor-50">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-harbor-600/50">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
