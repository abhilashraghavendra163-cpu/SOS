import { MyAttendance } from "../components/user/MyAttendance";
import { AttendanceCard } from "../components/user/AttendanceCard";
import { LeaveCard } from "../components/user/LeaveCard";
import { LocationCard } from "../components/user/LocationCard";
import { StatCard } from "../components/user/StatCard";
import { MyPayrollCard } from "../components/user/MyPayrollCard";
import { MyLeaveRequests } from "../components/user/MyLeaveRequests";
import { attendanceRecords, currentUser } from "@/lib/data";

export default function UserDashboardPage() {
  const userAttendance = attendanceRecords.filter(
    (record) => record.userId === currentUser.id
  );
  const presentDays = userAttendance.filter(
    (r) => r.status === "Present" || r.status === "Late"
  ).length;
  const leaveDays = userAttendance.filter(
    (r) => r.status === "On Leave"
  ).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <MyAttendance />
      </div>
      <div className="lg:col-span-1 flex flex-col gap-6">
        <AttendanceCard />
        <MyPayrollCard />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard
            title="Present Days"
            value={presentDays}
            icon="Check"
            color="text-green-500"
          />
          <StatCard
            title="Leaves Taken"
            value={leaveDays}
            icon="X"
            color="text-red-500"
          />
        </div>
        <LeaveCard />
        <MyLeaveRequests />
        <LocationCard />
      </div>
    </div>
  );
}
