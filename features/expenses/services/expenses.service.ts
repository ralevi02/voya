import { supabase } from '@/lib/supabase';
import type { Expense, ExpenseSplit } from '../types/expense.types';
import type { CreateExpenseInput } from '../types/schemas';

export async function getExpensesByTrip(
  tripId: string
): Promise<Expense[]> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('trip_id', tripId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Expense[];
}

export async function getExpensesByUser(
  userId: string
): Promise<Expense[]> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('paid_by', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Expense[];
}

export async function createExpense(
  input: CreateExpenseInput
): Promise<Expense> {
  const { splits, ...expenseData } = input;
  const { data, error } = await supabase
    .from('expenses')
    .insert(expenseData)
    .select()
    .single();
  if (error) throw error;

  const expense = data as Expense;
  const splitRows = splits.map((s) => ({
    expense_id: expense.id,
    ...s,
  }));
  const { error: splitError } = await supabase
    .from('expense_splits')
    .insert(splitRows);
  if (splitError) throw splitError;

  return expense;
}

export async function getSplitsByExpense(
  expenseId: string
): Promise<ExpenseSplit[]> {
  const { data, error } = await supabase
    .from('expense_splits')
    .select('*')
    .eq('expense_id', expenseId);
  if (error) throw error;
  return (data ?? []) as ExpenseSplit[];
}
