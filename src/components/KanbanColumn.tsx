
import React from "react";
import { Task } from "@/types/task";
import TaskCard from "@/components/TaskCard";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  moveTask: (taskId: string, newStatus: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  onTaskClick: (task: Task) => void;
}

const KanbanColumn = ({ 
  title, 
  tasks, 
  status, 
  moveTask, 
  onDragStart, 
  onDragOver, 
  onDrop,
  onTaskClick
}: KanbanColumnProps) => {
  // Sort tasks by priority if available (high first, then medium, then low, then no priority)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3, undefined: 4 };
    const aPriority = a.priority || "undefined";
    const bPriority = b.priority || "undefined";
    
    return (priorityOrder[aPriority as keyof typeof priorityOrder] || 4) - 
           (priorityOrder[bPriority as keyof typeof priorityOrder] || 4);
  });

  return (
    <div 
      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className="flex items-center mb-4">
        <h2 className="font-semibold text-harbor-700">{title}</h2>
        <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3 min-h-[300px]">
        {sortedTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            moveTask={moveTask}
            onDragStart={onDragStart}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
