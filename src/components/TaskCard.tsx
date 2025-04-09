
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Task } from "@/types/task";
import { ChevronLeft, ChevronRight, Move, User, Clock } from "lucide-react";

interface TaskCardProps {
  task: Task;
  moveTask: (taskId: string, newStatus: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

const TaskCard = ({ task, moveTask, onDragStart, onTaskClick }: TaskCardProps) => {
  // Define the next and previous statuses
  const statusOrder = ["new", "prioritized", "in-progress", "done"];
  const currentIndex = statusOrder.indexOf(task.status);
  const canMoveLeft = currentIndex > 0;
  const canMoveRight = currentIndex < statusOrder.length - 1;

  const handleMoveLeft = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (canMoveLeft) {
      moveTask(task.id, statusOrder[currentIndex - 1]);
    }
  };

  const handleMoveRight = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (canMoveRight) {
      moveTask(task.id, statusOrder[currentIndex + 1]);
    }
  };

  const handleCardClick = () => {
    onTaskClick(task);
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={handleCardClick}
    >
      <CardContent className="p-4 relative">
        <Move className="h-4 w-4 absolute right-2 top-2 text-gray-400" />
        <h3 className="font-medium text-harbor-800">{task.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        
        {/* Show additional task details if available */}
        {(task.assignedTo || task.estimatedTime) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            {task.assignedTo && (
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <User className="h-3 w-3 mr-1" />
                <span>{task.assignedTo}</span>
              </div>
            )}
            {task.estimatedTime && (
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>{task.estimatedTime}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <button 
          onClick={handleMoveLeft} 
          disabled={!canMoveLeft}
          className={`p-1 rounded hover:bg-gray-100 ${!canMoveLeft ? 'opacity-30 cursor-not-allowed' : ''}`}
          aria-label="Move to previous status"
        >
          <ChevronLeft className="h-4 w-4 text-harbor-600" />
        </button>
        <button 
          onClick={handleMoveRight} 
          disabled={!canMoveRight}
          className={`p-1 rounded hover:bg-gray-100 ${!canMoveRight ? 'opacity-30 cursor-not-allowed' : ''}`}
          aria-label="Move to next status"
        >
          <ChevronRight className="h-4 w-4 text-harbor-600" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
