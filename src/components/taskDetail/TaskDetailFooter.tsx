
import React from "react";
import { Button } from "@/components/ui/button";

interface TaskDetailFooterProps {
  onCancel: () => void;
}

export const TaskDetailFooter = ({ onCancel }: TaskDetailFooterProps) => {
  return (
    <div className="flex justify-end space-x-2 w-full">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" form="task-detail-form">Save Changes</Button>
    </div>
  );
};
