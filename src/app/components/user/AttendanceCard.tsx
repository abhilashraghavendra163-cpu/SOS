"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, TimerOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AttendanceCard() {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPunchedIn) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPunchedIn]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handlePunch = () => {
    const newPunchedInState = !isPunchedIn;
    setIsPunchedIn(newPunchedInState);
    toast({
      title: `Successfully Punched ${newPunchedInState ? "In" : "Out"}!`,
      description: `Your attendance has been recorded at ${new Date().toLocaleTimeString()}.`,
      variant: "default",
    });
  };

  return (
    <Card className="w-full transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Attendance
        </CardTitle>
        <CardDescription>Punch in to start your work day.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className={`text-6xl font-bold font-mono ${
            isPunchedIn ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {formatTime(timer)}
        </div>
        <div
          className={`flex items-center gap-2 font-semibold ${
            isPunchedIn ? "text-green-600" : "text-amber-600"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              isPunchedIn ? "bg-green-500 animate-pulse" : "bg-amber-500"
            }`}
          />
          {isPunchedIn ? "You are punched in" : "You are punched out"}
        </div>
        <Button
          onClick={handlePunch}
          size="lg"
          className="w-full font-bold text-lg mt-2"
          variant={isPunchedIn ? "destructive" : "default"}
        >
          {isPunchedIn ? (
            <>
              <TimerOff className="mr-2 h-5 w-5" />
              Punch Out
            </>
          ) : (
            <>
              <Clock className="mr-2 h-5 w-5" />
              Punch In
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
