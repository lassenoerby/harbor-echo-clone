
import React, { useState } from "react";
import KanbanColumn from "@/components/KanbanColumn";
import { Task } from "@/types/task";

const KanbanBoard = () => {
  // Initial sample data for the kanban board
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Clean dock area", description: "Remove debris from dock B", status: "new" },
    { id: "2", title: "Repair boat lift", description: "Hydraulic system needs maintenance", status: "prioritized" },
    { id: "3", title: "Check moorings", description: "Inspect all moorings in section C", status: "in-progress" },
    { id: "4", title: "Update harbor map", description: "Add new berths to digital map", status: "in-progress" },
    { id: "5", title: "Refuel maintenance boat", description: "Fill tank before weekend inspection", status: "done" },
    { id: "6", title: "Inspect life jackets", description: "Annual safety equipment inspection", status: "new" },
    { id: "7", title: "Paint dock markings", description: "Refresh safety lines on main dock", status: "prioritized" },
    { id: "8", title: "Replace broken cleat", description: "Dock A, position 5 needs new cleat", status: "done" },
  ]);

  // Function to move tasks between columns
  const moveTask = (taskId: string, newStatus: string) => {
    setTasks(
      tasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
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

  // Group tasks by status
  const columns = {
    new: tasks.filter(task => task.status === "new"),
    prioritized: tasks.filter(task => task.status === "prioritized"),
    "in-progress": tasks.filter(task => task.status === "in-progress"),
    done: tasks.filter(task => task.status === "done"),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KanbanColumn 
        title="New Tasks" 
        tasks={columns.new} 
        status="new"
        moveTask={moveTask}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
      />
      <KanbanColumn 
        title="Prioritized" 
        tasks={columns.prioritized} 
        status="prioritized"
        moveTask={moveTask}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
      />
      <KanbanColumn 
        title="In Progress" 
        tasks={columns["in-progress"]} 
        status="in-progress"
        moveTask={moveTask}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
      />
      <KanbanColumn 
        title="Done" 
        tasks={columns.done} 
        status="done"
        moveTask={moveTask}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
      />
    </div>
  );
};

export default KanbanBoard;
