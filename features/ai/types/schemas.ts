import { z } from 'zod';

const expenseCategories = [
  'food', 'transport', 'lodging', 'activity',
  'shopping', 'health', 'communication', 'other',
] as const;

export const receiptDataSchema = z.object({
  amount: z.number().positive('Monto inválido'),
  currency: z.string().length(3, 'Código de moneda inválido'),
  category: z.enum(expenseCategories),
  merchant: z.string().min(1),
  date: z.string().nullable(),
});

export const conciergeResponseSchema = z.object({
  reply: z.string().min(1),
  has_itinerary_action: z.boolean(),
});
