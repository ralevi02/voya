export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'lodging'
  | 'activity'
  | 'shopping'
  | 'health'
  | 'communication'
  | 'other';

export type SplitMethod = 'equal' | 'manual';

export interface Expense {
  id: string;
  trip_id: string;
  paid_by: string;
  title: string;
  amount: number;
  currency: string;
  exchange_rate: number;
  base_amount: number;
  category: ExpenseCategory;
  description: string | null;
  expense_date: string;
  receipt_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExpenseSplit {
  id: string;
  expense_id: string;
  user_id: string;
  amount_owed: number;
  is_settled: boolean;
  created_at: string;
}

export interface ExpenseWithSplits extends Expense {
  expense_splits: ExpenseSplit[];
}

export interface SplitInput {
  user_id: string;
  amount_owed: number;
}

export interface CreateExpenseInput {
  trip_id: string;
  title: string;
  amount: number;
  currency: string;
  exchange_rate: number;
  base_amount: number;
  category: ExpenseCategory;
  description?: string | null;
  expense_date?: string;
  receipt_url?: string | null;
  splits: SplitInput[];
}

export interface MemberBalance {
  user_id: string;
  totalPaid: number;
  totalOwed: number;
  net: number;
}

export interface Settlement {
  from_user_id: string;
  to_user_id: string;
  amount: number;
}
