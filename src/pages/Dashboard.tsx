
import React from "react";
import HarborNavbar from "@/components/HarborNavbar";
import HarborFooter from "@/components/HarborFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CalendarDays, Clock, TrendingUp, Users } from "lucide-react";

// Mock data for charts
const completionRateData = [
  { name: "Jan", completed: 65, total: 100 },
  { name: "Feb", completed: 75, total: 100 },
  { name: "Mar", completed: 82, total: 100 },
  { name: "Apr", completed: 78, total: 100 },
  { name: "May", completed: 85, total: 100 },
  { name: "Jun", completed: 90, total: 100 },
];

const timeToCompletionData = [
  { name: "Cleaning", time: 2.5 },
  { name: "Maintenance", time: 5.8 },
  { name: "Repair", time: 8.2 },
  { name: "Inspection", time: 1.3 },
  { name: "Installation", time: 4.7 },
];

const employeePerformanceData = [
  { name: "John", tasks: 28, efficiency: 92 },
  { name: "Emily", tasks: 24, efficiency: 88 },
  { name: "Michael", tasks: 32, efficiency: 95 },
  { name: "Sarah", tasks: 22, efficiency: 85 },
  { name: "David", tasks: 18, efficiency: 78 },
];

const maintenanceTrendsData = [
  { month: "Jan", preventive: 14, corrective: 7 },
  { month: "Feb", preventive: 16, corrective: 6 },
  { month: "Mar", preventive: 18, corrective: 8 },
  { month: "Apr", preventive: 21, corrective: 5 },
  { month: "May", preventive: 20, corrective: 4 },
  { month: "Jun", preventive: 23, corrective: 3 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HarborNavbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-harbor-800 mb-6">Marina Performance Dashboard</h1>
          
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

          <Tabs defaultValue="completion" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="completion">Task Completion</TabsTrigger>
              <TabsTrigger value="time">Time to Completion</TabsTrigger>
              <TabsTrigger value="employees">Employee Performance</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="completion" className="mt-4">
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
                        data={completionRateData}
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
            </TabsContent>

            <TabsContent value="time" className="mt-4">
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
                        data={timeToCompletionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="time" name="Days to Complete" fill="#7e22ce" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employees" className="mt-4">
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
                        data={employeePerformanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#0891b2" />
                        <YAxis yAxisId="right" orientation="right" stroke="#7e22ce" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="tasks" name="Tasks Completed" fill="#0891b2" />
                        <Bar yAxisId="right" dataKey="efficiency" name="Efficiency %" fill="#7e22ce" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="mt-4">
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
                        data={maintenanceTrendsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="preventive" name="Preventive" stroke="#0891b2" strokeWidth={2} />
                        <Line type="monotone" dataKey="corrective" name="Corrective" stroke="#e11d48" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <HarborFooter />
    </div>
  );
};

export default Dashboard;
