
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MaintenanceTrendsList, { MaintenanceItem } from "@/components/dashboard/MaintenanceTrendsList";

type MaintenanceListSectionProps = {
  items: MaintenanceItem[];
};

const MaintenanceListSection = ({ items }: MaintenanceListSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Maintenance Tasks</CardTitle>
        <CardDescription>
          Most frequently performed maintenance tasks and their trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MaintenanceTrendsList items={items} />
      </CardContent>
    </Card>
  );
};

export default MaintenanceListSection;
