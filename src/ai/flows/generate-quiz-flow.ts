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
import {GenerateResponse, ModelArgument} from 'genkit';
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
  studentClass: z.string().describe('The class the student is in, e.g., "6th grade", "10th class".'),
  count: z.number().int().min(1).max(50).describe('The number of questions to generate.'),
  language: z.string().describe('The language for the quiz questions, e.g., "English", "Telugu".'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

// IMPORTANT: We are constraining the output to always be an array of 25 questions.
const GenerateQuizOutputSchema = z.array(QuestionSchema).length(25);
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  // We are hard-coding count to 25 to match the schema.
  // The input parameter is kept for potential future flexibility.
  const forcedInput = {...input, count: 25};
  return generateQuizFlow(forcedInput);
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert and FUN quiz creator for students in Telangana, India. Your goal is to create quizzes that are engaging, educational, and keep students excited to learn.

Generate EXACTLY {{count}} quiz questions in the {{language}} language for the category: "{{category}}".

The questions should be appropriate for a student in {{studentClass}}.

Here are the rules for the questions:
1.  **Mix it up!** The quiz should be an engaging mix of educational questions, fun trivia, brain teasers, and "easy peasy" questions to keep it light.
2.  **Strictly Age-Appropriate.** All questions MUST be suitable for children. Do NOT include any adult themes, violence, or sensitive topics. Keep it positive and focused on learning and fun.
3.  **Clarity is Key.** Questions and options should be clear, simple, and easy to understand.

Each question must have exactly three options.
The output must be a JSON array of EXACTLY {{count}} questions matching the provided schema. Ensure the response is only the JSON array.
`,
  config: {
    safetySettings: [
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_ONLY_HIGH',
        },
        {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_LOW_AND_ABOVE',
        },
        {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_LOW_AND_ABOVE',
        },
    ],
  }
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    // Define primary and fallback models
    const primaryModel = 'googleai/gemini-1.5-flash-latest';
    const fallbackModel = 'googleai/gemini-pro';
    let response: GenerateResponse<z.infer<typeof GenerateQuizOutputSchema>>;

    try {
      // First attempt with the primary model
      console.log(`Attempting to generate quiz with primary model: ${primaryModel}`);
      response = await generateQuizPrompt(input, { model: primaryModel as ModelArgument });
    } catch (e: any) {
      // If the primary model fails (e.g., is overloaded), try the fallback
      console.warn(`Primary model failed: ${e?.message}. Trying fallback model: ${fallbackModel}`);
      try {
        response = await generateQuizPrompt(input, { model: fallbackModel as ModelArgument });
      } catch (fallbackError: any) {
        // If the fallback also fails, throw an error
        console.error(`Fallback model also failed: ${fallbackError?.message}`);
        throw new Error('Both primary and fallback models failed to generate the quiz.');
      }
    }
    
    const output = response.output;
    if (!output) {
      throw new Error('Failed to generate quiz questions.');
    }
    // The schema now enforces 25 questions, so we can return directly.
    return output;
  }
);
