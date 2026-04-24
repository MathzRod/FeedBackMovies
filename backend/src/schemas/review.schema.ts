import { z } from "zod"

// Esses schemas validam os dados da review antes de chegar no banco.
export const createReviewSchema = z.object({
  title: z.string(),
  mediaType: z.string(),
  rating: z.number(),
  positives: z.string(),
  negatives: z.string(),
  tmdbId: z.number().nullable().optional(),
  posterUrl: z.string().nullable().optional(),
  year: z.string().nullable().optional(),
})

export const updateReviewSchema = z.object({
  rating: z.number(),
  positives: z.string(),
  negatives: z.string(),
})

export type CreateReviewSchemaData = z.infer<typeof createReviewSchema>
export type UpdateReviewSchemaData = z.infer<typeof updateReviewSchema>
