import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/config';
import { createExpenseWithSplits } from '../services/expenses.service';
import { createExpenseSchema } from '../types/schemas';
import type { CreateExpenseInput } from '../types/expense.types';

export function useCreateExpense(tripId: string) {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (input: CreateExpenseInput) =>
      createExpenseWithSplits(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.expenses(tripId),
      });
    },
    onError: (err: Error) => setFormError(err.message),
  });

  const submit = useCallback(
    (data: CreateExpenseInput) => {
      setFormError(null);
      const result = createExpenseSchema.safeParse(data);
      if (!result.success) {
        const msg = result.error.issues[0]?.message;
        setFormError(msg ?? 'Datos inválidos');
        return;
      }
      mutation.mutate(data);
    },
    [mutation],
  );

  return {
    submit,
    formError,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
