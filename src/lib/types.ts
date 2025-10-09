export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  avatarUrl: string;
  hourlyRate?: number;
};

export type AttendanceRecord = {
  id: string;
  userId: string;
  userName: string;
  date: string;
  punchIn: string;
  punchOut: string | null;
  hours: string;
  status: 'Present' | 'On Leave' | 'Late' | 'In Progress';
  punchInLocation?: string | null;
  punchOutLocation?: string | null;
  punchInPhoto?: string | null;
  punchOutPhoto?: string | null;
};

export type LeaveRequest = {
  id: string;
  userId: string;
  userName: string;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type Payroll = {
  id: string;
  userId: string;
  userName: string;
  totalHours: number;
  hourlyRate: number;
  totalPay: number;
};

export type Notification = {
    id: string;
    userId: string;
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
};

export type UserDocument = {
  id: string;
  userId: string;
  userName: string;
  documentType: 'PAN' | 'Aadhar' | 'Bank Statement';
  fileName: string;
  fileUrl: string; // In a real app, this would be a secure URL from a storage service
  uploadedAt: string;
};
