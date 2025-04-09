
import React from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="bg-harbor-600 py-16">
      <div className="section-container">
        <div className="bg-harbor-700 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-harbor-700 hover:bg-harbor-50 gap-2" asChild>
              <Link to="/task-overview">
                <Clipboard className="h-5 w-5" />
                Open Task Overview
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-harbor-600/50 gap-2">
              <Plus className="h-5 w-5" />
              Create Task
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
