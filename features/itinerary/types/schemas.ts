import { z } from 'zod';

const travelObjectTypes = [
  'flight',
  'hotel',
  'activity',
  'restaurant',
  'transport',
  'other',
] as const;

export const createTravelObjectSchema = z.object({
  trip_id: z.string().uuid(),
  type: z.enum(travelObjectTypes),
  title: z.string().min(1, 'Título requerido'),
  description: z.string().default(''),
  start_time: z.string().datetime(),
  end_time: z.string().datetime().nullable().optional(),
  location_name: z.string().nullable().optional(),
  location_lat: z.number().min(-90).max(90).nullable().optional(),
  location_lng: z.number().min(-180).max(180).nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const travelObjectSchema = z.object({
  id: z.string().uuid(),
  trip_id: z.string().uuid(),
  type: z.enum(travelObjectTypes),
  title: z.string(),
  description: z.string(),
  start_time: z.string(),
  end_time: z.string().nullable(),
  location_name: z.string().nullable(),
  location_lat: z.number().nullable(),
  location_lng: z.number().nullable(),
  metadata: z.record(z.string(), z.unknown()),
  created_by: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type CreateTravelObjectInput = z.infer<typeof createTravelObjectSchema>;
export type TravelObjectResponse = z.infer<typeof travelObjectSchema>;
