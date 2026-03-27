import type { ExpenseCategory } from '@/features/expenses/types/expense.types';

export interface ReceiptData {
  amount: number;
  currency: string;
  category: ExpenseCategory;
  merchant: string;
  date: string | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  has_itinerary_action?: boolean;
  timestamp: number;
}

export interface TripContext {
  trip_name: string;
  destination: string;
  start_date: string;
  end_date: string;
  itinerary_summary: string;
}

export interface ConciergeResponse {
  reply: string;
  has_itinerary_action: boolean;
}
