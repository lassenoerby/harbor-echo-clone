
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
}

const KanbanColumn = ({ 
  title, 
  tasks, 
  status, 
  moveTask, 
  onDragStart, 
  onDragOver, 
  onDrop 
}: KanbanColumnProps) => {
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
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            moveTask={moveTask}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
