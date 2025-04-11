
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/task";

const CtaSection = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateTask = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleTaskCreated = (newTask: Omit<Task, "id">) => {
    // Add the task to the KanbanBoard
    if (window && (window as any).addHarborTask) {
      (window as any).addHarborTask(newTask);
    }
    
    toast({
      title: "Task Created",
      description: `Task "${newTask.title}" has been created!`,
    });
  };

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
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-harbor-600/50 gap-2"
              onClick={handleCreateTask}
            >
              <Plus className="h-5 w-5" />
              Create Task
            </Button>
          </div>
        </div>
      </div>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        isOpen={isCreateDialogOpen}
        onClose={handleCloseDialog}
        onCreateTask={handleTaskCreated}
      />
    </section>
  );
};

export default CtaSection;
