import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { AppIcon } from "./components/AppIcon";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm mx-4 animate-in fade-in-50 zoom-in-95 duration-500">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <AppIcon className="w-16 h-16" />
          </div>
          <CardTitle className="text-4xl font-headline tracking-tight">
            AttendEase
          </CardTitle>
          <CardDescription className="pt-1">
            Your friendly attendance tracking app.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild size="lg" className="font-bold">
            <Link href="/dashboard">
              <LogIn className="mr-2 h-5 w-5" /> Login as User
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="font-bold">
            <Link href="/admin">
              <LogIn className="mr-2 h-5 w-5" /> Login as Admin
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
