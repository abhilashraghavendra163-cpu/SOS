import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarCheck, Users, Wallet, BarChart3, FileArchive, Building } from "lucide-react";
import { AttendanceTab } from "../components/admin/AttendanceTab";
import { LeaveRequestsTab } from "../components/admin/LeaveRequestsTab";
import { UserManagementTab } from "../components/admin/UserManagementTab";
import { PayrollTab } from "../components/admin/PayrollTab";
import { AnalyticsTab } from "../components/admin/AnalyticsTab";
import { DocumentsTab } from "../components/admin/DocumentsTab";
import { OfficesTab } from "../components/admin/OfficesTab";

export default function AdminDashboardPage() {
  return (
    <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="attendance">
                <CalendarDays className="mr-2 h-4 w-4" />
                Attendance
            </TabsTrigger>
            <TabsTrigger value="leaves">
                <CalendarCheck className="mr-2 h-4 w-4" />
                Leave Requests
            </TabsTrigger>
            <TabsTrigger value="users">
                <Users className="mr-2 h-4 w-4" />
                User Management
            </TabsTrigger>
            <TabsTrigger value="offices">
                <Building className="mr-2 h-4 w-4" />
                Offices
            </TabsTrigger>
            <TabsTrigger value="documents">
                <FileArchive className="mr-2 h-4 w-4" />
                Documents
            </TabsTrigger>
            <TabsTrigger value="payroll">
                <Wallet className="mr-2 h-4 w-4" />
                Payroll
            </TabsTrigger>
            <TabsTrigger value="analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
            </TabsTrigger>
        </TabsList>
        <div className="mt-6">
            <TabsContent value="attendance">
                <AttendanceTab />
            </TabsContent>
            <TabsContent value="leaves">
                <LeaveRequestsTab />
            </TabsContent>
            <TabsContent value="users">
                <UserManagementTab />
            </TabsContent>
            <TabsContent value="offices">
                <OfficesTab />
            </TabsContent>
            <TabsContent value="documents">
                <DocumentsTab />
            </TabsContent>
            <TabsContent value="payroll">
                <PayrollTab />
            </TabsContent>
            <TabsContent value="analytics">
                <AnalyticsTab />
            </TabsContent>
        </div>
    </Tabs>
  );
}
