"use client"

import type { GenerateRecipeOutput as Recipe } from "@/ai/flows/generate-recipe-from-ingredients";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Utensils, Clock, ChefHat, Sparkles } from "lucide-react";
import Image from "next/image";

interface RecipeCardProps {
  recipe: Recipe;
  onSubstitutionClick: (ingredient: string) => void;
}

export function RecipeCard({ recipe, onSubstitutionClick }: RecipeCardProps) {
  return (
    <Card className="w-full h-full border-2 border-primary-foreground/50 shadow-lg shadow-primary-foreground/10 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
            <Image 
                src={`https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`}
                alt={recipe.title}
                fill
                className="object-cover"
                data-ai-hint="recipe food"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                <CardTitle className="text-3xl font-headline text-white drop-shadow-lg">{recipe.title}</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-lg drop-shadow-md">{recipe.substitutions ? "Substitution suggestions available" : "Enjoy your meal!"}</CardDescription>
            </div>
        </div>
        <div className="flex justify-around p-4 bg-primary/10 border-b border-t border-primary-foreground/20">
            {recipe.totalTime && (
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-5 w-5 text-primary-foreground"/>
                    <span className="font-semibold">{recipe.totalTime}</span>
                </div>
            )}
            <div className="flex items-center gap-2 text-sm">
                <Utensils className="h-5 w-5 text-primary-foreground"/>
                <span className="font-semibold">{/* Servings can be added here if returned from AI */}</span>
            </div>
            {recipe.difficulty && (
                <div className="flex items-center gap-2 text-sm">
                    <ChefHat className="h-5 w-5 text-primary-foreground"/>
                    <span className="font-semibold">{recipe.difficulty}</span>
                </div>
            )}
        </div>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-xl font-headline font-semibold mb-4 text-primary-foreground">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <Button 
                  variant="link" 
                  className="text-left justify-start p-0 h-auto font-normal text-base text-foreground hover:text-primary-foreground" 
                  onClick={() => onSubstitutionClick(ingredient)}
                >
                  {ingredient}
                </Button>
              </li>
            ))}
          </ul>
           {recipe.substitutions && recipe.substitutions.length > 0 && (
            <div className="mt-6">
                 <h4 className="text-lg font-headline font-semibold mb-2 flex items-center gap-2 text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                    Substitutions
                </h4>
                 <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                    {recipe.substitutions.map((sub, index) => (
                        <li key={index}>{sub}</li>
                    ))}
                 </ul>
            </div>
           )}
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-headline font-semibold mb-4 text-primary-foreground">Instructions</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {index + 1}
                </div>
                <p className="flex-1 pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
