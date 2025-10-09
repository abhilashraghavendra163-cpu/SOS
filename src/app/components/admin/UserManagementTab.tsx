
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
import { Badge } from "@/components/ui/badge";
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
import { users as initialUsers, notifications as initialNotifications, offices } from "@/lib/data";
import { UserPlus, FilePen, Trash2, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User, Notification } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export function UserManagementTab() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const { toast } = useToast();

  const handleAddUser = () => {
    // Logic to add user would go here
    toast({ title: "User Added", description: "New user has been created successfully." });
  };
  
  const handleEditUser = () => {
     // Logic to edit user would go here
    toast({ title: "User Updated", description: "User details have been updated." });
  };
  
  const handleDeleteUser = (userId: string) => {
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
    toast({ title: "User Deleted", description: "The user has been removed.", variant: "destructive" });
  };

  const handleSendAnnouncement = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    if (!title || !message) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please provide both a title and a message.",
      });
      return;
    }

    const newNotifications: Notification[] = users.map(user => ({
      id: `n${Date.now()}-${user.id}`,
      userId: user.id,
      title: title,
      description: message,
      timestamp: 'Just now',
      read: false,
    }));
    
    // This is a mock implementation. In a real app, you'd send this to a backend.
    setNotifications(currentNotifications => [...currentNotifications, ...newNotifications]);
    
    console.log("New notifications added:", newNotifications);

    toast({
      title: "Announcement Sent",
      description: "Your announcement has been sent to all users.",
    });

    // Close the dialog
    const closeButton = form.closest('div[role="dialog"]')?.querySelector('button[aria-label="Close"]');
    if (closeButton instanceof HTMLElement) {
      closeButton.click();
    }
  };
  
  const getOfficeDisplay = (officeId?: string) => {
    if (!officeId) return 'N/A';
    const office = offices.find(o => o.id === officeId);
    if (!office) return 'N/A';
    return (
      <div className="flex flex-col">
        <span className="font-medium">{office.name}</span>
        <span className="text-xs text-muted-foreground">
          ({office.latitude.toFixed(4)}, {office.longitude.toFixed(4)})
        </span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">User Management</CardTitle>
        <CardDescription>Add, edit, or remove users, and send announcements.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end gap-2 mb-4">
           <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Megaphone className="mr-2 h-4 w-4" />
                Send Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSendAnnouncement}>
                <DialogHeader>
                  <DialogTitle className="font-bold">Send Announcement</DialogTitle>
                  <DialogDescription>
                    This message will be sent as a notification to all users.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g. Holiday Announcement" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="e.g. The office will be closed on Monday." />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send to All Users</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-bold">Add New User</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new user account.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="e.g. John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="e.g. john@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input id="mobileNumber" placeholder="e.g. 987-654-3210" />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                  <Input id="hourly-rate" type="number" placeholder="e.g. 25" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="accountNumber">Bank Account Number</Label>
                  <Input id="accountNumber" placeholder="e.g. 1234567890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input id="ifscCode" placeholder="e.g. BANK0001234" />
                </div>
                 <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="officeId">Assign Office</Label>
                    <Select name="officeId">
                        <SelectTrigger>
                            <SelectValue placeholder="Select an office" />
                        </SelectTrigger>
                        <SelectContent>
                            {offices.map(office => (
                                <SelectItem key={office.id} value={office.id}>
                                    {office.name} ({office.latitude.toFixed(2)}, {office.longitude.toFixed(2)})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddUser}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[550px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Office</TableHead>
                <TableHead>Bank Details</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span>{user.email}</span>
                        <span className="text-xs text-muted-foreground">{user.mobileNumber}</span>
                    </div>
                  </TableCell>
                   <TableCell>{getOfficeDisplay(user.officeId)}</TableCell>
                   <TableCell>
                     <div className="flex flex-col">
                        <span className="text-sm">{user.accountNumber ?? 'N/A'}</span>
                        <span className="text-xs text-muted-foreground">{user.ifscCode ?? 'N/A'}</span>
                    </div>
                   </TableCell>
                   <TableCell>${user.hourlyRate?.toFixed(2) ?? 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                       <DialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <FilePen className="h-4 w-4" />
                         </Button>
                       </DialogTrigger>
                       <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="font-bold">Edit User</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name-edit">Full Name</Label>
                              <Input id="name-edit" defaultValue={user.name} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email-edit">Email</Label>
                              <Input id="email-edit" type="email" defaultValue={user.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="mobileNumber-edit">Mobile Number</Label>
                                <Input id="mobileNumber-edit" defaultValue={user.mobileNumber} />
                            </div>
                             <div className="grid gap-2">
                              <Label htmlFor="hourly-rate-edit">Hourly Rate ($)</Label>
                              <Input id="hourly-rate-edit" type="number" defaultValue={user.hourlyRate?.toString() ?? ''} />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="accountNumber-edit">Bank Account Number</Label>
                                <Input id="accountNumber-edit" defaultValue={user.accountNumber} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ifscCode-edit">IFSC Code</Label>
                                <Input id="ifscCode-edit" defaultValue={user.ifscCode} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="officeId-edit">Assign Office</Label>
                                <Select name="officeId-edit" defaultValue={user.officeId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an office" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {offices.map(office => (
                                            <SelectItem key={office.id} value={office.id}>
                                                {office.name} ({office.latitude.toFixed(2)}, {office.longitude.toFixed(2)})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleEditUser}>Save Changes</Button>
                          </DialogFooter>
                       </DialogContent>
                    </Dialog>
                    
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
                            This action cannot be undone. This will permanently delete the user account for {user.name}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
