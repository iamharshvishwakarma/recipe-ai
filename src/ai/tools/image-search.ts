'use server';
/**
 * @fileOverview A tool for searching for images on the web.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const imageSearchTool = ai.defineTool(
  {
    name: 'imageSearch',
    description: 'Searches for an image on the web and returns a URL. Use this to find an image for a recipe.',
    inputSchema: z.object({
      query: z.string().describe('The search query for the image.'),
    }),
    outputSchema: z.string().url().describe('The URL of the image found.'),
  },
  async (input) => {
    // In a real application, you would use a library like 'axios' or 'node-fetch' 
    // to call a search API (e.g., Google Custom Search, Unsplash API)
    // and scrape the results. For this example, we'll return a placeholder.
    console.log(`Searching for image with query: ${input.query}`);
    const encodedQuery = encodeURIComponent(input.query);
    // This is a placeholder that returns a random image from a service.
    // A real implementation would provide a more relevant image.
    return `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}&q=${encodedQuery}`;
  }
);
