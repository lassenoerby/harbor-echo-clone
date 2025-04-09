
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CompletionRateChartProps = {
  data: Array<{
    name: string;
    completed: number;
    total: number;
  }>;
};

const CompletionRateChart = ({ data }: CompletionRateChartProps) => {
  // Use memo to prevent unnecessary re-renders of the chart data
  const stableData = React.useMemo(() => data, [
    // Only re-render when the data actually changes
    JSON.stringify(data)
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion Rates</CardTitle>
        <CardDescription>
          Monthly completion percentage of assigned tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stableData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Completed %" fill="#0891b2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionRateChart;
