"use client";

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { attendanceRecords, users } from "@/lib/data";
import { FileDown, Filter, Calendar as CalendarIcon, MapPin, Camera } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function AttendanceTab() {
  const [date, setDate] = useState<DateRange | undefined>();
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Attendance report has been successfully downloaded.",
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Late": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "In Progress": return "bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse";
      case "On Leave": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };
  
  const PhotoThumbnail = ({ src, alt }: { src: string, alt: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-primary hover:underline">
          <Camera className="h-4 w-4" />
          View
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{alt}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
            <Image src={src} alt={alt} width={600} height={450} className="rounded-md object-cover" data-ai-hint="person face" />
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">All Attendance Records</CardTitle>
        <CardDescription>
          View, filter, and manage attendance for all users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Filters:</span>
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full sm:w-auto md:w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={handleGenerateReport}
            className="w-full sm:w-auto sm:ml-auto"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Punch In</TableHead>
                <TableHead>In Photo</TableHead>
                <TableHead>In Location</TableHead>
                <TableHead>Punch Out</TableHead>
                <TableHead>Out Photo</TableHead>
                <TableHead>Out Location</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.map((record) => (
                <TableRow key={record.id} className="transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium whitespace-nowrap">{record.userName}</TableCell>
                  <TableCell className="whitespace-nowrap">{record.date}</TableCell>
                  <TableCell>{record.punchIn}</TableCell>
                  <TableCell>
                    {record.punchInPhoto ? (
                      <PhotoThumbnail src={record.punchInPhoto} alt={`Punch-in photo for ${record.userName} on ${record.date}`} />
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {record.punchInLocation ? (
                      <Link href={`https://www.google.com/maps/search/?api=1&query=${record.punchInLocation}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <MapPin className="h-4 w-4" />
                        View
                      </Link>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{record.punchOut ?? "—"}</TableCell>
                    <TableCell>
                    {record.punchOutPhoto ? (
                       <PhotoThumbnail src={record.punchOutPhoto} alt={`Punch-out photo for ${record.userName} on ${record.date}`} />
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {record.punchOutLocation ? (
                      <Link href={`https://www.google.com/maps/search/?api=1&query=${record.punchOutLocation}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <MapPin className="h-4 w-4" />
                        View
                      </Link>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{record.hours}</TableCell>
                  <TableCell className="text-right">
                     <Badge
                      className={cn("text-xs font-semibold whitespace-nowrap", getStatusClass(record.status))}
                      variant="outline"
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
