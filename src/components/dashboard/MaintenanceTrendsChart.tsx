
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MaintenanceTrendsChartProps = {
  data: Array<{
    month: string;
    preventive: number;
    corrective: number;
  }>;
};

const MaintenanceTrendsChart = ({ data }: MaintenanceTrendsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Trends</CardTitle>
        <CardDescription>
          Preventive vs. corrective maintenance tasks over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="preventive" name="Preventive" stroke="#112AB0" strokeWidth={2} />
              <Line type="monotone" dataKey="corrective" name="Corrective" stroke="#e11d48" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceTrendsChart;
