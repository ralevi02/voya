import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/config';
import { createItineraryItem } from '../services/itinerary.service';
import { createItineraryItemSchema } from '../types/schemas';
import type { CreateItineraryItemInput } from '../types/itinerary.types';

export function useCreateItineraryItem(tripId: string) {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (input: CreateItineraryItemInput) =>
      createItineraryItem(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.itinerary(tripId),
      });
    },
    onError: (err: Error) => {
      setFormError(err.message);
    },
  });

  const submit = useCallback(
    (data: CreateItineraryItemInput) => {
      setFormError(null);
      const result = createItineraryItemSchema.safeParse(data);
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
