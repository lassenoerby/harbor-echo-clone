
import React from "react";
import { Input } from "@/components/ui/input";

interface AssignmentSectionProps {
  assignedTo: string;
  setAssignedTo: (value: string) => void;
  estimatedTime: string;
  setEstimatedTime: (value: string) => void;
}

export const AssignmentSection = ({
  assignedTo,
  setAssignedTo,
  estimatedTime,
  setEstimatedTime,
}: AssignmentSectionProps) => {
  return (
    <>
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
    </>
  );
};
