
import React, { useState } from "react";
import HarborNavbar from "@/components/HarborNavbar";
import HarborFooter from "@/components/HarborFooter";
import KanbanBoard from "@/components/KanbanBoard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import { Task } from "@/types/task";

const TaskOverview = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newlyCreatedTask, setNewlyCreatedTask] = useState<Omit<Task, "id"> | null>(null);
  
  const handleCreateTask = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleTaskCreated = (newTask: Omit<Task, "id">) => {
    // Pass the newly created task down to the KanbanBoard
    setNewlyCreatedTask(newTask);
    
    toast({
      title: "Task Created",
      description: `Task "${newTask.title}" has been created!`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HarborNavbar />
      <main className="flex-grow">
        <div className="section-container">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-harbor-500">Task Overview</h1>
            <Button 
              className="bg-harbor-500 hover:bg-harbor-600 gap-2"
              onClick={handleCreateTask}
            >
              <Plus className="h-5 w-5" />
              Create Task
            </Button>
          </div>
          <KanbanBoard newTask={newlyCreatedTask} />
        </div>
      </main>
      <HarborFooter />
      
      <CreateTaskDialog
        isOpen={isCreateDialogOpen}
        onClose={handleCloseDialog}
        onCreateTask={handleTaskCreated}
      />
    </div>
  );
};

export default TaskOverview;
