export type SplitMethod = 'equal' | 'exact' | 'percentage' | 'shares';

export interface Expense {
  id: string;
  trip_id: string;
  title: string;
  amount: number;
  currency: string;
  base_amount: number;
  category: string;
  paid_by: string;
  split_method: SplitMethod;
  receipt_url: string | null;
  location_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExpenseSplit {
  id: string;
  expense_id: string;
  user_id: string;
  amount: number;
  is_settled: boolean;
}

export interface DebtSummary {
  from_user_id: string;
  to_user_id: string;
  amount: number;
  currency: string;
}

export interface CreateExpenseInput {
  trip_id: string;
  title: string;
  amount: number;
  currency: string;
  category: string;
  paid_by: string;
  split_method: SplitMethod;
  splits: { user_id: string; amount: number }[];
  receipt_url?: string | null;
  location_name?: string | null;
}
