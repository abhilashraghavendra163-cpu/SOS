

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
import { payrollData, users } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PayrollTab() {
    const { toast } = useToast();

    const handleGenerateReport = () => {
        // 1. Create CSV header
        const csvHeader = "User Name,Email,Mobile Number,Account Number,IFSC Code,Total Hours,Monthly Salary (₹),Total Pay (₹)\n";

        // 2. Create a map of users for quick lookup
        const userMap = new Map(users.map(user => [user.id, user]));

        // 3. Create CSV rows from payroll data
        const csvRows = payrollData.map(p => {
            const user = userMap.get(p.userId);
            const email = user?.email ?? 'N/A';
            const mobile = user?.mobileNumber ?? 'N/A';
            const account = user?.accountNumber ?? 'N/A';
            const ifsc = user?.ifscCode ?? 'N/A';

            return `"${p.userName}",${email},${mobile},${account},${ifsc},${p.totalHours.toFixed(2)},${p.monthlySalary.toFixed(2)},${p.totalPay.toFixed(2)}`;
        }).join("\n");


        // 4. Combine header and rows
        const csvContent = csvHeader + csvRows;

        // 5. Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // 6. Create a temporary link to trigger the download
        const link = document.createElement("a");
        link.setAttribute("href", url);
        const reportDate = new Date().toISOString().split('T')[0];
        link.setAttribute("download", `payroll-report-${reportDate}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        
        // 7. Click the link and clean up
        link.click();
        document.body.removeChild(link);
        
        toast({
            title: "Payroll Report Generated",
            description: "Your payroll report has been successfully downloaded.",
        });
    };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-bold">Payroll Overview</CardTitle>
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
                <TableHead>Monthly Salary</TableHead>
                <TableHead className="text-right">Total Pay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell className="font-medium">{payroll.userName}</TableCell>
                  <TableCell>{payroll.totalHours.toFixed(2)}</TableCell>
                  <TableCell>₹{payroll.monthlySalary.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{payroll.totalPay.toFixed(2)}
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
