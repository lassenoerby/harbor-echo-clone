
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Control } from "react-hook-form";
import { TaskFormValues } from "../TaskFormTypes";

interface TaskTypeSectionProps {
  control: Control<TaskFormValues>;
}

export const TaskTypeSection = ({ control }: TaskTypeSectionProps) => {
  return (
    <FormField
      control={control}
      name="taskType"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Task Type</FormLabel>
          <FormControl>
            <RadioGroup 
              onValueChange={field.onChange} 
              defaultValue={field.value} 
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="harbor" id="create-harbor" />
                <Label htmlFor="create-harbor" className="flex items-center gap-2 cursor-pointer">
                  Harbor Task
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Harbor</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="boater" id="create-boater" />
                <Label htmlFor="create-boater" className="flex items-center gap-2 cursor-pointer">
                  Boater Task
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Boater</Badge>
                </Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
