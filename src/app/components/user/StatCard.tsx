"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: keyof typeof Icons;
  color?: string;
};

export function StatCard({ title, value, icon, color }: StatCardProps) {
  const Icon = Icons[icon] as Icons.LucideIcon;

  return (
    <Card className="transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={cn("h-5 w-5 text-muted-foreground", color)} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
