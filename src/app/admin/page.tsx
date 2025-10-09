import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarCheck, Users, Wallet } from "lucide-react";
import { AttendanceTab } from "../components/admin/AttendanceTab";
import { LeaveRequestsTab } from "../components/admin/LeaveRequestsTab";
import { UserManagementTab } from "../components/admin/UserManagementTab";
import { PayrollTab } from "../components/admin/PayrollTab";

export default function AdminDashboardPage() {
  return (
    <Tabs defaultValue="attendance" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
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
        <TabsTrigger value="payroll">
          <Wallet className="mr-2 h-4 w-4" />
          Payroll
        </TabsTrigger>
      </TabsList>
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
    </Tabs>
  );
}
