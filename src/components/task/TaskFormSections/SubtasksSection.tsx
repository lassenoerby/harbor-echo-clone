
import React, { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ChevronDown, ChevronUp, Edit, Save } from "lucide-react";
import { TaskFormValues } from "../TaskFormTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SubtasksSectionProps {
  control: Control<TaskFormValues>;
}

export const SubtasksSection = ({ control }: SubtasksSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  
  const [openSubtasks, setOpenSubtasks] = useState<string[]>([]);
  const [editingSubtasks, setEditingSubtasks] = useState<string[]>([]);

  const addSubtask = () => {
    const newId = crypto.randomUUID();
    append({
      id: newId,
      header: "",
      description: "",
      responsible: "",
      completed: false,
    });
    // Auto-open new subtask for editing
    setOpenSubtasks([...openSubtasks, newId]);
    setEditingSubtasks([...editingSubtasks, newId]);
  };
  
  const toggleOpen = (id: string) => {
    setOpenSubtasks(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  const toggleEdit = (id: string) => {
    setEditingSubtasks(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
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
            <Collapsible 
              key={field.id} 
              open={openSubtasks.includes(field.id)} 
              onOpenChange={() => toggleOpen(field.id)}
              className="border rounded-md bg-slate-50 overflow-hidden"
            >
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FormField
                    control={control}
                    name={`subtasks.${index}.completed`}
                    render={({ field: checkboxField }) => (
                      <Checkbox
                        checked={checkboxField.value}
                        onCheckedChange={checkboxField.onChange}
                      />
                    )}
                  />
                  <FormField
                    control={control}
                    name={`subtasks.${index}.header`}
                    render={({ field: headerField }) => (
                      <div className={`font-medium ${checkboxField.value ? "line-through text-gray-500" : ""}`}>
                        {headerField.value || `Subtask ${index + 1}`}
                      </div>
                    )}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  {!editingSubtasks.includes(field.id) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEdit(field.id);
                        if (!openSubtasks.includes(field.id)) {
                          toggleOpen(field.id);
                        }
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {editingSubtasks.includes(field.id) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEdit(field.id);
                      }}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                    }}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      {openSubtasks.includes(field.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              
              <CollapsibleContent>
                <div className="p-3 pt-0 space-y-3">
                  <FormField
                    control={control}
                    name={`subtasks.${index}.header`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Header</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Subtask header" 
                            {...field} 
                            disabled={!editingSubtasks.includes(field.id)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`subtasks.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Description</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Subtask description" 
                            {...field} 
                            disabled={!editingSubtasks.includes(field.id)}
                          />
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
                          <Input 
                            placeholder="Person responsible" 
                            {...field} 
                            disabled={!editingSubtasks.includes(field.id)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
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
