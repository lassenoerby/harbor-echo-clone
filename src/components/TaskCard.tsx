
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Task } from "@/types/task";
import { ChevronLeft, ChevronRight, Move, User, Clock, Calendar, Flag } from "lucide-react";
import { format } from "date-fns";

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

  // Priority badge color mapping
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format deadline date if it exists
  const formattedDeadline = task.deadline 
    ? new Date(task.deadline).toLocaleDateString() 
    : null;

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={handleCardClick}
    >
      <CardContent className="p-4 relative">
        <Move className="h-4 w-4 absolute right-2 top-2 text-gray-400" />
        
        {/* Priority badge if available */}
        {task.priority && (
          <div className={`text-xs inline-flex items-center px-2 py-0.5 rounded ${getPriorityColor(task.priority)} mb-2`}>
            <Flag className="h-3 w-3 mr-1" />
            <span className="capitalize">{task.priority}</span>
          </div>
        )}
        
        <h3 className="font-medium text-harbor-800">{task.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        
        {/* Show additional task details if available */}
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
          {formattedDeadline && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Due: {formattedDeadline}</span>
            </div>
          )}
        </div>
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
