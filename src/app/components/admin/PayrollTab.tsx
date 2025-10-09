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
import { payrollData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PayrollTab() {
    const { toast } = useToast();

    const handleGenerateReport = () => {
        toast({
        title: "Payroll Report Generated",
        description: "Payroll report has been successfully downloaded.",
        });
    };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline">Payroll Overview</CardTitle>
            <CardDescription>
              View and manage payroll for all users.
            </CardDescription>
          </div>
          <Button onClick={handleGenerateReport}>
            <FileDown className="mr-2 h-4 w-4" />
            Generate Payroll Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[550px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead className="text-right">Total Pay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell className="font-medium">{payroll.userName}</TableCell>
                  <TableCell>{payroll.totalHours.toFixed(2)}</TableCell>
                  <TableCell>${payroll.hourlyRate.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${payroll.totalPay.toFixed(2)}
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
