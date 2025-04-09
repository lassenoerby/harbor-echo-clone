
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
  estimatedTime?: string;
  imageUrl?: string;
}
