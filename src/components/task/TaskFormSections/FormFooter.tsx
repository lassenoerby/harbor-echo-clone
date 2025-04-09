
import React from "react";
import { Button } from "@/components/ui/button";

interface FormFooterProps {
  onCancel: () => void;
}

export const FormFooter = ({ onCancel }: FormFooterProps) => {
  return (
    <div className="sticky bottom-0 bg-background p-4 border-t mt-4">
      <div className="flex justify-end space-x-2 w-full">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-harbor-600 hover:bg-harbor-700">
          Create Task
        </Button>
      </div>
    </div>
  );
};
