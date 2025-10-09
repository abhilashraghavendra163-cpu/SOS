"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
}, {} as Record<string, { Present: number; Late: number; 'On Leave': number }>);

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
}, {} as Record<string, number>);

const pieData = Object.entries(statusDistribution).map(([name, value]) => ({ name, value }));

const COLORS = {
    Present: 'hsl(var(--chart-2))',
    Late: 'hsl(var(--chart-4))',
    'On Leave': 'hsl(var(--chart-5))',
    'In Progress': 'hsl(var(--chart-3))',
};


export function AnalyticsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Weekly Attendance Overview</CardTitle>
          <CardDescription>Breakdown of attendance statuses by day.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar dataKey="Present" fill="hsl(var(--chart-2))" />
              <Bar dataKey="Late" fill="hsl(var(--chart-4))" />
              <Bar dataKey="On Leave" fill="hsl(var(--chart-5))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Overall Status Distribution</CardTitle>
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
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
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
    </div>
  )
}
