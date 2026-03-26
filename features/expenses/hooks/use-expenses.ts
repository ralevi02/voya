import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/config';
import { getExpensesByTrip } from '../services/expenses.service';

export function useExpenses(tripId: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.expenses(tripId ?? ''),
    queryFn: () => getExpensesByTrip(tripId!),
    enabled: !!tripId,
  });
}
