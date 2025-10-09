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
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
      <Card className="w-full max-w-sm mx-4 animate-in fade-in-50 zoom-in-95 duration-500 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <AppIcon className="w-16 h-16" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight">
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