'use server';

/**
 * @fileOverview A flow that explains why a URL is flagged as phishing.
 *
 * - explainPhishingDetection - A function that takes a URL and returns an explanation of why it might be a phishing attempt.
 * - ExplainPhishingDetectionInput - The input type for the explainPhishingDetection function.
 * - ExplainPhishingDetectionOutput - The return type for the explainPhishingDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainPhishingDetectionInputSchema = z.object({
  url: z.string().describe('The URL to analyze for phishing.example:https://example.com/login'),
});

export type ExplainPhishingDetectionInput = z.infer<
  typeof ExplainPhishingDetectionInputSchema
>;

const ExplainPhishingDetectionOutputSchema = z.object({
  explanation: z
    .string()
    .describe('The explanation of why the URL might be a phishing attempt.'),
});

export type ExplainPhishingDetectionOutput = z.infer<
  typeof ExplainPhishingDetectionOutputSchema
>;

export async function explainPhishingDetection(
  input: ExplainPhishingDetectionInput
): Promise<ExplainPhishingDetectionOutput> {
  return explainPhishingDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainPhishingDetectionPrompt',
  input: {schema: ExplainPhishingDetectionInputSchema},
  output: {schema: ExplainPhishingDetectionOutputSchema},
  prompt: `You are an expert in cybersecurity, specializing in phishing detection.

  Analyze the following URL and explain why it might be a phishing attempt. Consider aspects like domain name similarity to known brands, unusual URL structure, presence of suspicious characters, and any other red flags.

  URL: {{{url}}}
  \nExplanation:`,
});

const explainPhishingDetectionFlow = ai.defineFlow(
  {
    name: 'explainPhishingDetectionFlow',
    inputSchema: ExplainPhishingDetectionInputSchema,
    outputSchema: ExplainPhishingDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
