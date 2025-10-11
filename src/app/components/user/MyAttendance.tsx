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

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Late":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "In Progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse";
      case "On Leave":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-bold flex items-center gap-2">
          <CalendarDays className="w-6 h-6" />
          My Attendance History
        </CardTitle>
        <CardDescription>
          A summary of your attendance records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-22rem)]">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
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
                <TableRow key={record.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.punchIn}</TableCell>
                  <TableCell>{record.punchOut ?? "—"}</TableCell>
                  <TableCell>{record.hours}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={cn("text-xs font-semibold", getStatusClass(record.status))}
                      variant="outline"
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
