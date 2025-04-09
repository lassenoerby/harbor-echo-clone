
import React, { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types/task";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, Flag, Upload, Image, X } from "lucide-react";
import { format } from "date-fns";
import ImageUploader from "./ImageUploader";

interface TaskDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
}

const TaskDetailDialog = ({ isOpen, onClose, task, onUpdateTask }: TaskDetailDialogProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || "");
  const [estimatedTime, setEstimatedTime] = useState(task.estimatedTime || "");
  const [imageUrl, setImageUrl] = useState(task.imageUrl || "");
  const [priority, setPriority] = useState(task.priority || "");
  const [deadline, setDeadline] = useState<Date | undefined>(
    task.deadline ? new Date(task.deadline) : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedTask: Task = {
      ...task,
      title,
      description,
      assignedTo: assignedTo || undefined,
      estimatedTime: estimatedTime || undefined,
      imageUrl: imageUrl || undefined,
      priority: priority as "low" | "medium" | "high" | undefined,
      deadline: deadline ? deadline.toISOString() : undefined,
    };
    
    onUpdateTask(updatedTask);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const clearImage = () => {
    setImageUrl("");
  };

  // Reset form state when task changes
  React.useEffect(() => {
    if (isOpen) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignedTo(task.assignedTo || "");
      setEstimatedTime(task.estimatedTime || "");
      setImageUrl(task.imageUrl || "");
      setPriority(task.priority || "");
      setDeadline(task.deadline ? new Date(task.deadline) : undefined);
    }
  }, [isOpen, task]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Priority
            </label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="deadline" className="text-sm font-medium flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Deadline
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="assignedTo" className="text-sm font-medium">
              Assigned To
            </label>
            <Input
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Who is responsible for this task?"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="estimatedTime" className="text-sm font-medium">
              Estimated Time
            </label>
            <Input
              id="estimatedTime"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="e.g., 2 hours, 3 days"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Image className="h-4 w-4" />
              Task Image
            </label>
            
            <ImageUploader 
              currentImage={imageUrl} 
              onImageUpload={handleImageUpload} 
              onClearImage={clearImage}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailDialog;
