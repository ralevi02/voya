import { z } from 'zod';

const itemTypes = ['flight', 'hotel', 'food', 'activity'] as const;

export const createItineraryItemSchema = z.object({
  trip_id: z.string().uuid(),
  title: z.string().min(1, 'Título requerido').max(120),
  type: z.enum(itemTypes),
  start_time: z.string().min(1, 'Hora de inicio requerida'),
  end_time: z.string().nullable().optional(),
  location_name: z.string().nullable().optional(),
  location_lat: z.number().min(-90).max(90).nullable().optional(),
  location_lng: z.number().min(-180).max(180).nullable().optional(),
  notes: z.string().max(500).nullable().optional(),
});

export type CreateItemFormData = z.infer<
  typeof createItineraryItemSchema
>;
