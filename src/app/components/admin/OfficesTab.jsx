"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { offices as initialOffices } from "@/lib/data";
import { Building, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function OfficesTab() {
  const [offices, setOffices] = useState(initialOffices);
  const [isAddOfficeOpen, setIsAddOfficeOpen] = useState(false);
  const { toast } = useToast();

  const handleAddOffice = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem('name')).value;
    const latitude = (form.elements.namedItem('latitude')).value;
    const longitude = (form.elements.namedItem('longitude')).value;

    if (!name || !latitude || !longitude) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill out all office details.",
      });
      return;
    }

    const newOffice = {
      id: `office${Date.now()}`,
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    setOffices(currentOffices => [...currentOffices, newOffice]);
    toast({ title: "Office Added", description: `"${name}" has been added.` });
    setIsAddOfficeOpen(false);
  };

  const handleDeleteOffice = (officeId) => {
    const officeName = offices.find(o => o.id === officeId)?.name;
    setOffices(currentOffices => currentOffices.filter(office => office.id !== officeId));
    toast({
      title: "Office Deleted",
      description: `"${officeName}" has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold flex items-center gap-2">
          <Building className="w-6 h-6" />
          Manage Offices
        </CardTitle>
        <CardDescription>
          Add, edit, or remove office locations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={isAddOfficeOpen} onOpenChange={setIsAddOfficeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Office
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddOffice}>
                <DialogHeader>
                  <DialogTitle className="font-bold">Add New Office</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new office location.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Office Name</Label>
                    <Input id="name" name="name" placeholder="e.g. Main Headquarters" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input id="latitude" name="latitude" type="number" step="any" placeholder="e.g. 34.0522" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input id="longitude" name="longitude" type="number" step="any" placeholder="e.g. -118.2437" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Office</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Office Name</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offices.map((office) => (
                <TableRow key={office.id}>
                  <TableCell className="font-medium">{office.name}</TableCell>
                  <TableCell>{office.latitude.toFixed(6)}</TableCell>
                  <TableCell>{office.longitude.toFixed(6)}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the office "{office.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteOffice(office.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
