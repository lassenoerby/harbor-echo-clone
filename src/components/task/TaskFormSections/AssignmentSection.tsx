
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { User, Clock } from "lucide-react";
import { TaskFormValues } from "../TaskFormTypes";

interface AssignmentSectionProps {
  control: Control<TaskFormValues>;
}

export const AssignmentSection = ({ control }: AssignmentSectionProps) => {
  return (
    <>
      <FormField
        control={control}
        name="assignedTo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Assigned Personnel
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter assigned personnel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="estimatedTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Estimated Time of Completion
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., 2 hours, 3 days" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
