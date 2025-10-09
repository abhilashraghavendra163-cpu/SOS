import type { User, AttendanceRecord, LeaveRequest, Payroll, Notification, UserDocument, Office } from './types';

export const offices: Office[] = Array.from({ length: 24 }, (_, i) => ({
  id: `office${i + 1}`,
  name: `Office Branch ${i + 1}`,
  // Placeholder coordinates - spread around a central point for variety
  latitude: 34.0522 + (Math.random() - 0.5) * 0.1 * (i + 1),
  longitude: -118.2437 + (Math.random() - 0.5) * 0.1 * (i + 1),
}));


export const users: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', role: 'User', avatarUrl: 'https://picsum.photos/seed/user1/100/100', hourlyRate: 25, officeId: 'office1', mobileNumber: '123-456-7890', accountNumber: '1234567890', ifscCode: 'ABC0000123' },
  { id: '2', name: 'Maria Garcia', email: 'maria.g@example.com', role: 'User', avatarUrl: 'https://picsum.photos/seed/user2/100/100', hourlyRate: 22, officeId: 'office2', mobileNumber: '234-567-8901', accountNumber: '0987654321', ifscCode: 'DEF0000456' },
  { id: '3', name: 'James Smith', email: 'james.s@example.com', role: 'User', avatarUrl: 'https://picsum.photos/seed/user3/100/100', hourlyRate: 30, officeId: 'office3', mobileNumber: '345-678-9012', accountNumber: '1122334455', ifscCode: 'GHI0000789' },
  { id: '4', name: 'Priya Patel', email: 'priya.p@example.com', role: 'Admin', avatarUrl: 'https://picsum.photos/seed/admin1/100/100', hourlyRate: 50, mobileNumber: '456-789-0123' },
  { id: '5', name: 'Chen Wei', email: 'chen.w@example.com', role: 'User', avatarUrl: 'https://picsum.photos/seed/user4/100/100', hourlyRate: 28, officeId: 'office4', mobileNumber: '567-890-1234', accountNumber: '5566778899', ifscCode: 'JKL0000101' },
  // Add more users and assign them to offices
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `${i + 6}`,
    name: `User ${i + 6}`,
    email: `user${i + 6}@example.com`,
    role: 'User' as const,
    avatarUrl: `https://picsum.photos/seed/user${i + 6}/100/100`,
    hourlyRate: 20 + i,
    officeId: `office${i + 5}`,
    mobileNumber: `555-555-${5000 + i}`,
    accountNumber: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    ifscCode: `XYZ000${1000 + i}`
  }))
];

export const currentUser: User = users[0];
export const adminUser: User = users[3];


export const attendanceRecords: AttendanceRecord[] = [
  { id: 'a1', userId: '1', userName: 'Alex Johnson', date: '2024-07-28', punchIn: '09:05', punchOut: '17:30', hours: '8.42', status: 'Present', punchInLocation: '34.0522,-118.2437', punchOutLocation: '34.0522,-118.2437', punchInPhoto: 'https://picsum.photos/seed/punch1/200/150', punchOutPhoto: 'https://picsum.photos/seed/punch2/200/150' },
  { id: 'a2', userId: '1', userName: 'Alex Johnson', date: '2024-07-27', punchIn: '09:00', punchOut: '17:00', hours: '8.00', status: 'Present', punchInLocation: '34.0522,-118.2437', punchOutLocation: '34.0522,-118.2437', punchInPhoto: 'https://picsum.photos/seed/punch3/200/150', punchOutPhoto: 'https://picsum.photos/seed/punch4/200/150' },
  { id: 'a3', userId: '1', userName: 'Alex Johnson', date: '2024-07-26', punchIn: 'N/A', punchOut: 'N/A', hours: '0', status: 'On Leave' },
  { id: 'a4', userId: '2', userName: 'Maria Garcia', date: '2024-07-28', punchIn: '08:45', punchOut: '17:15', hours: '8.50', status: 'Present', punchInLocation: '40.7128,-74.0060', punchOutLocation: '40.7128,-74.0060', punchInPhoto: 'https://picsum.photos/seed/punch5/200/150', punchOutPhoto: 'https://picsum.photos/seed/punch6/200/150' },
  { id: 'a5', userId: '3', userName: 'James Smith', date: '2024-07-28', punchIn: '09:15', punchOut: '17:00', hours: '7.75', status: 'Late', punchInLocation: '51.5074,-0.1278', punchOutLocation: '51.5074,-0.1278', punchInPhoto: 'https://picsum.photos/seed/punch7/200/150', punchOutPhoto: 'https://picsum.photos/seed/punch8/200/150' },
  { id: 'a6', userId: '5', userName: 'Chen Wei', date: '2024-07-28', punchIn: '09:00', punchOut: null, hours: '0', status: 'In Progress', punchInLocation: '35.6895,139.6917', punchInPhoto: 'https://picsum.photos/seed/punch9/200/150' },
  { id: 'a7', userId: '2', userName: 'Maria Garcia', date: '2024-07-27', punchIn: '08:50', punchOut: '17:05', hours: '8.25', status: 'Present', punchInLocation: '40.7128,-74.0060', punchOutLocation: '40.7128,-74.0060', punchInPhoto: 'https://picsum.photos/seed/punch10/200/150', punchOutPhoto: 'https://picsum.photos/seed/punch11/200/150' },
  { id: 'a8', userId: '3', userName: 'James Smith', date: '2024-07-27', punchIn: 'N/A', punchOut: 'N/A', hours: '0', status: 'On Leave' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'l1', userId: '2', userName: 'Maria Garcia', date: '2024-08-05', reason: 'I have a family event to attend out of state. It is my cousin\'s wedding, and I am a bridesmaid. I will need to travel on Friday and will be back on Sunday evening.', status: 'Pending' },
  { id: 'l2', userId: '3', userName: 'James Smith', date: '2024-08-10', reason: 'I have a scheduled medical appointment for a follow-up consultation with my specialist. The appointment is in the morning and I expect to be back in the office after lunch.', status: 'Pending' },
  { id: 'l3', userId: '5', userName: 'Chen Wei', date: '2024-07-30', reason: 'Personal reasons.', status: 'Approved' },
  { id: 'l4', userId: '1', userName: 'Alex Johnson', date: '2024-07-26', reason: 'Vacation', status: 'Approved' },
];

export const payrollData: Payroll[] = users.filter(u => u.role === 'User').map(user => {
  const userAttendance = attendanceRecords.filter(rec => rec.userId === user.id && (rec.status === 'Present' || rec.status === 'Late'));
  const totalHours = userAttendance.reduce((acc, rec) => acc + parseFloat(rec.hours), 0);
  const hourlyRate = user.hourlyRate || 0;
  return {
    id: `p-${user.id}`,
    userId: user.id,
    userName: user.name,
    totalHours: parseFloat(totalHours.toFixed(2)),
    hourlyRate: hourlyRate,
    totalPay: parseFloat((totalHours * hourlyRate).toFixed(2))
  }
});

export const notifications: Notification[] = [
    { id: 'n1', userId: '1', title: 'Leave Approved', description: 'Your leave request for 2024-07-26 has been approved.', timestamp: '2 days ago', read: false },
    { id: 'n2', userId: '4', title: 'New Leave Request', description: 'Maria Garcia has requested leave for 2024-08-05.', timestamp: '1 hour ago', read: false },
    { id: 'n3', userId: '4', title: 'New Leave Request', description: 'James Smith has requested leave for 2024-08-10.', timestamp: '3 hours ago', read: true },
    { id: 'n4', userId: '5', title: 'Leave Approved', description: 'Your leave request for 2024-07-30 has been approved.', timestamp: '1 day ago', read: true },
];

export const userDocuments: UserDocument[] = [
  { id: 'd1', userId: '1', userName: 'Alex Johnson', documentType: 'PAN', fileName: 'alex_pan.pdf', fileUrl: '#', uploadedAt: '2024-07-20' },
  { id: 'd2', userId: '1', userName: 'Alex Johnson', documentType: 'Aadhar', fileName: 'alex_aadhar.pdf', fileUrl: '#', uploadedAt: '2024-07-20' },
  { id: 'd3', userId: '2', userName: 'Maria Garcia', documentType: 'PAN', fileName: 'maria_pan.pdf', fileUrl: '#', uploadedAt: '2024-07-21' },
];
