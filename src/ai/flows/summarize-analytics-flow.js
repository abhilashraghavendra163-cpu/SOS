'use server';
/**
 * @fileOverview A flow for summarizing weekly attendance analytics.
 *
 * - summarizeAnalytics - A function that handles summarizing the attendance data.
 */

import { ai } from '@/ai/genkit';
import {
  SummarizeAnalyticsInputSchema,
  SummarizeAnalyticsOutputSchema,
} from '@/ai/schemas';


export async function summarizeAnalytics(
  input
) {
  return summarizeAnalyticsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAnalyticsPrompt',
  input: { schema: SummarizeAnalyticsInputSchema },
  output: { schema: SummarizeAnalyticsOutputSchema },
  prompt: `You are an expert HR analyst. Your task is to analyze the following weekly attendance data and provide a concise summary of trends, patterns, and anomalies. Highlight any notable points such as days with high absenteeism, frequent tardiness, or perfect attendance. The summary should be professional and no more than 50 words.

Attendance Data:
{{{json attendanceData}}}
`,
});

const summarizeAnalyticsFlow = ai.defineFlow(
  {
    name: 'summarizeAnalyticsFlow',
    inputSchema: SummarizeAnalyticsInputSchema,
    outputSchema: SummarizeAnalyticsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output;
  }
);
