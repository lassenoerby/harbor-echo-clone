
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface TaskTypeSectionProps {
  taskType: string;
  setTaskType: (value: string) => void;
}

export const TaskTypeSection = ({ taskType, setTaskType }: TaskTypeSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Task Type</h3>
      <RadioGroup 
        value={taskType} 
        onValueChange={setTaskType}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="harbor" id="harbor" />
          <Label htmlFor="harbor" className="flex items-center gap-2 cursor-pointer">
            Harbor Task
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Harbor</Badge>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="boater" id="boater" />
          <Label htmlFor="boater" className="flex items-center gap-2 cursor-pointer">
            Boater Task
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Boater</Badge>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
