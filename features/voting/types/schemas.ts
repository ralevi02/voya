import { z } from 'zod';

const voteOptionInputSchema = z.object({
  title: z.string().min(1, 'Título requerido'),
  description: z.string().default(''),
  image_url: z.string().url().nullable().optional(),
});

export const createVoteSessionSchema = z.object({
  trip_id: z.string().uuid(),
  title: z.string().min(1, 'Título requerido'),
  options: z.array(voteOptionInputSchema).min(2, 'Mínimo 2 opciones'),
  expires_at: z.string().datetime().nullable().optional(),
});

export const castVoteSchema = z.object({
  session_id: z.string().uuid(),
  option_id: z.string().uuid(),
  choice: z.enum(['yes', 'no']),
});

export type CreateVoteSessionInput = z.infer<typeof createVoteSessionSchema>;
export type CastVoteInput = z.infer<typeof castVoteSchema>;
