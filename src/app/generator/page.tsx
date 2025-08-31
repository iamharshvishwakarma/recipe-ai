"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, Plus, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";

import type { GenerateRecipeOutput as Recipe } from "@/ai/flows/generate-recipe-from-ingredients";
import { generateRecipeAction, suggestSubstitutionsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { RecipeCard } from "@/components/recipe-card";
import { SubstitutionsDialog } from "@/components/substitutions-dialog";
import Logo from "@/components/icons/logo";

const dietaryPreferences = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "nut-free", label: "Nut-Free" },
];

const formSchema = z.object({
  ingredients: z
    .string()
    .min(3, "Please enter at least one ingredient."),
  dietaryPreferences: z.array(z.string()).optional(),
  servings: z.coerce.number().min(1, "Must be at least 1 serving.").max(20, "Cannot exceed 20 servings.").default(2),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
  totalTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function GeneratorPage({}: {}) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [substitutionState, setSubstitutionState] = useState<{
    isOpen: boolean;
    ingredient: string;
    recipeTitle: string;
    dietaryPrefs: string;
  }>({ isOpen: false, ingredient: "", recipeTitle: "", dietaryPrefs: "" });
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
      dietaryPreferences: [],
      servings: 2,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setRecipe(null);
    try {
      const result = await generateRecipeAction({
        ...values,
        dietaryPreferences: values.dietaryPreferences?.join(", ") || "",
      });

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error Generating Recipe",
          description: result.error,
        });
      } else if (result.recipe) {
        setRecipe(result.recipe);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An unexpected error occurred",
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubstitutionClick = (ingredient: string) => {
    if (!recipe) return;
    setSubstitutionState({
      isOpen: true,
      ingredient,
      recipeTitle: recipe.title,
      dietaryPrefs: form.getValues("dietaryPreferences")?.join(", ") || "",
    });
  };

  return (
    <>
      <div className="min-h-screen w-full">
        <header className="p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-10 w-10 text-primary-foreground" />
            <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary-foreground">
              RecipeAI
            </h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </header>

        <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg bg-card border">
              <h2 className="text-2xl font-headline font-semibold mb-4">
                What's in your pantry?
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Ingredients</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., chicken breast, rice, broccoli, soy sauce"
                            className="min-h-[120px] text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter ingredients separated by commas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dietaryPreferences"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-lg">
                            Dietary Preferences
                          </FormLabel>
                          <FormDescription>
                            Select any dietary needs.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                        {dietaryPreferences.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="dietaryPreferences"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="servings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Servings</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10"
                                  onClick={() => field.onChange(Math.max(1, field.value - 1))}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Input type="number" className="text-center" {...field} />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10"
                                  onClick={() => field.onChange(Math.min(20, field.value + 1))}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Difficulty</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Any" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                  </div>

                  <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-6 w-6" />
                    )}
                    Generate Recipe
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="h-full">
              {isLoading && (
                 <div className="flex flex-col items-center justify-center h-full border-2 border-dashed rounded-lg p-8 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary-foreground mb-4"/>
                    <p className="text-xl font-headline">Crafting your recipe...</p>
                    <p className="text-muted-foreground">The AI is working its magic.</p>
                 </div>
              )}
              {!isLoading && recipe && (
                 <RecipeCard recipe={recipe} onSubstitutionClick={handleSubstitutionClick} />
              )}
              {!isLoading && !recipe && (
                <div className="flex flex-col items-center justify-center h-full border-2 border-dashed rounded-lg p-8 text-center bg-card/50">
                    <Sparkles className="h-16 w-16 text-primary-foreground/50 mb-4" />
                    <h3 className="text-2xl font-headline font-semibold">Your recipe awaits</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm">
                        Fill out the form to let our AI chef create a personalized dish just for you.
                    </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <SubstitutionsDialog
        isOpen={substitutionState.isOpen}
        onOpenChange={(isOpen) => setSubstitutionState((prev) => ({ ...prev, isOpen }))}
        ingredient={substitutionState.ingredient}
        recipeTitle={substitutionState.recipeTitle}
        dietaryPreferences={substitutionState.dietaryPrefs}
      />
    </>
  );
}
