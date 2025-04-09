
import React, { useState } from "react";
import HarborNavbar from "@/components/HarborNavbar";
import HarborFooter from "@/components/HarborFooter";
import KanbanBoard from "@/components/KanbanBoard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TaskOverview = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HarborNavbar />
      <main className="flex-grow">
        <div className="section-container">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-harbor-800">Task Overview</h1>
            <Button className="bg-harbor-600 hover:bg-harbor-700 gap-2">
              <Plus className="h-5 w-5" />
              Create Task
            </Button>
          </div>
          <KanbanBoard />
        </div>
      </main>
      <HarborFooter />
    </div>
  );
};

export default TaskOverview;
