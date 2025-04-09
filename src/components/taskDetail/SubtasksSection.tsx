
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Subtask } from "@/types/task";

interface SubtasksSectionProps {
  subtasks: Subtask[];
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>;
}

export const SubtasksSection = ({ subtasks, setSubtasks }: SubtasksSectionProps) => {
  const addSubtask = () => {
    setSubtasks([
      ...subtasks,
      {
        id: crypto.randomUUID(),
        header: "",
        description: "",
        responsible: "",
        completed: false,
      },
    ]);
  };

  const removeSubtask = (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const updateSubtask = (index: number, field: keyof Subtask, value: any) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = { ...newSubtasks[index], [field]: value };
    setSubtasks(newSubtasks);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Subtasks</Label>
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

      {subtasks.length > 0 ? (
        <div className="space-y-4">
          {subtasks.map((subtask, index) => (
            <div key={subtask.id} className="grid gap-3 p-3 border rounded-md bg-slate-50">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={(checked) => 
                      updateSubtask(index, "completed", checked === true)
                    }
                    id={`subtask-${subtask.id}`}
                  />
                  <Label 
                    htmlFor={`subtask-${subtask.id}`}
                    className={`text-sm font-medium ${subtask.completed ? "line-through text-gray-500" : ""}`}
                  >
                    Subtask {index + 1}
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSubtask(index)}
                  className="h-6 w-6 p-0 text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Label className="text-xs">Header</Label>
                <Input
                  value={subtask.header || ""}
                  onChange={(e) => updateSubtask(index, "header", e.target.value)}
                  placeholder="Subtask header"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Description</Label>
                <Input
                  value={subtask.description}
                  onChange={(e) => updateSubtask(index, "description", e.target.value)}
                  placeholder="Subtask description"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Responsible</Label>
                <Input
                  value={subtask.responsible || ""}
                  onChange={(e) => updateSubtask(index, "responsible", e.target.value)}
                  placeholder="Person responsible"
                  className="mt-1"
                />
              </div>
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
