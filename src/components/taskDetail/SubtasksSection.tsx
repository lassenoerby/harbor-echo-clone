
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, ChevronDown, ChevronUp, Edit, Save } from "lucide-react";
import { Subtask } from "@/types/task";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SubtasksSectionProps {
  subtasks: Subtask[];
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>;
}

export const SubtasksSection = ({ subtasks, setSubtasks }: SubtasksSectionProps) => {
  const [openSubtasks, setOpenSubtasks] = useState<string[]>([]);
  const [editingSubtasks, setEditingSubtasks] = useState<string[]>([]);

  const addSubtask = () => {
    const newId = crypto.randomUUID();
    setSubtasks([
      ...subtasks,
      {
        id: newId,
        header: "",
        description: "",
        responsible: "",
        completed: false,
      },
    ]);
    // Auto-open new subtask for editing
    setOpenSubtasks([...openSubtasks, newId]);
    setEditingSubtasks([...editingSubtasks, newId]);
  };

  const removeSubtask = (index: number) => {
    const newSubtasks = [...subtasks];
    const removedId = newSubtasks[index].id;
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
    
    // Remove from open and editing states
    setOpenSubtasks(prev => prev.filter(id => id !== removedId));
    setEditingSubtasks(prev => prev.filter(id => id !== removedId));
  };

  const updateSubtask = (index: number, field: keyof Subtask, value: any) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = { ...newSubtasks[index], [field]: value };
    setSubtasks(newSubtasks);
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
            <Collapsible 
              key={subtask.id} 
              open={openSubtasks.includes(subtask.id)} 
              onOpenChange={() => toggleOpen(subtask.id)}
              className="border rounded-md bg-slate-50 overflow-hidden"
            >
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={(checked) => 
                      updateSubtask(index, "completed", checked === true)
                    }
                    id={`subtask-${subtask.id}`}
                  />
                  <div 
                    className={`font-medium ${subtask.completed ? "line-through text-gray-500" : ""}`}
                  >
                    {subtask.header || `Subtask ${index + 1}`}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!editingSubtasks.includes(subtask.id) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEdit(subtask.id);
                        if (!openSubtasks.includes(subtask.id)) {
                          toggleOpen(subtask.id);
                        }
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {editingSubtasks.includes(subtask.id) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEdit(subtask.id);
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
                      removeSubtask(index);
                    }}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      {openSubtasks.includes(subtask.id) ? (
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
                  <div>
                    <Label className="text-xs">Header</Label>
                    <Input
                      value={subtask.header || ""}
                      onChange={(e) => updateSubtask(index, "header", e.target.value)}
                      placeholder="Subtask header"
                      className="mt-1"
                      disabled={!editingSubtasks.includes(subtask.id)}
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Description</Label>
                    <Input
                      value={subtask.description || ""}
                      onChange={(e) => updateSubtask(index, "description", e.target.value)}
                      placeholder="Subtask description"
                      className="mt-1"
                      disabled={!editingSubtasks.includes(subtask.id)}
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Responsible</Label>
                    <Input
                      value={subtask.responsible || ""}
                      onChange={(e) => updateSubtask(index, "responsible", e.target.value)}
                      placeholder="Person responsible"
                      className="mt-1"
                      disabled={!editingSubtasks.includes(subtask.id)}
                    />
                  </div>
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
