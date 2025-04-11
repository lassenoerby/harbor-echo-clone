
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type TimeToCompletionChartProps = {
  data: Array<{
    name: string;
    time: number;
  }>;
};

const TimeToCompletionChart = ({ data }: TimeToCompletionChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Time to Completion</CardTitle>
        <CardDescription>
          Average time (in days) to complete different types of tasks
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
              <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" name="Days to Complete" fill="#112AB0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeToCompletionChart;
