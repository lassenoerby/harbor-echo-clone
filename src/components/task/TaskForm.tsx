
import React from "react";
import { UseFormReturn } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { User, Clock, ListTodo, Flag, CalendarIcon, Image } from "lucide-react";
import ImageUploader from "../ImageUploader";

export interface TaskFormValues {
  title: string;
  description: string;
  assignedTo: string;
  estimatedTime: string;
  imageUrl?: string;
  priority: "low" | "medium" | "high" | "";
  deadline?: Date;
}

interface TaskFormProps {
  form: UseFormReturn<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
}

const TaskForm = ({ form, onSubmit, onCancel }: TaskFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <FormLabel className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Task Image
              </FormLabel>
              <FormControl>
                <ImageUploader
                  currentImage={field.value || ""}
                  onImageUpload={(url) => field.onChange(url)}
                  onClearImage={() => field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-harbor-600 hover:bg-harbor-700">
            Create Task
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TaskForm;
