
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DeadlineSectionProps {
  deadline: Date | undefined;
  setDeadline: (date: Date | undefined) => void;
}

export const DeadlineSection = ({ deadline, setDeadline }: DeadlineSectionProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="deadline" className="text-sm font-medium flex items-center gap-2">
        <CalendarIcon className="h-4 w-4" />
        Deadline
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !deadline && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {deadline ? format(deadline, "PPP") : <span>Select a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={deadline}
            onSelect={setDeadline}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
