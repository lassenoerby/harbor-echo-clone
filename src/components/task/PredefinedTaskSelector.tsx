
import React from "react";
import { Button } from "@/components/ui/button";

interface PredefinedTask {
  title: string;
  description: string;
}

export const predefinedTasks: PredefinedTask[] = [
  { 
    title: "Clean boat",
    description: "Thoroughly clean the exterior and interior of the boat"
  },
  { 
    title: "Paint buoy",
    description: "Apply fresh paint to navigation buoys"
  },
  { 
    title: "Sand deck",
    description: "Sand and prepare wooden deck for refinishing"
  }
];

interface PredefinedTaskSelectorProps {
  selectedPredefined: string | null;
  onSelectPredefined: (task: PredefinedTask) => void;
  onCustomTask: () => void;
}

const PredefinedTaskSelector = ({
  selectedPredefined,
  onSelectPredefined,
  onCustomTask
}: PredefinedTaskSelectorProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 my-4">
      <h3 className="text-sm font-medium text-gray-700">Choose a predefined task or create custom</h3>
      <div className="grid grid-cols-3 gap-3">
        {predefinedTasks.map((task) => (
          <Button
            key={task.title}
            type="button"
            variant={selectedPredefined === task.title ? "default" : "outline"}
            className={`h-auto py-3 px-4 ${selectedPredefined === task.title ? 'bg-harbor-600' : ''}`}
            onClick={() => onSelectPredefined(task)}
          >
            {task.title}
          </Button>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <Button 
          type="button" 
          variant="ghost" 
          className="text-harbor-600 hover:text-harbor-700"
          onClick={onCustomTask}
        >
          Create Custom Task
        </Button>
      </div>
    </div>
  );
};

export default PredefinedTaskSelector;
