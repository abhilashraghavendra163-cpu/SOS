import { MyAttendance } from "../components/user/MyAttendance";
import { AttendanceCard } from "../components/user/AttendanceCard";
import { LeaveCard } from "../components/user/LeaveCard";
import { LocationCard } from "../components/user/LocationCard";
import { StatCard } from "../components/user/StatCard";
import { MyPayrollCard } from "../components/user/MyPayrollCard";
import { MyLeaveRequests } from "../components/user/MyLeaveRequests";
import { attendanceRecords, currentUser } from "@/lib/data";
import { MyDocumentsCard } from "../components/user/MyDocumentsCard";
import { PayslipsCard } from "../components/user/PayslipsCard";

export default function UserDashboardPage() {
  const userAttendance = attendanceRecords.filter(
    (record) => record.userId === currentUser.id
  );
  const presentAndLate = userAttendance.filter(
    (r) => r.status === "Present" || r.status === "Late"
  );
  const presentDays = presentAndLate.length;
  
  const onTimeDays = userAttendance.filter(
    (r) => r.status === "Present"
  ).length;

  const onTimePercentage = presentDays > 0 ? Math.round((onTimeDays / presentDays) * 100) : 0;
  
  const leaveDays = userAttendance.filter(
    (r) => r.status === "On Leave"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Present Days"
          value={presentDays}
          iconName="CheckCircle"
          color="text-green-500"
        />
        <StatCard
          title="On-Time Percentage"
          value={`${onTimePercentage}%`}
          iconName="Clock"
          color="text-blue-500"
        />
        <StatCard
          title="Total Leaves Taken"
          value={leaveDays}
          iconName="XCircle"
          color="text-red-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AttendanceCard />
        <div className="flex flex-col gap-6">
            <LeaveCard />
            <MyLeaveRequests />
        </div>
        <div className="flex flex-col gap-6">
          <MyPayrollCard />
          <PayslipsCard />
        </div>
        <div className="flex flex-col gap-6">
          <MyDocumentsCard />
        </div>
         <LocationCard />
      </div>
      <div>
        <MyAttendance />
      </div>
    </div>
  );
}
