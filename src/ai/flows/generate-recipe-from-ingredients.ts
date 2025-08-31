// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Generates a recipe based on a list of ingredients and dietary preferences.
 *
 * - generateRecipeFromIngredients - A function that handles the recipe generation process.
 * - GenerateRecipeInput - The input type for the generateRecipeFromIngredients function.
 * - GenerateRecipeOutput - The return type for the generateRecipeFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { imageSearchTool } from '@/ai/tools/image-search';

const GenerateRecipeInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available.'),
  dietaryPreferences: z
    .string()
    .describe(
      'A comma-separated list of dietary preferences (e.g., vegetarian, gluten-free, dairy-free).'      
    ),
  servings: z.number().optional().describe('Number of servings desired, if known.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional().describe('The difficulty level of the recipe.'),
  totalTime: z.string().optional().describe('The total cooking time (example: 30 minutes).'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  title: z.string().describe('The title of the generated recipe.'),
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients required for the recipe, with quantities scaled appropriately for the number of servings.'),
  instructions: z
    .array(z.string())
    .describe('Step-by-step instructions for preparing the recipe.'),
  substitutions: z
    .array(z.string())
    .optional()
    .describe(
      'A list of suggested ingredient substitutions based on dietary restrictions.'
    ),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional().describe('The difficulty level of the recipe.'),
  totalTime: z.string().optional().describe('The total cooking time.'),
  imageUrl: z.string().url().optional().describe('A URL for an image of the recipe.'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipeFromIngredients(
  input: GenerateRecipeInput
): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const generateRecipePrompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  tools: [imageSearchTool],
  prompt: `You are a recipe generation expert. Given a list of ingredients and dietary preferences, you will generate a detailed recipe.

  Ingredients: {{{ingredients}}}
  Dietary Preferences: {{{dietaryPreferences}}}
  Servings: {{servings}}
  Difficulty: {{difficulty}}
  Total Time: {{totalTime}}

  Instructions:
  1. Generate a recipe title.
  2. After generating the title, use the imageSearch tool to find a suitable image for the recipe.
  3. List the ingredients with quantities. Adjust quantities based on the number of servings.  If no serving size is provided, assume 4 servings.
  4. Provide step-by-step cooking instructions.
  5. If dietary preferences are provided, suggest ingredient substitutions to accommodate those preferences.
  6. Consider difficulty and total time information, if provided.

  Follow output schema format EXACTLY.

  Output Recipe:`,    
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await generateRecipePrompt(input);
    return output!;
  }
);
