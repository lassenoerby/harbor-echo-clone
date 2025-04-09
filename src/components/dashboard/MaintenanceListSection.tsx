
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MaintenanceTrendsList, { MaintenanceItem } from "@/components/dashboard/MaintenanceTrendsList";

type MaintenanceListSectionProps = {
  items: MaintenanceItem[];
};

const MaintenanceListSection = ({ items }: MaintenanceListSectionProps) => {
  // Prevent re-renders by using a stable reference to the items
  const stableItems = React.useMemo(() => items, [
    // Only update when the IDs change or the count of items changes
    items.map(item => item.id).join(','),
    items.length
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Maintenance Tasks</CardTitle>
        <CardDescription>
          Most frequently performed maintenance tasks and their trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MaintenanceTrendsList items={stableItems} />
      </CardContent>
    </Card>
  );
};

export default MaintenanceListSection;
