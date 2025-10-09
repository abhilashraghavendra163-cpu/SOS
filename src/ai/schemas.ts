import { z } from 'zod';

/**
 * @fileOverview Schemas and types for AI flows.
 */

// Schema for summarizing leave request reasons.
export const SummarizeLeaveRequestInputSchema = z.object({
  reason: z.string().describe('The leave request reason to summarize.'),
});
export type SummarizeLeaveRequestInput = z.infer<typeof SummarizeLeaveRequestInputSchema>;

export const SummarizeLeaveRequestOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the leave request reason.'),
});
export type SummarizeLeaveRequestOutput = z.infer<typeof SummarizeLeaveRequestOutputSchema>;
