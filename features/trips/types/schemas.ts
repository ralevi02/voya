import { z } from 'zod';

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value));
}

export const createTripSchema = z
  .object({
    name: z.string().min(2, 'Mínimo 2 caracteres'),
    destination: z.string().min(2, 'Ingresa un destino'),
    start_date: z.string().refine(isValidDate, 'Fecha inválida (YYYY-MM-DD)'),
    end_date: z.string().refine(isValidDate, 'Fecha inválida (YYYY-MM-DD)'),
    description: z.string().optional(),
    base_currency: z.string().default('USD'),
    cover_image: z.string().optional(),
  })
  .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
    message: 'La fecha de fin debe ser posterior a la de inicio',
    path: ['end_date'],
  });

export const stepDestinationSchema = z.object({
  destination: z.string().min(2, 'Ingresa un destino'),
});

export const stepDatesSchema = z
  .object({
    start_date: z.string().refine(isValidDate, 'Fecha inválida'),
    end_date: z.string().refine(isValidDate, 'Fecha inválida'),
  })
  .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
    message: 'La vuelta debe ser posterior a la ida',
    path: ['end_date'],
  });

export const stepDetailsSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
});

export type CreateTripFormInput = z.infer<typeof createTripSchema>;
