"use server";

import { generateRecipeFromIngredients, GenerateRecipeInput, GenerateRecipeOutput } from "@/ai/flows/generate-recipe-from-ingredients";
import { suggestIngredientSubstitutions, SuggestIngredientSubstitutionsInput, SuggestIngredientSubstitutionsOutput } from "@/ai/flows/suggest-ingredient-substitutions";

export async function generateRecipeAction(input: GenerateRecipeInput): Promise<{ recipe: GenerateRecipeOutput | null, error: string | null }> {
  try {
    const recipe = await generateRecipeFromIngredients(input);
    return { recipe, error: null };
  } catch (error) {
    console.error("Error generating recipe:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { recipe: null, error: `Failed to generate recipe. ${errorMessage}` };
  }
}

export async function suggestSubstitutionsAction(input: SuggestIngredientSubstitutionsInput): Promise<{ substitutions: SuggestIngredientSubstitutionsOutput | null, error: string | null }> {
  try {
    const substitutions = await suggestIngredientSubstitutions(input);
    return { substitutions, error: null };
  } catch (error) {
    console.error("Error suggesting substitutions:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { substitutions: null, error: `Failed to suggest substitutions. ${errorMessage}` };
  }
}
