"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/icons/logo";

const indianFoodImages = [
  { src: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxpbmRpYW4lMjBmb29kJTIwYmlyeWFuaXxlbnwwfHx8fDE3NTY2MzY2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Biryani", hint: "indian food biryani" },
  { src: "https://images.unsplash.com/photo-1613435392866-f81bf4cf1bbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxpbmRpYW4lMjBmb29kJTIwc2Ftb3NhfGVufDB8fHx8MTc1NjYzNjYyMXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Samosa", hint: "indian food samosa" },
  { src: "https://images.unsplash.com/photo-1736680056361-6a2f6e35fa50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxpbmRpYW4lMjBmb29kJTIwcGFuZWVyfGVufDB8fHx8MTc1NjYzNjYyMXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Paneer Tikka", hint: "indian food paneer" },
  { src: "https://images.unsplash.com/photo-1694579740719-0e601c5d2437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwY2hpY2tlbnxlbnwwfHx8fDE3NTY2MzY2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Butter Chicken", hint: "indian food chicken" },
  { src: "https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxpbmRpYW4lMjBmb29kJTIwZG9zYXxlbnwwfHx8fDE3NTY2MzY2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Dosa", hint: "indian food dosa" },
  { src: "https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aW5kaWFuJTIwZm9vZCUyMG5hYW58ZW58MHx8fHwxNzU2NjM2NjIxfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Naan", hint: "indian food naan" },
  { src: "https://images.unsplash.com/photo-1651462104786-98240fd73b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmb29kJTIwY2hvbGV8ZW58MHx8fHwxNzU2NjM2NjIxfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Chole Bhature", hint: "indian food chole" },
  { src: "https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxpbmRpYW4lMjBmb29kJTIwamFsZWJpfGVufDB8fHx8MTc1NjYzNjYyMXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Jalebi", hint: "indian food jalebi" },
];

export default function WelcomePage({}: {}) {
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
