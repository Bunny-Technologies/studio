'use server';
/**
 * @fileOverview A Genkit flow for generating quiz questions.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {Question} from '@/lib/types';
import {z} from 'genkit';

const QuestionSchema = z.object({
  id: z.string().describe('A unique identifier for the question.'),
  text: z.string().describe('The question text.'),
  options: z
    .array(z.string())
    .length(3)
    .describe('An array of three possible answers.'),
  correctIndex: z
    .number()
    .min(0)
    .max(2)
    .describe('The index (0, 1, or 2) of the correct answer in the options array.'),
  category: z.string().describe('The category of the question.'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty of the question.'),
});

const GenerateQuizInputSchema = z.object({
  category: z.string().describe('The category for the quiz questions, e.g., "General Knowledge".'),
  count: z.number().int().min(1).max(50).describe('The number of questions to generate.'),
  language: z.string().describe('The language for the quiz questions, e.g., "English", "Telugu".'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.array(QuestionSchema);
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz creator for students in Telangana, India.
  
  Generate {{count}} quiz questions in the {{language}} language for the category: "{{category}}".
  
  Each question must have exactly three options.
  The output must be a JSON array of questions matching the provided schema. Ensure the response is only the JSON array.
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate quiz questions.');
    }
    // The model sometimes doesn't perfectly adhere to the count, so we slice it.
    return output.slice(0, input.count);
  }
);
