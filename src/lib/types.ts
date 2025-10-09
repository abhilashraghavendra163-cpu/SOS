export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  avatarUrl: string;
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
};

export type LeaveRequest = {
  id: string;
  userId: string;
  userName: string;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};
