
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Task } from "@/types/task";
import { TitleDescriptionSection } from "./TitleDescriptionSection";
import { PrioritySection } from "./PrioritySection";
import { DeadlineSection } from "./DeadlineSection";
import { AssignmentSection } from "./AssignmentSection";
import { ImageSection } from "./ImageSection";
import { TaskDetailFooter } from "./TaskDetailFooter";

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

  // Reset form state when task changes
  useEffect(() => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <TitleDescriptionSection 
            title={title} 
            setTitle={setTitle} 
            description={description} 
            setDescription={setDescription} 
          />
          
          <PrioritySection 
            priority={priority} 
            setPriority={setPriority} 
          />

          <DeadlineSection 
            deadline={deadline} 
            setDeadline={setDeadline} 
          />
          
          <AssignmentSection 
            assignedTo={assignedTo} 
            setAssignedTo={setAssignedTo} 
            estimatedTime={estimatedTime} 
            setEstimatedTime={setEstimatedTime} 
          />
          
          <ImageSection 
            imageUrl={imageUrl} 
            setImageUrl={setImageUrl} 
          />
          
          <TaskDetailFooter onCancel={onClose} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailDialog;
