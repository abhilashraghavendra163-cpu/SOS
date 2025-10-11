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
import { FileText, Upload, Paperclip } from "lucide-react";
import { useState } from "react";

const documentTypes = [
  { id: 'pan', label: 'PAN Card' },
  { id: 'aadhar', label: 'Aadhar Card' },
  { id: 'bank', label: 'Bank Statement/Passbook' },
];

export function MyDocumentsCard() {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState({
    pan: null,
    aadhar: null,
    bank: null,
  });

  const handleFileChange = (event, docId) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [docId]: file }));
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    // In a real app, you would upload files to a backend service like Firebase Storage.
    console.log("Uploading files:", uploadedFiles);
    toast({
      title: "Documents Uploaded",
      description: "Your documents have been securely uploaded for verification.",
    });
  };

  return (
    <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-bold flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Upload Documents
        </CardTitle>
        <CardDescription>
          Upload your personal documents for verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-6">
          {documentTypes.map(doc => (
            <div key={doc.id} className="space-y-2 p-3 rounded-lg transition-transform duration-200 hover:scale-105 hover:bg-muted/50">
              <Label htmlFor={doc.id}>{doc.label}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id={doc.id}
                  type="file"
                  onChange={(e) => handleFileChange(e, doc.id)}
                  className="hidden"
                />
                <Label htmlFor={doc.id} className="flex-1">
                  <Button asChild variant="outline" className="w-full justify-start cursor-pointer">
                    <div>
                      <Paperclip className="mr-2 h-4 w-4" />
                      {uploadedFiles[doc.id] ? (
                        <span className="truncate">{uploadedFiles[doc.id]?.name}</span>
                      ) : (
                        'Choose a file...'
                      )}
                    </div>
                  </Button>
                </Label>
              </div>
            </div>
          ))}
          <Button type="submit" className="w-full font-bold">
            <Upload className="mr-2 h-4 w-4" />
            Upload All Documents
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
