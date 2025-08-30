import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe-from-ingredients.ts';
import '@/ai/flows/suggest-ingredient-substitutions.ts';