
import React from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export type MaintenanceItem = {
  id: string;
  name: string;
  count: number;
  trend: "up" | "down" | "neutral";
  percentChange: number;
};

type MaintenanceTrendsListProps = {
  items: MaintenanceItem[];
};

const MaintenanceTrendsList = ({ items }: MaintenanceTrendsListProps) => {
  // Use memo to prevent unnecessary re-renders
  const renderedItems = React.useMemo(() => items, [
    // Only re-render when these actually change
    items.map(item => `${item.id}-${item.count}-${item.percentChange}`).join(',')
  ]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Maintenance Type</TableHead>
            <TableHead>Count</TableHead>
            <TableHead className="text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell className="text-right flex items-center justify-end">
                <div className="flex items-center">
                  {item.trend === "up" ? (
                    <>
                      <span className="mr-2 text-green-600">{item.percentChange}%</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </>
                  ) : item.trend === "down" ? (
                    <>
                      <span className="mr-2 text-red-600">{item.percentChange}%</span>
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    </>
                  ) : (
                    <>
                      <span className="mr-2 text-gray-600">{item.percentChange}%</span>
                      <Minus className="h-4 w-4 text-gray-600" />
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceTrendsList;
