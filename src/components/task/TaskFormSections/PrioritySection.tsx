
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { Flag } from "lucide-react";
import { TaskFormValues } from "../TaskFormTypes";

interface PrioritySectionProps {
  control: Control<TaskFormValues>;
}

export const PrioritySection = ({ control }: PrioritySectionProps) => {
  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Priority
          </FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
