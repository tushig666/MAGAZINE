'use server';

/**
 * @fileOverview Generates an estimated read time for an article based on its content.
 *
 * - generateArticleReadTime - A function that generates the article read time.
 * - GenerateArticleReadTimeInput - The input type for the generateArticleReadTime function.
 * - GenerateArticleReadTimeOutput - The return type for the generateArticleReadTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleReadTimeInputSchema = z.object({
  content: z
    .string()
    .describe('The full text content of the article.'),
});
export type GenerateArticleReadTimeInput = z.infer<typeof GenerateArticleReadTimeInputSchema>;

const GenerateArticleReadTimeOutputSchema = z.object({
  readTimeMinutes: z
    .number()
    .describe('The estimated read time of the article in minutes.'),
});
export type GenerateArticleReadTimeOutput = z.infer<typeof GenerateArticleReadTimeOutputSchema>;

export async function generateArticleReadTime(
  input: GenerateArticleReadTimeInput
): Promise<GenerateArticleReadTimeOutput> {
  return generateArticleReadTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleReadTimePrompt',
  input: {schema: GenerateArticleReadTimeInputSchema},
  output: {schema: GenerateArticleReadTimeOutputSchema},
  prompt: `You are an expert content analyst.

You will estimate the reading time of an article based on its content.

Given the following article content, estimate the reading time in minutes. Return only the number of minutes.

Content: {{{content}}}`,
});

const generateArticleReadTimeFlow = ai.defineFlow(
  {
    name: 'generateArticleReadTimeFlow',
    inputSchema: GenerateArticleReadTimeInputSchema,
    outputSchema: GenerateArticleReadTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
