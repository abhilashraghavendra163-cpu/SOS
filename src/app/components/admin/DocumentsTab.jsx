"use client";

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
import { Badge } from "@/components/ui/badge";
import { Download, FileArchive } from "lucide-react";
import { userDocuments } from "@/lib/data";

export function DocumentsTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-bold flex items-center gap-2">
              <FileArchive className="w-6 h-6" />
              User Documents
            </CardTitle>
            <CardDescription>
              Access and manage documents uploaded by users.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Document Type</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Uploaded At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userDocuments.length > 0 ? (
                userDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.userName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{doc.documentType}</Badge>
                    </TableCell>
                    <TableCell>{doc.fileName}</TableCell>
                    <TableCell>{doc.uploadedAt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={doc.fileUrl} download={doc.fileName}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No documents uploaded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
