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
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { users as initialUsers } from "@/lib/data";
import { UserPlus, FilePen, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";

export function UserManagementTab() {
  const [users, setUsers] = useState<User[]>(initialUsers);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">User Management</CardTitle>
        <CardDescription>Add, edit, or remove users.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-headline">Add New User</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new user account.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="e.g. John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="e.g. john@example.com" />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                  <Input id="hourly-rate" type="number" placeholder="e.g. 25" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddUser}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
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
                       <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="font-headline">Edit User</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name-edit">Full Name</Label>
                              <Input id="name-edit" defaultValue={user.name} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email-edit">Email</Label>
                              <Input id="email-edit" type="email" defaultValue={user.email} />
                            </div>
                             <div className="grid gap-2">
                              <Label htmlFor="hourly-rate-edit">Hourly Rate ($)</Label>
                              <Input id="hourly-rate-edit" type="number" defaultValue={user.hourlyRate?.toString()} />
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
