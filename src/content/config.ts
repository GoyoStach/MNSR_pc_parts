import { defineCollection, z } from 'astro:content';

const pcPartsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    id: z.number(),
  }),
});

export const collections = {
  pc_parts: pcPartsCollection,
};