
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface FormFooterProps {
  onCancel: () => void;
}

export const FormFooter = ({ onCancel }: FormFooterProps) => {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" className="bg-harbor-600 hover:bg-harbor-700">
        Create Task
      </Button>
    </DialogFooter>
  );
};
