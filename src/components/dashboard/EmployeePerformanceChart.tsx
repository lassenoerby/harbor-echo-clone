
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type EmployeePerformanceChartProps = {
  data: Array<{
    name: string;
    tasks: number;
    efficiency: number;
  }>;
};

const EmployeePerformanceChart = ({ data }: EmployeePerformanceChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Performance</CardTitle>
        <CardDescription>
          Tasks completed and efficiency rating per employee
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#112AB0" />
              <YAxis yAxisId="right" orientation="right" stroke="#3478F4" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="tasks" name="Tasks Completed" fill="#112AB0" />
              <Bar yAxisId="right" dataKey="efficiency" name="Efficiency %" fill="#3478F4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeePerformanceChart;
