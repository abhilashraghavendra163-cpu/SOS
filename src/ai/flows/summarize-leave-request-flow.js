'use server';
/**
 * @fileOverview A flow for summarizing leave request reasons.
 *
 * - summarizeLeaveRequest - A function that handles summarizing the reason.
 */

import { ai } from '@/ai/genkit';
import {
  SummarizeLeaveRequestInputSchema,
  SummarizeLeaveRequestOutputSchema,
} from '@/ai/schemas';


export async function summarizeLeaveRequest(
  input
) {
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
    return output;
  }
);
