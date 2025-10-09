import { MyAttendance } from "../components/user/MyAttendance";
import { AttendanceCard } from "../components/user/AttendanceCard";
import { LeaveCard } from "../components/user/LeaveCard";
import { LocationCard } from "../components/user/LocationCard";

export default function UserDashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <AttendanceCard />
        <LeaveCard />
        <LocationCard />
      </div>
      <div className="lg:col-span-2">
        <MyAttendance />
      </div>
    </div>
  );
}
