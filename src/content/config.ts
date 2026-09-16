import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/projects' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    neighborhood: z.string(),
    sqft: z.number(),
    beds: z.number(),
    baths: z.number(),
    year: z.number(),
    status: z.enum(['Sold', 'Available', 'Under Construction']),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    gallery: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      })
    ),
    description: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = { projects };
