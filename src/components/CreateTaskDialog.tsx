
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileUp, User, Clock, ListTodo, Flag, CalendarIcon } from "lucide-react";
import { Task } from "@/types/task";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<Task, "id">) => void;
}

type TaskFormValues = {
  title: string;
  description: string;
  assignedTo: string;
  estimatedTime: string;
  imageUrl?: string;
  priority: "low" | "medium" | "high" | "";
  deadline?: Date;
};

const predefinedTasks = [
  { 
    title: "Clean boat",
    description: "Thoroughly clean the exterior and interior of the boat"
  },
  { 
    title: "Paint buoy",
    description: "Apply fresh paint to navigation buoys"
  },
  { 
    title: "Sand deck",
    description: "Sand and prepare wooden deck for refinishing"
  }
];

const CreateTaskDialog = ({ isOpen, onClose, onCreateTask }: CreateTaskDialogProps) => {
  const { toast } = useToast();
  const [selectedPredefined, setSelectedPredefined] = useState<string | null>(null);
  
  const form = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      estimatedTime: "",
      priority: "",
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
      priority: values.priority || undefined,
      deadline: values.deadline ? values.deadline.toISOString() : undefined,
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-harbor-800">Create New Task</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 my-4">
          <h3 className="text-sm font-medium text-gray-700">Choose a predefined task or create custom</h3>
          <div className="grid grid-cols-3 gap-3">
            {predefinedTasks.map((task) => (
              <Button
                key={task.title}
                type="button"
                variant={selectedPredefined === task.title ? "default" : "outline"}
                className={`h-auto py-3 px-4 ${selectedPredefined === task.title ? 'bg-harbor-600' : ''}`}
                onClick={() => handlePredefinedTaskSelect(task)}
              >
                {task.title}
              </Button>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <Button 
              type="button" 
              variant="ghost" 
              className="text-harbor-600 hover:text-harbor-700"
              onClick={handleCustomTask}
            >
              Create Custom Task
            </Button>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileUp className="h-4 w-4" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter task description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
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
            
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Deadline
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
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
              control={form.control}
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
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Pictures</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        onChange={(e) => {
                          // In a real app, this would upload the file to storage
                          // For now, just store the file name
                          if (e.target.files && e.target.files[0]) {
                            field.onChange(e.target.files[0].name);
                          }
                        }}
                        className="bg-gray-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-harbor-600 hover:bg-harbor-700">
                Create Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
