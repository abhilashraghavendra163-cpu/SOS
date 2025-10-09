import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { attendanceRecords, currentUser } from "@/lib/data";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export function MyAttendance() {
  const userAttendance = attendanceRecords.filter(
    (record) => record.userId === currentUser.id
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Present":
        return "default";
      case "On Leave":
        return "secondary";
      case "Late":
        return "destructive";
      case "In Progress":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <CalendarDays className="w-6 h-6" />
          My Attendance
        </CardTitle>
        <CardDescription>
          A summary of your attendance records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[480px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Punch In</TableHead>
                <TableHead>Punch Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.punchIn}</TableCell>
                  <TableCell>{record.punchOut ?? "-"}</TableCell>
                  <TableCell>{record.hours}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={getStatusVariant(record.status)}
                      className={cn("text-xs", {
                          "bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30": record.status === 'Present',
                          "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 hover:bg-yellow-500/30": record.status === 'Late',
                          "bg-blue-500/20 text-blue-700 border-blue-500/30 hover:bg-blue-500/30": record.status === 'In Progress',
                          "bg-gray-500/20 text-gray-700 border-gray-500/30 hover:bg-gray-500/30": record.status === 'On Leave'
                      })}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
