import { defineCollection, z } from 'astro:content';

const bio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    permalink: z.string().optional(),
  }),
});
const projects = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        permalink: z.string().optional(),
    }),
});

export const collections = { bio, projects };
