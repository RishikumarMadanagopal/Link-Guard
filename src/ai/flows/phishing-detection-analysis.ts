'use server';

/**
 * @fileOverview Analyzes a given URL to determine if it is a phishing attempt.
 *
 * - analyzeUrl - A function that handles the URL analysis process.
 * - AnalyzeUrlInput - The input type for the analyzeUrl function.
 * - AnalyzeUrlOutput - The return type for the analyzeUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUrlInputSchema = z.object({
  url: z.string().describe('The URL to analyze for phishing attempts.'),
});
export type AnalyzeUrlInput = z.infer<typeof AnalyzeUrlInputSchema>;

const AnalyzeUrlOutputSchema = z.object({
  isPhishing: z.boolean().describe('Whether the URL is likely a phishing attempt.'),
  explanation: z.string().describe('Explanation of why the URL is considered phishing or safe.'),
});
export type AnalyzeUrlOutput = z.infer<typeof AnalyzeUrlOutputSchema>;

export async function analyzeUrl(input: AnalyzeUrlInput): Promise<AnalyzeUrlOutput> {
  return analyzeUrlFlow(input);
}

const analyzeUrlPrompt = ai.definePrompt({
  name: 'analyzeUrlPrompt',
  input: {schema: AnalyzeUrlInputSchema},
  output: {schema: AnalyzeUrlOutputSchema},
  prompt: `You are an expert in identifying phishing attempts. Analyze the given URL and determine if it is a phishing attempt.\n\nURL: {{{url}}}\n\nConsider the following factors:\n- Suspicious domain names or URL structures\n- Presence of unusual characters or misspellings\n- Redirection to unexpected websites\n- Requests for sensitive information (usernames, passwords, credit card details)\n\nExplain your reasoning and provide a final determination of whether the URL is likely a phishing attempt. Set the isPhishing field appropriately.`,
});

const analyzeUrlFlow = ai.defineFlow(
  {
    name: 'analyzeUrlFlow',
    inputSchema: AnalyzeUrlInputSchema,
    outputSchema: AnalyzeUrlOutputSchema,
  },
  async input => {
    const {output} = await analyzeUrlPrompt(input);
    return output!;
  }
);
