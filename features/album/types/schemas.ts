import { z } from 'zod';

export const uploadMediaSchema = z.object({
  trip_id: z.string().uuid(),
  type: z.enum(['photo', 'video']),
  file_url: z.string().url(),
  caption: z.string().max(500).nullable().optional(),
  location_lat: z.number().min(-90).max(90).nullable().optional(),
  location_lng: z.number().min(-180).max(180).nullable().optional(),
  taken_at: z.string().datetime(),
});

export const mediaItemSchema = z.object({
  id: z.string().uuid(),
  trip_id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum(['photo', 'video']),
  file_url: z.string().url(),
  thumbnail_url: z.string().url().nullable(),
  caption: z.string().nullable(),
  location_lat: z.number().nullable(),
  location_lng: z.number().nullable(),
  taken_at: z.string(),
  created_at: z.string().datetime(),
});

export type UploadMediaInput = z.infer<typeof uploadMediaSchema>;
export type MediaItemResponse = z.infer<typeof mediaItemSchema>;
