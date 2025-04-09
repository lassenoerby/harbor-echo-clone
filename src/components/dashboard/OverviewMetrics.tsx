
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Clock, TrendingUp, Users } from "lucide-react";

const OverviewMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center">
            <TrendingUp className="mr-2 h-4 w-4 text-harbor-600" />
            Task Completion
          </CardDescription>
          <CardTitle className="text-2xl">85%</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={85} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-harbor-600" />
            Avg. Completion Time
          </CardDescription>
          <CardTitle className="text-2xl">4.5 days</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={70} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">-0.8 days from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-harbor-600" />
            Staff Efficiency
          </CardDescription>
          <CardTitle className="text-2xl">87.6%</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={87.6} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">+2.3% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-harbor-600" />
            Preventive Maintenance
          </CardDescription>
          <CardTitle className="text-2xl">76%</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={76} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">+8% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewMetrics;
