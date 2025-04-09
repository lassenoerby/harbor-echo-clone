
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface TaskDetailFooterProps {
  onCancel: () => void;
}

export const TaskDetailFooter = ({ onCancel }: TaskDetailFooterProps) => {
  return (
    <DialogFooter className="pt-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">Save Changes</Button>
    </DialogFooter>
  );
};
