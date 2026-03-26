import { z } from 'zod';

const categories = [
  'food', 'transport', 'lodging', 'activity',
  'shopping', 'health', 'communication', 'other',
] as const;

const splitInputSchema = z.object({
  user_id: z.string().uuid(),
  amount_owed: z.number().nonnegative('Monto no puede ser negativo'),
});

export const createExpenseSchema = z.object({
  trip_id: z.string().uuid(),
  title: z.string().min(1, 'Título requerido').max(120),
  amount: z.number().positive('Monto debe ser mayor a 0'),
  currency: z.string().length(3, 'Código de moneda inválido'),
  exchange_rate: z.number().positive(),
  base_amount: z.number().nonnegative(),
  category: z.enum(categories),
  description: z.string().max(500).nullable().optional(),
  expense_date: z.string().optional(),
  receipt_url: z.string().url().nullable().optional(),
  splits: z
    .array(splitInputSchema)
    .min(1, 'Debe haber al menos un split'),
}).refine(
  (data) => {
    const splitsTotal = data.splits.reduce(
      (sum, s) => sum + s.amount_owed, 0,
    );
    return Math.abs(splitsTotal - data.amount) < 0.01;
  },
  { message: 'La suma de splits debe ser igual al monto total' },
);

export type CreateExpenseFormData = z.infer<
  typeof createExpenseSchema
>;
