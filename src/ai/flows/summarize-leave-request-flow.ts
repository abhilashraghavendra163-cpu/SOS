'use server';
/**
 * @fileOverview A flow for summarizing leave request reasons.
 *
 * - summarizeLeaveRequest - A function that handles summarizing the reason.
 * - SummarizeLeaveRequestInput - The input type for the summarizeLeaveRequest function.
 * - SummarizeLeaveRequestOutput - The return type for the summarizeLeaveRequest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const SummarizeLeaveRequestInputSchema = z.object({
  reason: z.string().describe('The leave request reason to summarize.'),
});
export type SummarizeLeaveRequestInput = z.infer<typeof SummarizeLeaveRequestInputSchema>;

export const SummarizeLeaveRequestOutputSchema = z.object({
    summary: z.string().describe('A concise summary of the leave request reason.'),
});
export type SummarizeLeaveRequestOutput = z.infer<typeof SummarizeLeaveRequestOutputSchema>;


export async function summarizeLeaveRequest(
  input: SummarizeLeaveRequestInput
): Promise<SummarizeLeaveRequestOutput> {
  return summarizeLeaveRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeLeaveRequestPrompt',
  input: { schema: SummarizeLeaveRequestInputSchema },
  output: { schema: SummarizeLeaveRequestOutputSchema },
  prompt: `You are an expert HR assistant. Your task is to summarize the following employee leave request reason into a concise, neutral, and professional summary of no more than 15 words.

Leave Reason: {{{reason}}}`,
});

const summarizeLeaveRequestFlow = ai.defineFlow(
  {
    name: 'summarizeLeaveRequestFlow',
    inputSchema: SummarizeLeaveRequestInputSchema,
    outputSchema: SummarizeLeaveRequestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
