
import React, { useState } from "react";
import HarborNavbar from "@/components/HarborNavbar";
import HarborFooter from "@/components/HarborFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaintenanceItem } from "@/components/dashboard/MaintenanceTrendsList";
import TimePeriodPicker from "@/components/dashboard/TimePeriodPicker";
import OverviewMetrics from "@/components/dashboard/OverviewMetrics";
import CompletionRateChart from "@/components/dashboard/CompletionRateChart";
import TimeToCompletionChart from "@/components/dashboard/TimeToCompletionChart";
import EmployeePerformanceChart from "@/components/dashboard/EmployeePerformanceChart";
import MaintenanceTrendsChart from "@/components/dashboard/MaintenanceTrendsChart";
import MaintenanceListSection from "@/components/dashboard/MaintenanceListSection";
import { 
  completionRateData, 
  timeToCompletionData, 
  employeePerformanceData, 
  maintenanceTrendsData, 
  mockMaintenanceItems 
} from "@/components/dashboard/DashboardData";

const Dashboard = () => {
  const [timePeriodLabel, setTimePeriodLabel] = useState("This Month");
  const [maintenanceItems, setMaintenanceItems] = useState(mockMaintenanceItems);
  
  // This would normally fetch data based on the time period
  const handleTimePeriodChange = (from: Date, to: Date, label: string) => {
    console.log(`Date range selected: ${from.toDateString()} to ${to.toDateString()}`);
    setTimePeriodLabel(label);
    
    // In a real application, you would fetch new data based on these dates
    // For now, we'll just randomize the counts slightly to simulate different data
    const updatedItems = maintenanceItems.map(item => ({
      ...item,
      count: Math.max(5, item.count + Math.floor(Math.random() * 10) - 5),
      trend: ["up", "down", "neutral"][Math.floor(Math.random() * 3)] as "up" | "down" | "neutral",
      percentChange: Math.floor(Math.random() * 25)
    }));
    
    setMaintenanceItems(updatedItems);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HarborNavbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-harbor-800">Marina Performance Dashboard</h1>
            <div className="w-full md:w-auto">
              <TimePeriodPicker onChange={handleTimePeriodChange} />
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-harbor-700 mb-2">Overview for {timePeriodLabel}</h2>
          </div>
          
          <OverviewMetrics />

          <Tabs defaultValue="completion" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="completion">Task Completion</TabsTrigger>
              <TabsTrigger value="time">Time to Completion</TabsTrigger>
              <TabsTrigger value="employees">Employee Performance</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Trends</TabsTrigger>
              <TabsTrigger value="common">Common Maintenance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="completion" className="mt-4">
              <CompletionRateChart data={completionRateData} />
            </TabsContent>

            <TabsContent value="time" className="mt-4">
              <TimeToCompletionChart data={timeToCompletionData} />
            </TabsContent>

            <TabsContent value="employees" className="mt-4">
              <EmployeePerformanceChart data={employeePerformanceData} />
            </TabsContent>

            <TabsContent value="maintenance" className="mt-4">
              <MaintenanceTrendsChart data={maintenanceTrendsData} />
            </TabsContent>

            <TabsContent value="common" className="mt-4">
              <MaintenanceListSection items={maintenanceItems} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <HarborFooter />
    </div>
  );
};

export default Dashboard;
