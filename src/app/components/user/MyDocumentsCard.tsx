"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Save } from "lucide-react";

export function MyDocumentsCard() {
  const { toast } = useToast();

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Documents Saved",
      description: "Your personal documents have been securely updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold flex items-center gap-2">
          <FileText className="w-6 h-6" />
          My Documents
        </CardTitle>
        <CardDescription>
          Manage your personal and bank account details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input id="pan" placeholder="ABCDE1234F" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aadhar">Aadhar Number</Label>
            <Input id="aadhar" placeholder="1234 5678 9012" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank-account">Bank Account Number</Label>
            <Input id="bank-account" placeholder="0123456789" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="bank-ifsc">IFSC Code</Label>
            <Input id="bank-ifsc" placeholder="ABCD0123456" />
          </div>
          <Button type="submit" className="w-full font-bold">
            <Save className="mr-2 h-4 w-4" />
            Save Documents
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
