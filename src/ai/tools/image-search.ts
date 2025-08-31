'use server';
/**
 * @fileOverview A tool for searching for images on the web.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const imageSearchTool = ai.defineTool(
  {
    name: 'imageSearch',
    description: 'Searches for an image on Wikipedia and returns a URL. Use this to find an image for a recipe.',
    inputSchema: z.object({
      query: z.string().describe('The search query for the image (e.g., the recipe title).'),
    }),
    outputSchema: z.string().url().describe('The URL of the image found on Wikipedia.'),
  },
  async (input) => {
    console.log(`Searching for image on Wikipedia with query: ${input.query}`);
    try {
      const encodedQuery = encodeURIComponent(input.query);
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodedQuery}&prop=pageimages&format=json&pithumbsize=800&origin=*`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Wikipedia API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];

      if (pageId === '-1' || !pages[pageId].thumbnail) {
        // Fallback if no image is found on Wikipedia
        return `https://source.unsplash.com/800x600/?${encodedQuery}`;
      }

      const imageUrl = pages[pageId].thumbnail.source;
      return imageUrl;

    } catch (error) {
      console.error("Error fetching image from Wikipedia:", error);
      // Fallback to Unsplash in case of any error
      const encodedQuery = encodeURIComponent(input.query);
      return `https://source.unsplash.com/800x600/?${encodedQuery}`;
    }
  }
);
