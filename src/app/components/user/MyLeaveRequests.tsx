"use client";

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
import { leaveRequests, currentUser } from "@/lib/data";
import { CalendarCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function MyLeaveRequests() {
  const userLeaveRequests = leaveRequests.filter(
    (request) => request.userId === currentUser.id
  );
  
  const getStatusClass = (status: string) => {
     switch (status) {
      case "Approved":
        return "bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 hover:bg-yellow-500/30";
      case "Rejected":
        return "bg-red-500/20 text-red-700 border-red-500/30 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30 hover:bg-gray-500/30";
    }
  }

  return (
    <Card className="h-full transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <CalendarCheck2 className="w-6 h-6" />
          My Leave Requests
        </CardTitle>
        <CardDescription>
          A history of your submitted leave requests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userLeaveRequests.length > 0 ? (
                userLeaveRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{request.date}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className={cn("text-xs font-semibold", getStatusClass(request.status))}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                   <TableCell colSpan={3} className="h-24 text-center">
                    No leave requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
