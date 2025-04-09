
import React, { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { TaskFormValues } from "../TaskFormTypes";

interface SubtasksSectionProps {
  control: Control<TaskFormValues>;
}

export const SubtasksSection = ({ control }: SubtasksSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const addSubtask = () => {
    append({
      id: crypto.randomUUID(),
      description: "",
      responsible: "",
      completed: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="text-base">Subtasks</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={addSubtask}
        >
          <Plus className="h-4 w-4" />
          Add Subtask
        </Button>
      </div>

      {fields.length > 0 ? (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 p-3 border rounded-md bg-slate-50">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium">Subtask {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="h-6 w-6 p-0 text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <FormField
                control={control}
                name={`subtasks.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Subtask description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`subtasks.${index}.responsible`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Responsible</FormLabel>
                    <FormControl>
                      <Input placeholder="Person responsible" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-sm text-gray-500 border border-dashed rounded-md">
          No subtasks added. Click the button above to add subtasks.
        </div>
      )}
    </div>
  );
};
