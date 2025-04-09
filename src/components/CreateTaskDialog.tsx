
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/task";
import PredefinedTaskSelector, { predefinedTasks } from "@/components/task/PredefinedTaskSelector";
import TaskForm from "@/components/task/TaskForm";
import { TaskFormValues } from "@/components/task/TaskFormTypes";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<Task, "id">) => void;
}

const CreateTaskDialog = ({ isOpen, onClose, onCreateTask }: CreateTaskDialogProps) => {
  const { toast } = useToast();
  const [selectedPredefined, setSelectedPredefined] = useState<string | null>(null);
  
  const form = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      estimatedTime: "",
      priority: "none",
      taskType: "harbor",
      subtasks: [],
      price: undefined,
    },
  });

  const handlePredefinedTaskSelect = (task: typeof predefinedTasks[0]) => {
    form.setValue("title", task.title);
    form.setValue("description", task.description);
    setSelectedPredefined(task.title);
  };

  const handleCustomTask = () => {
    form.reset();
    setSelectedPredefined(null);
  };

  const handleSubmit = (values: TaskFormValues) => {
    onCreateTask({
      title: values.title,
      description: values.description,
      status: "new",
      assignedTo: values.assignedTo || undefined,
      estimatedTime: values.estimatedTime || undefined,
      imageUrl: values.imageUrl,
      priority: values.priority === "none" ? undefined : values.priority || undefined,
      deadline: values.deadline ? values.deadline.toISOString() : undefined,
      taskType: values.taskType || undefined,
      subtasks: values.subtasks.length > 0 ? values.subtasks : undefined,
      price: values.price,
      invoiceSent: false,
    });
    
    toast({
      title: "Task Created",
      description: `Task "${values.title}" has been created successfully!`,
    });
    
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold text-harbor-800">Create New Task</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-grow overflow-auto px-6 pb-4">
            <PredefinedTaskSelector
              selectedPredefined={selectedPredefined}
              onSelectPredefined={handlePredefinedTaskSelect}
              onCustomTask={handleCustomTask}
            />
            
            <TaskForm 
              form={form}
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
