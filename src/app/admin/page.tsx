import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarCheck, Users, Wallet, BarChart3 } from "lucide-react";
import { AttendanceTab } from "../components/admin/AttendanceTab";
import { LeaveRequestsTab } from "../components/admin/LeaveRequestsTab";
import { UserManagementTab } from "../components/admin/UserManagementTab";
import { PayrollTab } from "../components/admin/PayrollTab";
import { AnalyticsTab } from "../components/admin/AnalyticsTab";

export default function AdminDashboardPage() {
  return (
    <Tabs defaultValue="attendance" className="w-full" orientation="vertical">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-1">
          <TabsList className="grid w-full grid-cols-1 h-full">
            <TabsTrigger value="attendance" className="justify-start">
              <CalendarDays className="mr-2 h-4 w-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="leaves" className="justify-start">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Leave Requests
            </TabsTrigger>
            <TabsTrigger value="users" className="justify-start">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="payroll" className="justify-start">
              <Wallet className="mr-2 h-4 w-4" />
              Payroll
            </TabsTrigger>
            <TabsTrigger value="analytics" className="justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="md:col-span-4">
          <TabsContent value="attendance">
            <AttendanceTab />
          </TabsContent>
          <TabsContent value="leaves">
            <LeaveRequestsTab />
          </TabsContent>
          <TabsContent value="users">
            <UserManagementTab />
          </TabsContent>
          <TabsContent value="payroll">
            <PayrollTab />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
