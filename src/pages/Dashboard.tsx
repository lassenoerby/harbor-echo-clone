
import React, { useState, useCallback, useMemo } from "react";
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
  
  // Use a stable function reference to prevent unnecessary re-renders
  const handleTimePeriodChange = useCallback((from: Date, to: Date, label: string) => {
    console.log(`Date range selected: ${from.toDateString()} to ${to.toDateString()}`);
    setTimePeriodLabel(label);
    
    // Generate a consistent set of data based on the date range
    // This uses the start date as a seed to ensure we get the same values for the same date range
    const seed = from.getDate() + from.getMonth() * 100;
    
    const updatedItems = maintenanceItems.map((item, index) => {
      // Create a deterministic "random" value based on the item id and date range
      const itemSeed = parseInt(item.id) + seed;
      const countAdjustment = (itemSeed % 7) - 3; // Between -3 and 3
      const trendOptions = ["up", "down", "neutral"] as const;
      const trendIndex = itemSeed % 3;
      
      return {
        ...item,
        count: Math.max(5, item.count + countAdjustment),
        trend: trendOptions[trendIndex],
        percentChange: 5 + (itemSeed % 20) // Between 5 and 24
      };
    });
    
    setMaintenanceItems(updatedItems);
  }, [maintenanceItems]);

  // Use memo to make React only update UI when needed
  const tabsContent = useMemo(() => (
    <>
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
    </>
  ), [maintenanceItems]);

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
            
            {tabsContent}
          </Tabs>
        </div>
      </main>
      <HarborFooter />
    </div>
  );
};

export default Dashboard;
