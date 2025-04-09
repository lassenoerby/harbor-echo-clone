
import React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type TimePeriod = "thisMonth" | "lastMonth" | "lastThreeMonths" | "lastSixMonths" | "thisYear" | "custom";

type TimePeriodPickerProps = {
  onChange: (from: Date, to: Date, label: string) => void;
};

const TimePeriodPicker = ({ onChange }: TimePeriodPickerProps) => {
  const [period, setPeriod] = React.useState<TimePeriod>("thisMonth");
  const [customDateFrom, setCustomDateFrom] = React.useState<Date>();
  const [customDateTo, setCustomDateTo] = React.useState<Date>();

  const getPeriodDates = (period: TimePeriod): { from: Date; to: Date; label: string } => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (period) {
      case "thisMonth": {
        const from = new Date(now.getFullYear(), now.getMonth(), 1);
        return { from, to: today, label: `${format(from, "MMMM yyyy")}` };
      }
      case "lastMonth": {
        const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const to = new Date(now.getFullYear(), now.getMonth(), 0);
        return { from, to, label: `${format(from, "MMMM yyyy")}` };
      }
      case "lastThreeMonths": {
        const from = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        return { from, to: today, label: `Last 3 months` };
      }
      case "lastSixMonths": {
        const from = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        return { from, to: today, label: `Last 6 months` };
      }
      case "thisYear": {
        const from = new Date(now.getFullYear(), 0, 1);
        return { from, to: today, label: `${now.getFullYear()}` };
      }
      case "custom": {
        if (customDateFrom && customDateTo) {
          return {
            from: customDateFrom,
            to: customDateTo,
            label: `${format(customDateFrom, "MMM d")} - ${format(customDateTo, "MMM d, yyyy")}`,
          };
        }
        // Default to this month if custom dates aren't set
        const from = new Date(now.getFullYear(), now.getMonth(), 1);
        return { from, to: today, label: `${format(from, "MMMM yyyy")}` };
      }
      default:
        // Default to this month
        const from = new Date(now.getFullYear(), now.getMonth(), 1);
        return { from, to: today, label: `${format(from, "MMMM yyyy")}` };
    }
  };

  React.useEffect(() => {
    const { from, to, label } = getPeriodDates(period);
    onChange(from, to, label);
  }, [period, customDateFrom, customDateTo, onChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6">
      <div className="flex-1">
        <Select value={period} onValueChange={(value) => setPeriod(value as TimePeriod)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="lastThreeMonths">Last 3 Months</SelectItem>
            <SelectItem value="lastSixMonths">Last 6 Months</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {period === "custom" && (
        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !customDateFrom && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {customDateFrom ? format(customDateFrom, "PPP") : <span>From</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customDateFrom}
                onSelect={setCustomDateFrom}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !customDateTo && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {customDateTo ? format(customDateTo, "PPP") : <span>To</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customDateTo}
                onSelect={setCustomDateTo}
                initialFocus
                disabled={(date) => customDateFrom ? date < customDateFrom : false}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default TimePeriodPicker;
