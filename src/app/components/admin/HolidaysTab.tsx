"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { holidays as initialHolidays } from "@/lib/data";
import { CalendarX2, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Holiday } from "@/lib/types";
import { format } from "date-fns";

export function HolidaysTab() {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [holidayName, setHolidayName] = useState("");
  const { toast } = useToast();

  const handleAddHoliday = () => {
    if (!selectedDate || !holidayName.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a date and enter a name for the holiday.",
      });
      return;
    }

    // Check if holiday already exists on that date
    if (holidays.some(h => h.date.getTime() === selectedDate.getTime())) {
        toast({
            variant: "destructive",
            title: "Holiday Exists",
            description: "A holiday has already been declared for this date.",
        });
        return;
    }

    const newHoliday: Holiday = {
      date: selectedDate,
      name: holidayName.trim(),
    };

    setHolidays(currentHolidays => [...currentHolidays, newHoliday].sort((a,b) => a.date.getTime() - b.date.getTime()));
    toast({
      title: "Holiday Added",
      description: `"${newHoliday.name}" on ${format(newHoliday.date, "PPP")} has been added.`,
    });

    // Reset form
    setSelectedDate(undefined);
    setHolidayName("");
  };

  const handleDeleteHoliday = (dateToDelete: Date) => {
    const holidayName = holidays.find(h => h.date.getTime() === dateToDelete.getTime())?.name;
    setHolidays(currentHolidays =>
      currentHolidays.filter(holiday => holiday.date.getTime() !== dateToDelete.getTime())
    );
    toast({
      title: "Holiday Deleted",
      description: `"${holidayName}" has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Declare New Holiday
          </CardTitle>
          <CardDescription>
            Select a date and add a new company-wide holiday.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Holiday Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="holiday-name">Holiday Name</Label>
            <Input
              id="holiday-name"
              placeholder="e.g. Founder's Day"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
            />
          </div>
          <Button onClick={handleAddHoliday} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Declare Holiday
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-bold flex items-center gap-2">
            <CalendarX2 className="w-6 h-6" />
            Declared Holidays
          </CardTitle>
          <CardDescription>
            List of all upcoming company holidays.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[450px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Holiday Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holidays.length > 0 ? (
                    holidays.map((holiday) => (
                    <TableRow key={holiday.date.toISOString()}>
                      <TableCell className="font-medium">
                        {format(holiday.date, "PPP")}
                      </TableCell>
                      <TableCell>{holiday.name}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteHoliday(holiday.date)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                            No holidays declared yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
