"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, Hourglass, CircleDollarSign } from "lucide-react";
import { payrollData, currentUser } from "@/lib/data";

export function MyPayrollCard() {
  const userPayroll = payrollData.find(p => p.userId === currentUser.id);

  if (!userPayroll) {
    return (
      <Card className="w-full transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold flex items-center gap-2">
            <Wallet className="w-6 h-6" />
            My Payroll Summary
          </CardTitle>
          <CardDescription>Your current payroll information.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No payroll data available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
     <Card className="w-full transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-bold flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          My Payroll Summary
        </CardTitle>
        <CardDescription>Your current payroll information for this period.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 transition-transform duration-200 hover:scale-105">
            <div className="flex items-center gap-3">
                <Hourglass className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Total Hours Worked</span>
            </div>
            <span className="font-bold text-lg">{userPayroll.totalHours.toFixed(2)}h</span>
        </div>
         <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 transition-transform duration-200 hover:scale-105">
            <div className="flex items-center gap-3">
                <CircleDollarSign className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Monthly Salary</span>
            </div>
            <span className="font-bold text-lg">₹{userPayroll.monthlySalary.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border border-primary/20 transition-transform duration-200 hover:scale-105">
            <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">Total Earnings</span>
            </div>
            <span className="font-bold text-xl text-primary">₹{userPayroll.totalPay.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
