"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { attendanceRecords } from "@/lib/data"
import { summarizeAnalytics } from "@/ai/flows/summarize-analytics-flow"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Loader, Lightbulb } from "lucide-react"

const attendanceByDay = attendanceRecords.reduce((acc, record) => {
  const day = new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' });
  if (!acc[day]) {
    acc[day] = { Present: 0, Late: 0, 'On Leave': 0 };
  }
  if (record.status === 'Present' || record.status === 'Late') {
      acc[day].Present += 1;
      if (record.status === 'Late') {
          acc[day].Late += 1;
      }
  } else if (record.status === 'On Leave') {
      acc[day]['On Leave'] += 1;
  }
  return acc;
}, {});

const chartData = Object.entries(attendanceByDay).map(([name, values]) => ({
  name,
  ...values,
}));

const statusDistribution = attendanceRecords.reduce((acc, record) => {
    if (acc[record.status]) {
        acc[record.status] += 1;
    } else {
        acc[record.status] = 1;
    }
    return acc;
}, {});

const pieData = Object.entries(statusDistribution).map(([name, value]) => ({ name, value }));

const COLORS = {
    Present: 'hsl(var(--primary))',
    Late: 'hsl(var(--chart-4))',
    'On Leave': 'hsl(var(--muted-foreground))',
    'In Progress': 'hsl(var(--chart-3))',
};


export function AnalyticsTab() {
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerateSummary = async () => {
        setIsLoading(true);
        setSummary(null);
        try {
            const result = await summarizeAnalytics({ attendanceData: attendanceRecords });
            setSummary(result.summary);
        } catch (error) {
            console.error("Failed to get summary:", error);
            toast({
                variant: "destructive",
                title: "AI Summary Failed",
                description: "Could not generate an analytics summary.",
            });
        } finally {
            setIsLoading(false);
        }
    };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Weekly Attendance Overview</CardTitle>
          <CardDescription>Breakdown of attendance statuses by day.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar dataKey="Present" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Late" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="On Leave" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Overall Status Distribution</CardTitle>
          <CardDescription>A pie chart showing the distribution of all attendance statuses.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
            <CardTitle className="font-bold flex items-center gap-2">
                <Sparkles className="text-primary" />
                AI-Powered Analytics Summary
            </CardTitle>
            <CardDescription>
                Click the button to generate an AI summary of the weekly attendance data.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader className="animate-spin h-5 w-5" />
                    <span>Generating summary...</span>
                </div>
            )}
            {summary && (
                <div className="flex items-start gap-3 p-4 rounded-md bg-muted/50 border">
                    <Lightbulb className="w-5 h-5 mt-1 text-primary" />
                    <p className="text-foreground">{summary}</p>
                </div>
            )}
        </CardContent>
        <CardFooter>
             <Button onClick={handleGenerateSummary} disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Summary
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
