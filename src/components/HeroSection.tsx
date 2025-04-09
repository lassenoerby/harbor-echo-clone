
import React from "react";
import { Button } from "@/components/ui/button";
import { Anchor, Map, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-harbor-50 to-white overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
              <h1 className="heading-primary animate-fade-in [animation-delay:200ms]">
                Smart Marina Management Made Simple
              </h1>
              <p className="text-xl text-gray-600 animate-fade-in [animation-delay:400ms]">
                Your complete platform for digitizing marina operations, 
                increasing occupancy, and delighting boaters with seamless experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in [animation-delay:600ms]">
                <Button size="lg" className="bg-harbor-600 hover:bg-harbor-700">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="border-harbor-600 text-harbor-600">
                  Book a Demo
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 pt-6 animate-fade-in [animation-delay:800ms]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-harbor-600 h-5 w-5" />
                  <span className="text-sm text-gray-600">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Map className="text-harbor-600 h-5 w-5" />
                  <span className="text-sm text-gray-600">500+ Marinas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Anchor className="text-harbor-600 h-5 w-5" />
                  <span className="text-sm text-gray-600">10,000+ Boaters</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in [animation-delay:600ms]">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-xl bg-harbor-600 p-1">
                <div className="rounded-lg overflow-hidden bg-white">
                  <div className="bg-harbor-500 h-10 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                    </div>
                  </div>
                  <div className="h-64 p-4 bg-harbor-50">
                    <div className="h-full rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <p className="text-gray-500 text-center px-4">
                        Marina dashboard visualization
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-harbor-100 rounded-full z-[-1]"></div>
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-harbor-200 rounded-full z-[-1]"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-harbor-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 blur-3xl z-[-1]"></div>
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-harbor-200 rounded-full opacity-20 blur-2xl z-[-1]"></div>
    </div>
  );
};

export default HeroSection;
