
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { ListTodo } from "lucide-react";
import { TaskFormValues } from "../TaskFormTypes";

interface BasicInfoSectionProps {
  control: Control<TaskFormValues>;
}

export const BasicInfoSection = ({ control }: BasicInfoSectionProps) => {
  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              Task Title
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter task title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Textarea className="h-4 w-4" />
              Description
            </FormLabel>
            <FormControl>
              <Textarea placeholder="Enter task description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
