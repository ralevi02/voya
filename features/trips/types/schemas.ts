import { z } from 'zod';

export const createTripSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(100),
  description: z.string().max(500).default(''),
  destination: z.string().min(1, 'Destino requerido'),
  start_date: z.string().date('Fecha inválida'),
  end_date: z.string().date('Fecha inválida'),
  base_currency: z.string().length(3, 'Código de moneda inválido'),
  cover_image_url: z.string().url().nullable().optional(),
});

export const tripSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  destination: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  base_currency: z.string(),
  cover_image_url: z.string().url().nullable(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const tripMemberSchema = z.object({
  id: z.string().uuid(),
  trip_id: z.string().uuid(),
  user_id: z.string().uuid(),
  role: z.enum(['admin', 'member']),
  joined_at: z.string().datetime(),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type TripResponse = z.infer<typeof tripSchema>;
export type TripMemberResponse = z.infer<typeof tripMemberSchema>;
