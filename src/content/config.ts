import { defineCollection, z } from 'astro:content';

const about = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        permalink: z.string().optional(),
    }),
});
const projects = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        description: z.string(),
        repoURL: z.string(),
        liveURL: z.string().optional(),
    }),
});

export const collections = { about, projects };
