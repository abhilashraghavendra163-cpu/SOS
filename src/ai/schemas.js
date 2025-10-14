import { z } from 'zod';

/**
 * @fileOverview Schemas for AI flows.
 */

// Schema for summarizing leave request reasons.
export const SummarizeLeaveRequestInputSchema = z.object({
  reason: z.string().describe('The leave request reason to summarize.'),
});

export const SummarizeLeaveRequestOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the leave request reason.'),
});

// Schema for summarizing analytics data.
const AttendanceRecordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  date: z.string(),
  punchIn: z.string(),
  punchOut: z.string().nullable(),
  hours: z.string(),
  status: z.enum(['Present', 'On Leave', 'Late', 'In Progress']),
});

export const SummarizeAnalyticsInputSchema = z.object({
  attendanceData: z.array(AttendanceRecordSchema).describe('The list of attendance records for the week.'),
});

export const SummarizeAnalyticsOutputSchema = z.object({
  summary: z.string().describe('A concise, professional summary of the attendance analytics.'),
});
