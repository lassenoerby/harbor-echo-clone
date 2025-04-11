
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/task";

const HarborNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/task-overview" className="flex items-center">
              <img 
                src="/lovable-uploads/a3ae2dde-f517-47b4-8860-c7a934c82ce7.png" 
                alt="Harba Logo" 
                className="h-10 mr-2" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/task-overview" 
              className={`${location.pathname === '/task-overview' ? 'text-harbor-500 font-medium' : 'text-gray-600'} hover:text-harbor-500 transition-colors`}
            >
              Task Overview
            </Link>
            <Link 
              to="/dashboard" 
              className={`${location.pathname === '/dashboard' ? 'text-harbor-500 font-medium' : 'text-gray-600'} hover:text-harbor-500 transition-colors`}
            >
              Dashboard
            </Link>
            <Button 
              className="bg-harbor-500 hover:bg-harbor-600 gap-2"
              onClick={handleCreateTask}
            >
              <Plus className="h-5 w-5" />
              Create Task
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/task-overview"
                className={`${location.pathname === '/task-overview' ? 'text-harbor-500 font-medium' : 'text-gray-600'} hover:text-harbor-500 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Task Overview
              </Link>
              <Link
                to="/dashboard"
                className={`${location.pathname === '/dashboard' ? 'text-harbor-500 font-medium' : 'text-gray-600'} hover:text-harbor-500 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Button 
                className="bg-harbor-500 hover:bg-harbor-600 w-full gap-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleCreateTask();
                }}
              >
                <Plus className="h-5 w-5" />
                Create Task
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        isOpen={isCreateDialogOpen}
        onClose={handleCloseDialog}
        onCreateTask={handleTaskCreated}
      />
    </nav>
  );
};

export default HarborNavbar;
