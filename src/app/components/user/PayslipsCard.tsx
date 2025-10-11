"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, FileDown } from "lucide-react";

const payslips = [
  { id: "ps1", month: "June 2024" },
  { id: "ps2", month: "May 2024" },
  { id: "ps3", month: "April 2024" },
];

export function PayslipsCard() {
  const { toast } = useToast();

  const handleDownload = (month: string) => {
    toast({
      title: "Payslip Downloading",
      description: `Your payslip for ${month} has started downloading.`,
    });
  };

  return (
    <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-bold flex items-center gap-2">
          <FileDown className="w-6 h-6" />
          Download Payslips
        </CardTitle>
        <CardDescription>Download your monthly payslips.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {payslips.map((payslip) => (
          <div
            key={payslip.id}
            className="flex justify-between items-center p-3 rounded-lg bg-muted/50 transition-transform duration-200 hover:scale-105"
          >
            <span className="font-medium">{payslip.month}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(payslip.month)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
