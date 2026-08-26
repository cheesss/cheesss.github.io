import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const mediaSchema = z.object({
  src: z.string().min(1),
  poster: z.string().optional(),
  alt: z.string().min(12),
  caption: z.string().min(12),
  kind: z.enum(['video', 'image', 'diagram']),
  section: z.enum(['intro', 'method', 'evidence', 'limitation']).default('evidence'),
  autoplay: z.boolean().default(false),
  aspectRatio: z.string().regex(/^\d+\s*\/\s*\d+$/),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    period: z.string(),
    status: z.enum(['Manuscript in preparation', 'Completed', 'Evaluated on 15 scenarios', 'Prototype · early robot trials']),
    summary: z.string(),
    contribution: z.string(),
    role: z.array(z.string()).min(1),
    teamContribution: z.array(z.string()).min(1),
    metrics: z.array(z.object({ value: z.string(), label: z.string(), note: z.string() })).min(1),
    methods: z.array(z.string()).min(3),
    limitations: z.array(z.string()).min(1),
    stack: z.array(z.string()).min(1),
    media: z.array(mediaSchema).min(1),
    links: z.array(z.object({ label: z.string(), href: z.string() })),
    featured: z.boolean(),
    order: z.number().int().positive(),
    accent: z.enum(['teal', 'blue', 'orange', 'violet']),
  }),
});

export const collections = { projects };
