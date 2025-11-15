"use client"

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarCheck, Users, Wallet, BarChart3, FileArchive, Building, LayoutDashboard, CalendarX2 } from "lucide-react";
import { AttendanceTab } from "../components/admin/AttendanceTab";
import { LeaveRequestsTab } from "../components/admin/LeaveRequestsTab";
import { UserManagementTab } from "../components/admin/UserManagementTab";
import { PayrollTab } from "../components/admin/PayrollTab";
import { AnalyticsTab } from "../components/admin/AnalyticsTab";
import { DocumentsTab } from "../components/admin/DocumentsTab";
import { OfficesTab } from "../components/admin/OfficesTab";
import { HolidaysTab } from "../components/admin/HolidaysTab";
import Link from 'next/link';
import { StatCard } from '../components/user/StatCard';
import { users, leaveRequests, attendanceRecords } from '@/lib/data';

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  if (!tab) {
    const pendingLeaves = leaveRequests.filter(lr => lr.status === 'Pending').length;
    const usersInProgress = attendanceRecords.filter(ar => ar.status === 'In Progress').length;

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight">Welcome, Admin!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                title="Total Users"
                value={users.length}
                iconName="Users"
                color="text-blue-500"
                />
                <StatCard
                title="Pending Leave Requests"
                value={pendingLeaves}
                iconName="Clock"
                color="text-yellow-500"
                />
                <StatCard
                title="Users Clocked In"
                value={usersInProgress}
                iconName="CheckCircle"
                color="text-green-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LeaveRequestsTab />
              <AttendanceTab />
            </div>
        </div>
    )
  }

  return (
    <Tabs defaultValue={tab} value={tab} className="w-full">
        <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="attendance" asChild><Link href="/admin?tab=attendance" target="_blank" rel="noopener noreferrer"><CalendarDays className="mr-2 h-4 w-4" />Attendance</Link></TabsTrigger>
            <TabsTrigger value="leaves" asChild><Link href="/admin?tab=leaves" target="_blank" rel="noopener noreferrer"><CalendarCheck className="mr-2 h-4 w-4" />Leave Requests</Link></TabsTrigger>
            <TabsTrigger value="users" asChild><Link href="/admin?tab=users" target="_blank" rel="noopener noreferrer"><Users className="mr-2 h-4 w-4" />User Management</Link></TabsTrigger>
            <TabsTrigger value="offices" asChild><Link href="/admin?tab=offices" target="_blank" rel="noopener noreferrer"><Building className="mr-2 h-4 w-4" />Offices</Link></TabsTrigger>
            <TabsTrigger value="holidays" asChild><Link href="/admin?tab=holidays" target="_blank" rel="noopener noreferrer"><CalendarX2 className="mr-2 h-4 w-4" />Holidays</Link></TabsTrigger>
            <TabsTrigger value="documents" asChild><Link href="/admin?tab=documents" target="_blank" rel="noopener noreferrer"><FileArchive className="mr-2 h-4 w-4" />Documents</Link></TabsTrigger>
            <TabsTrigger value="payroll" asChild><Link href="/admin?tab=payroll" target="_blank" rel="noopener noreferrer"><Wallet className="mr-2 h-4 w-4" />Payroll</Link></TabsTrigger>
            <TabsTrigger value="analytics" asChild><Link href="/admin?tab=analytics" target="_blank" rel="noopener noreferrer"><BarChart3 className="mr-2 h-4 w-4" />Analytics</Link></TabsTrigger>
        </TabsList>
        <div className="mt-6">
            <TabsContent value="attendance"><AttendanceTab /></TabsContent>
            <TabsContent value="leaves"><LeaveRequestsTab /></TabsContent>
            <TabsContent value="users"><UserManagementTab /></TabsContent>
            <TabsContent value="offices"><OfficesTab /></TabsContent>
            <TabsContent value="holidays"><HolidaysTab /></TabsContent>
            <TabsContent value="documents"><DocumentsTab /></TabsContent>
            <TabsContent value="payroll"><PayrollTab /></TabsContent>
            <TabsContent value="analytics"><AnalyticsTab /></TabsContent>
        </div>
    </Tabs>
  );
}

export default function AdminDashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboardContent />
        </Suspense>
    )
}
