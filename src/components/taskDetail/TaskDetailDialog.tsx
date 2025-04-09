
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Task, Subtask } from "@/types/task";
import { TitleDescriptionSection } from "./TitleDescriptionSection";
import { PrioritySection } from "./PrioritySection";
import { DeadlineSection } from "./DeadlineSection";
import { AssignmentSection } from "./AssignmentSection";
import { ImageSection } from "./ImageSection";
import { TaskTypeSection } from "./TaskTypeSection";
import { SubtasksSection } from "./SubtasksSection";
import { TaskDetailFooter } from "./TaskDetailFooter";
import { PriceSection } from "./PriceSection";
import { InvoiceSection } from "./InvoiceSection";
import { useToast } from "@/hooks/use-toast";

interface TaskDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
}

const TaskDetailDialog = ({ isOpen, onClose, task, onUpdateTask }: TaskDetailDialogProps) => {
  const { toast } = useToast();
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
  const [price, setPrice] = useState<number | undefined>(task.price);
  const [invoiceSent, setInvoiceSent] = useState<boolean | undefined>(task.invoiceSent);
  const [invoiceSentDate, setInvoiceSentDate] = useState<string | undefined>(task.invoiceSentDate);

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
      setPrice(task.price);
      setInvoiceSent(task.invoiceSent);
      setInvoiceSentDate(task.invoiceSentDate);
    }
  }, [isOpen, task]);

  // Create a handler function that takes a string value
  const handleTaskTypeChange = (value: string) => {
    setTaskType(value);
  };

  const handleSendInvoice = () => {
    setInvoiceSent(true);
    setInvoiceSentDate(new Date().toISOString());
    
    toast({
      title: "Invoice Sent",
      description: `Invoice for "$${price}" has been sent to the boat owner.`,
    });
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
      price: price,
      invoiceSent: invoiceSent,
      invoiceSentDate: invoiceSentDate,
    };
    
    onUpdateTask(updatedTask);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[85vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        
        <form id="task-detail-form" onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
          <div className="flex-grow overflow-auto px-6">
            <div className="space-y-4 pt-4 pb-4">
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
              
              <PriceSection
                price={price}
                setPrice={setPrice}
              />
              
              {taskType === "boater" && (
                <InvoiceSection
                  taskId={task.id}
                  taskType={taskType}
                  price={price}
                  invoiceSent={invoiceSent}
                  invoiceSentDate={invoiceSentDate}
                  onSendInvoice={handleSendInvoice}
                />
              )}
              
              <SubtasksSection 
                subtasks={subtasks}
                setSubtasks={setSubtasks}
              />
              
              <ImageSection 
                imageUrl={imageUrl} 
                setImageUrl={setImageUrl} 
              />
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-background p-4 border-t mt-auto">
            <TaskDetailFooter onCancel={onClose} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailDialog;
