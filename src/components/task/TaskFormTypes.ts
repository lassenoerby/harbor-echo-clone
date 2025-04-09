
import { Task } from "@/types/task";

export interface TaskFormValues {
  title: string;
  description: string;
  assignedTo: string;
  estimatedTime: string;
  imageUrl?: string;
  priority: "low" | "medium" | "high" | "none";
  deadline?: Date;
  taskType: "harbor" | "boater";
}

export interface TaskFormProps {
  form: any; // Using any here as the full type from react-hook-form would be imported in the main component
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
}
