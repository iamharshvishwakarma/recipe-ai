'use server';
/**
 * @fileOverview An AI agent for suggesting ingredient substitutions based on dietary restrictions.
 *
 * - suggestIngredientSubstitutions - A function that suggests ingredient substitutions.
 * - SuggestIngredientSubstitutionsInput - The input type for the suggestIngredientSubstitutions function.
 * - SuggestIngredientSubstitutionsOutput - The return type for the suggestIngredientSubstitutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestIngredientSubstitutionsInputSchema = z.object({
  ingredient: z.string().describe('The ingredient to be substituted.'),
  dietaryRestrictions: z
    .string()
    .describe(
      'The dietary restrictions to consider when suggesting substitutions.'
    ),
  recipeName: z.string().describe('The name of the recipe.'),
});
export type SuggestIngredientSubstitutionsInput = z.infer<
  typeof SuggestIngredientSubstitutionsInputSchema
>;

const SuggestIngredientSubstitutionsOutputSchema = z.object({
  substitutions: z
    .array(z.string())
    .describe('An array of suggested ingredient substitutions.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggested substitutions, considering the dietary restrictions and the recipe.'
    ),
});
export type SuggestIngredientSubstitutionsOutput = z.infer<
  typeof SuggestIngredientSubstitutionsOutputSchema
>;

export async function suggestIngredientSubstitutions(
  input: SuggestIngredientSubstitutionsInput
): Promise<SuggestIngredientSubstitutionsOutput> {
  return suggestIngredientSubstitutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestIngredientSubstitutionsPrompt',
  input: {schema: SuggestIngredientSubstitutionsInputSchema},
  output: {schema: SuggestIngredientSubstitutionsOutputSchema},
  prompt: `You are a helpful assistant that suggests ingredient substitutions based on dietary restrictions for a given recipe.

Recipe Name: {{{recipeName}}}
Ingredient to Substitute: {{{ingredient}}}
Dietary Restrictions: {{{dietaryRestrictions}}}

Suggest suitable substitutions for the ingredient, considering the dietary restrictions and the recipe. Explain your reasoning for each substitution.

Output the substitutions and reasoning in a structured format.`,
});

const suggestIngredientSubstitutionsFlow = ai.defineFlow(
  {
    name: 'suggestIngredientSubstitutionsFlow',
    inputSchema: SuggestIngredientSubstitutionsInputSchema,
    outputSchema: SuggestIngredientSubstitutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
