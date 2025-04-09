
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Task } from "@/types/task";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TaskCardProps {
  task: Task;
  moveTask: (taskId: string, newStatus: string) => void;
}

const TaskCard = ({ task, moveTask }: TaskCardProps) => {
  // Define the next and previous statuses
  const statusOrder = ["new", "prioritized", "in-progress", "done"];
  const currentIndex = statusOrder.indexOf(task.status);
  const canMoveLeft = currentIndex > 0;
  const canMoveRight = currentIndex < statusOrder.length - 1;

  const handleMoveLeft = () => {
    if (canMoveLeft) {
      moveTask(task.id, statusOrder[currentIndex - 1]);
    }
  };

  const handleMoveRight = () => {
    if (canMoveRight) {
      moveTask(task.id, statusOrder[currentIndex + 1]);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h3 className="font-medium text-harbor-800">{task.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
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
