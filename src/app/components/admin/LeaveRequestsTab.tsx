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
import { Button } from "@/components/ui/button";
import { leaveRequests as initialLeaveRequests } from "@/lib/data";
import { Check, X, Sparkles, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { summarizeLeaveRequest } from "@/ai/flows/summarize-leave-request-flow";

export function LeaveRequestsTab() {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const { toast } = useToast();
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loadingSummary, setLoadingSummary] = useState<string | null>(null);

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

  const handleSummarize = async (requestId: string, reason: string) => {
    if (summaries[requestId]) return;

    setLoadingSummary(requestId);
    try {
      const result = await summarizeLeaveRequest({ reason });
      setSummaries(prev => ({ ...prev, [requestId]: result.summary }));
    } catch (error) {
      console.error("Failed to get summary:", error);
      toast({
        variant: "destructive",
        title: "AI Summary Failed",
        description: "Could not generate a summary for this reason.",
      });
    } finally {
      setLoadingSummary(null);
    }
  };

  const pendingRequests = leaveRequests.filter(req => req.status === 'Pending');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Pending Leave Requests</CardTitle>
        <CardDescription>
          Approve or reject leave requests. Use the ✨ icon for an AI-powered summary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
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
                  <TableRow key={request.id} className="transition-colors hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {request.userName}
                    </TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell className="max-w-[300px] flex items-center gap-2">
                       <span className="truncate">{request.reason}</span>
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-primary hover:bg-primary/10 h-8 w-8 shrink-0"
                              onClick={() => handleSummarize(request.id, request.reason)}
                              disabled={loadingSummary === request.id}
                              aria-label="Summarize Reason"
                            >
                            {loadingSummary === request.id ? (
                                <Loader className="animate-spin h-4 w-4" />
                            ) : (
                                <Sparkles className="h-4 w-4" />
                            )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 text-sm">
                            <p className="font-medium mb-2">AI Summary</p>
                            <p>{summaries[request.id] || 'Click the ✨ button to generate a summary.'}</p>
                        </PopoverContent>
                        </Popover>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-500 hover:text-green-600 hover:bg-green-500/10 rounded-full"
                        onClick={() => handleAction(request.id, 'Approved')}
                      >
                        <Check className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-full"
                        onClick={() => handleAction(request.id, 'Rejected')}
                      >
                        <X className="h-5 w-5" />
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
        </div>
      </CardContent>
    </Card>
  );
}