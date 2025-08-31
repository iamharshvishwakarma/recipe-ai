"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/icons/logo";

const indianFoodImages = [
  { src: "https://picsum.photos/400/300?random=1", alt: "Biryani", hint: "indian food" },
  { src: "https://picsum.photos/400/300?random=2", alt: "Samosa", hint: "indian food" },
  { src: "https://picsum.photos/400/300?random=3", alt: "Paneer Tikka", hint: "indian food" },
  { src: "https://picsum.photos/400/300?random=4", alt: "Butter Chicken", hint: "indian food" },
  { src: "https://picsum.photos/400/300?random=5", alt: "Dosa", hint: "indian food" },
  { src: "https://picsum.photos/400/300?random=6", alt: "Naan", hint: "indian food" },
  { src: "https://picsum.photos/400/300?random=7", alt: "Chole Bhature", hint: "indian food" },
  { src: "https://picsum.photos/400/300?random=8", alt: "Jalebi", hint: "indian food" },
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="h-10 w-10 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary-foreground">
            RecipeAI
          </h1>
        </div>
        <Button asChild>
          <Link href="/generator">
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8 text-center">
        <div className="py-16">
          <h2 className="text-5xl md:text-6xl font-headline font-bold mb-4 text-primary">
            Discover Your Next Favorite Meal
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome to RecipeAI, your personal chef powered by artificial intelligence. Turn the ingredients in your pantry into delicious, easy-to-make meals, starting with the vibrant flavors of India.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {indianFoodImages.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                data-ai-hint={image.hint}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <p className="absolute bottom-2 left-2 text-white font-bold text-lg drop-shadow-md">{image.alt}</p>
            </div>
          ))}
        </div>

        <div className="py-12">
            <h3 className="text-4xl font-headline font-semibold mb-6 text-primary-foreground">Ready to Cook?</h3>
            <Button asChild size="lg" className="text-xl py-8 px-10">
                 <Link href="/generator">
                    Generate a Recipe Now <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </main>
        <footer className="text-center p-6 text-muted-foreground border-t">
            <p>&copy; {new Date().getFullYear()} RecipeAI. All rights reserved.</p>
        </footer>
    </div>
  );
}