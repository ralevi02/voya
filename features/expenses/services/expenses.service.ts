import { supabase } from '@/lib/supabase';
import type {
  ExpenseWithSplits,
  CreateExpenseInput,
} from '../types/expense.types';

export async function getExpensesByTrip(
  tripId: string,
): Promise<ExpenseWithSplits[]> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*, expense_splits(*)')
    .eq('trip_id', tripId)
    .order('expense_date', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ExpenseWithSplits[];
}

export async function createExpenseWithSplits(
  input: CreateExpenseInput,
): Promise<string> {
  const { data, error } = await supabase.rpc(
    'create_expense_with_splits',
    {
      p_trip_id: input.trip_id,
      p_title: input.title,
      p_amount: input.amount,
      p_currency: input.currency,
      p_exchange_rate: input.exchange_rate,
      p_base_amount: input.base_amount,
      p_category: input.category,
      p_description: input.description ?? null,
      p_expense_date: input.expense_date ?? null,
      p_receipt_url: input.receipt_url ?? null,
      p_splits: input.splits,
    },
  );
  if (error) throw error;
  return data as string;
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
