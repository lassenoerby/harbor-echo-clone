
import React from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, ChartBar, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-harbor-50 to-white overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col items-center justify-center text-center py-12 md:py-24">
          <div className="space-y-8 max-w-xl mx-auto">
            <h1 className="heading-primary animate-fade-in [animation-delay:200ms]">
              Marina Management Platform
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:400ms]">
              <Button 
                size="lg" 
                className="bg-harbor-600 hover:bg-harbor-700 gap-2"
                asChild
              >
                <Link to="/task-overview">
                  <Clipboard className="h-5 w-5" />
                  Open Task Overview
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-harbor-600 text-harbor-600 gap-2"
                asChild
              >
                <Link to="/dashboard">
                  <ChartBar className="h-5 w-5" />
                  View Dashboard
                </Link>
              </Button>
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
