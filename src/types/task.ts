
export interface Subtask {
  id: string;
  description: string;
  responsible?: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
  estimatedTime?: string;
  imageUrl?: string;
  priority?: "low" | "medium" | "high";
  deadline?: string;
  taskType?: "harbor" | "boater";
  subtasks?: Subtask[];
}
