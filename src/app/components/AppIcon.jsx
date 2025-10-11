import { GanttChartSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppIcon({ className }) {
  return <GanttChartSquare className={cn("text-primary", className)} />;
}
