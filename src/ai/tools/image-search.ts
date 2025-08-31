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
    console.log(`Searching for image with query: ${input.query}`);
    const encodedQuery = encodeURIComponent(input.query);
    // This now uses Unsplash to provide a more relevant image.
    return `https://source.unsplash.com/800x600/?${encodedQuery}`;
  }
);
