import { z } from 'zod';

const splitMethods = ['equal', 'exact', 'percentage', 'shares'] as const;

const expenseSplitInputSchema = z.object({
  user_id: z.string().uuid(),
  amount: z.number().nonnegative(),
});

export const createExpenseSchema = z.object({
  trip_id: z.string().uuid(),
  title: z.string().min(1, 'Título requerido'),
  amount: z.number().positive('Monto debe ser positivo'),
  currency: z.string().length(3, 'Código de moneda inválido'),
  category: z.string().min(1, 'Categoría requerida'),
  paid_by: z.string().uuid(),
  split_method: z.enum(splitMethods),
  splits: z.array(expenseSplitInputSchema).min(1),
  receipt_url: z.string().url().nullable().optional(),
  location_name: z.string().nullable().optional(),
});

export const expenseSchema = z.object({
  id: z.string().uuid(),
  trip_id: z.string().uuid(),
  title: z.string(),
  amount: z.number(),
  currency: z.string(),
  base_amount: z.number(),
  category: z.string(),
  paid_by: z.string().uuid(),
  split_method: z.enum(splitMethods),
  receipt_url: z.string().url().nullable(),
  location_name: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type ExpenseResponse = z.infer<typeof expenseSchema>;
