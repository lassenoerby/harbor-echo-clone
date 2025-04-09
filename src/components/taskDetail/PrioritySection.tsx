
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flag } from "lucide-react";

interface PrioritySectionProps {
  priority: string;
  setPriority: (priority: string) => void;
}

export const PrioritySection = ({ priority, setPriority }: PrioritySectionProps) => {
  return (
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
  );
};
