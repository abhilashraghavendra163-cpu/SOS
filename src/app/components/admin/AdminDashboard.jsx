"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarCheck, Users, Wallet, BarChart3, FileArchive, Building, CalendarX2 } from "lucide-react";
import { AttendanceTab } from "@/app/components/admin/AttendanceTab";
import { LeaveRequestsTab } from "@/app/components/admin/LeaveRequestsTab";
import { UserManagementTab } from "@/app/components/admin/UserManagementTab";
import { PayrollTab } from "@/app/components/admin/PayrollTab";
import { AnalyticsTab } from "@/app/components/admin/AnalyticsTab";
import { DocumentsTab } from "@/app/components/admin/DocumentsTab";
import { OfficesTab } from "@/app/components/admin/OfficesTab";
import { HolidaysTab } from "@/app/components/admin/HolidaysTab";
import { StatCard } from '@/app/components/user/StatCard';
import { users, leaveRequests, attendanceRecords } from '@/lib/data';

export function AdminDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get('tab');

  const handleTabChange = (value) => {
    router.push(`/admin?tab=${value}`);
  };

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
    <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="attendance"><CalendarDays className="mr-2 h-4 w-4" />Attendance</TabsTrigger>
            <TabsTrigger value="leaves"><CalendarCheck className="mr-2 h-4 w-4" />Leave Requests</TabsTrigger>
            <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" />User Management</TabsTrigger>
            <TabsTrigger value="offices"><Building className="mr-2 h-4 w-4" />Offices</TabsTrigger>
            <TabsTrigger value="holidays"><CalendarX2 className="mr-2 h-4 w-4" />Holidays</TabsTrigger>
            <TabsTrigger value="documents"><FileArchive className="mr-2 h-4 w-4" />Documents</TabsTrigger>
            <TabsTrigger value="payroll"><Wallet className="mr-2 h-4 w-4" />Payroll</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart3 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
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
