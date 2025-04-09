
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { TaskFormValues } from "../TaskFormTypes";

interface PriceSectionProps {
  control: Control<TaskFormValues>;
}

export const PriceSection = ({ control }: PriceSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Price</h3>
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price (USD)</FormLabel>
            <FormControl>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-10"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : undefined;
                    field.onChange(value);
                  }}
                  value={field.value === undefined ? "" : field.value}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
