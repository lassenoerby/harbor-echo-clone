
import React, { useState, useEffect } from "react";
import KanbanColumn from "@/components/KanbanColumn";
import TaskDetailDialog from "@/components/TaskDetailDialog";
import { Task } from "@/types/task";
import { useToast } from "@/hooks/use-toast";

// This will be exposed via props in a future implementation
const addTask = (tasks: Task[], newTask: Omit<Task, "id">): Task[] => {
  // Generate a simple ID (in a real app, this would come from the backend)
  const newId = (tasks.length + 1).toString();
  
  return [
    ...tasks,
    {
      id: newId,
      ...newTask
    }
  ];
};

interface KanbanBoardProps {
  onAddTask?: (task: Omit<Task, "id">) => void;
}

const KanbanBoard = ({ onAddTask }: KanbanBoardProps = {}) => {
  const { toast } = useToast();
  // Initial sample data for the kanban board
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Clean dock area", description: "Remove debris from dock B", status: "new", assignedTo: "John Doe", estimatedTime: "2 hours", taskType: "harbor" },
    { id: "2", title: "Repair boat lift", description: "Hydraulic system needs maintenance", status: "prioritized", assignedTo: "Sarah Miller", estimatedTime: "1 day", taskType: "harbor" },
    { id: "3", title: "Check moorings", description: "Inspect all moorings in section C", status: "in-progress", assignedTo: "Mike Johnson", taskType: "harbor" },
    { id: "4", title: "Update harbor map", description: "Add new berths to digital map", status: "in-progress", estimatedTime: "4 hours", taskType: "harbor" },
    { id: "5", title: "Refuel boat", description: "Fill tank before weekend trip", status: "done", assignedTo: "Emily Chen", estimatedTime: "30 minutes", taskType: "boater" },
    { id: "6", title: "Check life jackets", description: "Ensure all life jackets are onboard", status: "new", taskType: "boater" },
    { id: "7", title: "Clean boat hull", description: "Remove barnacles and algae", status: "prioritized", estimatedTime: "3 hours", taskType: "boater" },
    { id: "8", title: "Replace dock cleat", description: "Dock A, position 5 needs new cleat", status: "done", assignedTo: "James Wilson", estimatedTime: "1 hour", taskType: "harbor" },
  ]);

  // State for task detail dialog
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);

  // Listen for new tasks from parent component
  useEffect(() => {
    if (onAddTask) {
      // Implementation would be here if we were getting tasks from a parent
    }
  }, [onAddTask]);

  // Function to move tasks between columns
  const moveTask = (taskId: string, newStatus: string) => {
    setTasks(
      tasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    
    // Show toast notification
    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus.replace('-', ' ')}.`,
    });
  };

  // Handle drag start event
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    moveTask(taskId, status);
  };

  // Add a new task
  const handleAddTask = (newTask: Omit<Task, "id">) => {
    setTasks(prevTasks => addTask(prevTasks, newTask));
  };

  // Handle task click
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  // Handle task update
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    
    toast({
      title: "Task Updated",
      description: `Task "${updatedTask.title}" has been updated.`,
    });
  };

  // Close task detail dialog
  const handleCloseTaskDetail = () => {
    setIsTaskDetailOpen(false);
    setSelectedTask(null);
  };

  // Expose the add task method to the parent component (if needed)
  useEffect(() => {
    if (window) {
      // This is a hack for demo purposes - in a real app we'd use context or props
      (window as any).addHarborTask = handleAddTask;
    }
  }, []);

  // Group tasks by status
  const columns = {
    new: tasks.filter(task => task.status === "new"),
    prioritized: tasks.filter(task => task.status === "prioritized"),
    "in-progress": tasks.filter(task => task.status === "in-progress"),
    done: tasks.filter(task => task.status === "done"),
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KanbanColumn 
          title="New Tasks" 
          tasks={columns.new} 
          status="new"
          moveTask={moveTask}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onTaskClick={handleTaskClick}
        />
        <KanbanColumn 
          title="Prioritized" 
          tasks={columns.prioritized} 
          status="prioritized"
          moveTask={moveTask}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onTaskClick={handleTaskClick}
        />
        <KanbanColumn 
          title="In Progress" 
          tasks={columns["in-progress"]} 
          status="in-progress"
          moveTask={moveTask}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onTaskClick={handleTaskClick}
        />
        <KanbanColumn 
          title="Done" 
          tasks={columns.done} 
          status="done"
          moveTask={moveTask}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onTaskClick={handleTaskClick}
        />
      </div>

      {selectedTask && (
        <TaskDetailDialog
          isOpen={isTaskDetailOpen}
          onClose={handleCloseTaskDetail}
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </>
  );
};

export default KanbanBoard;
