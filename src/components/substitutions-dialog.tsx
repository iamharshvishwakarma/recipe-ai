"use client";

import { useEffect, useState } from "react";
import { suggestSubstitutionsAction } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

interface SubstitutionsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ingredient: string;
  recipeTitle: string;
  dietaryPreferences: string;
}

export function SubstitutionsDialog({
  isOpen,
  onOpenChange,
  ingredient,
  recipeTitle,
  dietaryPreferences,
}: SubstitutionsDialogProps) {
  const [substitutions, setSubstitutions] = useState<string[]>([]);
  const [reasoning, setReasoning] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && ingredient) {
      const fetchSubstitutions = async () => {
        setIsLoading(true);
        setSubstitutions([]);
        setReasoning("");
        try {
          const result = await suggestSubstitutionsAction({
            ingredient,
            recipeName: recipeTitle,
            dietaryRestrictions: dietaryPreferences,
          });

          if (result.error) {
            toast({
              variant: "destructive",
              title: "Error finding substitutions",
              description: result.error,
            });
          } else if (result.substitutions) {
            setSubstitutions(result.substitutions.substitutions);
            setReasoning(result.substitutions.reasoning);
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
      };
      fetchSubstitutions();
    }
  }, [isOpen, ingredient, recipeTitle, dietaryPreferences, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-primary-foreground">
            Substitutions for {ingredient.split(',')[0]}
          </DialogTitle>
          <DialogDescription>
            AI-powered suggestions based on your dietary needs.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              {substitutions.length > 0 ? (
                <div>
                  <h4 className="font-semibold text-lg mb-2">Suggestions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-foreground">
                    {substitutions.map((sub, index) => (
                      <li key={index}>{sub}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                 <p>No substitutions found or needed.</p>
              )}
              {reasoning && (
                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                    Reasoning
                  </h4>
                  <p className="text-sm text-muted-foreground">{reasoning}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
