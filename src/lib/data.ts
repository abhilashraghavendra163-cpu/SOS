import type { User, AttendanceRecord, LeaveRequest } from './types';

export const users: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', role: 'User', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
  { id: '2', name: 'Maria Garcia', email: 'maria.g@example.com', role: 'User', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
  { id: '3', name: 'James Smith', email: 'james.s@example.com', role: 'User', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
  { id: '4', name: 'Priya Patel', email: 'priya.p@example.com', role: 'Admin', avatarUrl: 'https://picsum.photos/seed/admin1/100/100' },
  { id: '5', name: 'Chen Wei', email: 'chen.w@example.com', role: 'User', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
];

export const currentUser: User = users[0];
export const adminUser: User = users[3];


export const attendanceRecords: AttendanceRecord[] = [
  { id: 'a1', userId: '1', userName: 'Alex Johnson', date: '2024-07-28', punchIn: '09:05', punchOut: '17:30', hours: '8h 25m', status: 'Present' },
  { id: 'a2', userId: '1', userName: 'Alex Johnson', date: '2024-07-27', punchIn: '09:00', punchOut: '17:00', hours: '8h 0m', status: 'Present' },
  { id: 'a3', userId: '1', userName: 'Alex Johnson', date: '2024-07-26', punchIn: 'N/A', punchOut: 'N/A', hours: '0h 0m', status: 'On Leave' },
  { id: 'a4', userId: '2', userName: 'Maria Garcia', date: '2024-07-28', punchIn: '08:45', punchOut: '17:15', hours: '8h 30m', status: 'Present' },
  { id: 'a5', userId: '3', userName: 'James Smith', date: '2024-07-28', punchIn: '09:15', punchOut: '17:00', hours: '7h 45m', status: 'Late' },
  { id: 'a6', userId: '5', userName: 'Chen Wei', date: '2024-07-28', punchIn: '09:00', punchOut: null, hours: '-', status: 'In Progress' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'l1', userId: '2', userName: 'Maria Garcia', date: '2024-08-05', reason: 'Family event.', status: 'Pending' },
  { id: 'l2', userId: '3', userName: 'James Smith', date: '2024-08-10', reason: 'Medical appointment.', status: 'Pending' },
  { id: 'l3', userId: '5', userName: 'Chen Wei', date: '2024-07-30', reason: 'Personal reasons.', status: 'Approved' },
  { id: 'l4', userId: '1', userName: 'Alex Johnson', date: '2024-07-26', reason: 'Vacation', status: 'Approved' },
];
