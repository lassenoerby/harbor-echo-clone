
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task, Subtask } from "@/types/task";
import { TitleDescriptionSection } from "./TitleDescriptionSection";
import { PrioritySection } from "./PrioritySection";
import { DeadlineSection } from "./DeadlineSection";
import { AssignmentSection } from "./AssignmentSection";
import { ImageSection } from "./ImageSection";
import { TaskTypeSection } from "./TaskTypeSection";
import { SubtasksSection } from "./SubtasksSection";
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
  const [priority, setPriority] = useState(task.priority || "none");
  const [taskType, setTaskType] = useState<"harbor" | "boater" | string>(task.taskType || "harbor");
  const [deadline, setDeadline] = useState<Date | undefined>(
    task.deadline ? new Date(task.deadline) : undefined
  );
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);

  // Reset form state when task changes
  useEffect(() => {
    if (isOpen) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignedTo(task.assignedTo || "");
      setEstimatedTime(task.estimatedTime || "");
      setImageUrl(task.imageUrl || "");
      setPriority(task.priority || "none");
      setTaskType(task.taskType || "harbor");
      setDeadline(task.deadline ? new Date(task.deadline) : undefined);
      setSubtasks(task.subtasks || []);
    }
  }, [isOpen, task]);

  // Create a handler function that takes a string value
  const handleTaskTypeChange = (value: string) => {
    setTaskType(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedTask: Task = {
      ...task,
      title,
      description,
      assignedTo: assignedTo || undefined,
      estimatedTime: estimatedTime || undefined,
      imageUrl: imageUrl || undefined,
      priority: priority === "none" ? undefined : priority as "low" | "medium" | "high" | undefined,
      taskType: taskType as "harbor" | "boater" | undefined,
      deadline: deadline ? deadline.toISOString() : undefined,
      subtasks: subtasks.length > 0 ? subtasks : undefined,
    };
    
    onUpdateTask(updatedTask);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)] px-6">
          <form id="task-detail-form" onSubmit={handleSubmit} className="space-y-4 pt-4 pb-6">
            <TitleDescriptionSection 
              title={title} 
              setTitle={setTitle} 
              description={description} 
              setDescription={setDescription} 
            />
            
            <TaskTypeSection
              taskType={taskType}
              setTaskType={handleTaskTypeChange}
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
            
            <SubtasksSection 
              subtasks={subtasks}
              setSubtasks={setSubtasks}
            />
            
            <ImageSection 
              imageUrl={imageUrl} 
              setImageUrl={setImageUrl} 
            />
          </form>
        </ScrollArea>
        
        <div className="sticky bottom-0 bg-background p-6 pt-4 border-t">
          <TaskDetailFooter onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailDialog;
