
import { MaintenanceItem } from "./MaintenanceTrendsList";

// Mock data for charts
export const completionRateData = [
  { name: "Jan", completed: 65, total: 100 },
  { name: "Feb", completed: 75, total: 100 },
  { name: "Mar", completed: 82, total: 100 },
  { name: "Apr", completed: 78, total: 100 },
  { name: "May", completed: 85, total: 100 },
  { name: "Jun", completed: 90, total: 100 },
];

export const timeToCompletionData = [
  { name: "Cleaning", time: 2.5 },
  { name: "Maintenance", time: 5.8 },
  { name: "Repair", time: 8.2 },
  { name: "Inspection", time: 1.3 },
  { name: "Installation", time: 4.7 },
];

export const employeePerformanceData = [
  { name: "John", tasks: 28, efficiency: 92 },
  { name: "Emily", tasks: 24, efficiency: 88 },
  { name: "Michael", tasks: 32, efficiency: 95 },
  { name: "Sarah", tasks: 22, efficiency: 85 },
  { name: "David", tasks: 18, efficiency: 78 },
];

export const maintenanceTrendsData = [
  { month: "Jan", preventive: 14, corrective: 7 },
  { month: "Feb", preventive: 16, corrective: 6 },
  { month: "Mar", preventive: 18, corrective: 8 },
  { month: "Apr", preventive: 21, corrective: 5 },
  { month: "May", preventive: 20, corrective: 4 },
  { month: "Jun", preventive: 23, corrective: 3 },
];

// Mock data for the maintenance trends list
export const mockMaintenanceItems: MaintenanceItem[] = [
  { id: "1", name: "Engine Service", count: 48, trend: "up", percentChange: 12 },
  { id: "2", name: "Hull Cleaning", count: 36, trend: "up", percentChange: 8 },
  { id: "3", name: "Electrical Repairs", count: 24, trend: "down", percentChange: 5 },
  { id: "4", name: "Deck Washing", count: 22, trend: "up", percentChange: 15 },
  { id: "5", name: "Sail Repair", count: 18, trend: "down", percentChange: 7 },
  { id: "6", name: "Navigation System Check", count: 15, trend: "neutral", percentChange: 0 },
  { id: "7", name: "Propeller Maintenance", count: 12, trend: "up", percentChange: 20 },
  { id: "8", name: "Interior Cleaning", count: 10, trend: "down", percentChange: 10 },
];
