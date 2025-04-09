
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

interface PriceSectionProps {
  price: number | undefined;
  setPrice: (price: number | undefined) => void;
}

export const PriceSection = ({ price, setPrice }: PriceSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="price">Price (USD)</Label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          id="price"
          type="number"
          placeholder="0.00"
          className="pl-10"
          value={price === undefined ? "" : price}
          onChange={(e) => {
            const value = e.target.value ? parseFloat(e.target.value) : undefined;
            setPrice(value);
          }}
        />
      </div>
    </div>
  );
};
