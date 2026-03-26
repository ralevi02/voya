import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/config';
import { createTrip } from '../services/trips.service';
import { createTripSchema } from '../types/schemas';
import type { CreateTripInput } from '../types/trip.types';
import { getRandomGradient } from '../constants/cover-gradients';

const TOTAL_STEPS = 3;

export function useCreateTrip() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<CreateTripInput>>({
    base_currency: 'USD',
    cover_image: `gradient:${getRandomGradient().id}`,
  });

  const mutation = useMutation({
    mutationFn: (input: CreateTripInput) => createTrip(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.trips });
      router.replace('/(tabs)');
    },
    onError: (err: Error) => {
      setFormError(err.message);
    },
  });

  const updateFormData = useCallback(
    (data: Partial<CreateTripInput>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    [],
  );

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const prevStep = useCallback(() => {
    if (step === 0) {
      router.back();
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
  }, [step, router]);

  const submit = useCallback(() => {
    setFormError(null);
    const result = createTripSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      setFormError(firstError ?? 'Datos inválidos');
      return;
    }
    mutation.mutate(result.data as CreateTripInput);
  }, [formData, mutation]);

  return {
    step,
    totalSteps: TOTAL_STEPS,
    formData,
    formError,
    isSubmitting: mutation.isPending,
    updateFormData,
    nextStep,
    prevStep,
    submit,
  };
}
