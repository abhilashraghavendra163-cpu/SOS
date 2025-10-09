"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { leaveRequests as initialLeaveRequests } from "@/lib/data";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LeaveRequestsTab() {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const { toast } = useToast();

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setLeaveRequests(currentRequests =>
      currentRequests.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    toast({
      title: `Leave Request ${newStatus}`,
      description: `The request has been updated.`,
    });
  };

  const pendingRequests = leaveRequests.filter(req => req.status === 'Pending');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Pending Leave Requests</CardTitle>
        <CardDescription>
          Approve or reject leave requests from users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[550px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.userName}
                    </TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {request.reason}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-600 hover:text-green-700 hover:bg-green-100"
                        onClick={() => handleAction(request.id, 'Approved')}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-100"
                        onClick={() => handleAction(request.id, 'Rejected')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No pending leave requests.
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
