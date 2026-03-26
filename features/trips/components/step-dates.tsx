import { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { stepDatesSchema } from '../types/schemas';
import type { CreateTripInput } from '../types/trip.types';

interface FieldErrors {
  start_date?: string;
  end_date?: string;
}

interface StepDatesProps {
  formData: Partial<CreateTripInput>;
  onUpdate: (data: Partial<CreateTripInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDates({
  formData,
  onUpdate,
  onNext,
  onBack,
}: StepDatesProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleNext() {
    const result = stepDatesSchema.safeParse({
      start_date: formData.start_date,
      end_date: formData.end_date,
    });
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onNext();
  }

  return (
    <View className="flex-1 justify-between">
      <View className="gap-6">
        <View className="items-center gap-3 pt-8">
          <View className="rounded-full bg-primary-50 p-4">
            <Calendar size={32} color="#4F46E5" />
          </View>
          <Text className="text-2xl font-bold text-neutral-900">
            ¿Cuándo viajamos?
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            Selecciona las fechas de ida y vuelta
          </Text>
        </View>

        {/* TODO: Reemplazar con DatePicker nativo */}
        <Input
          label="Fecha de ida"
          placeholder="YYYY-MM-DD"
          value={formData.start_date ?? ''}
          onChangeText={(text) => onUpdate({ start_date: text })}
          error={errors.start_date}
        />
        <Input
          label="Fecha de vuelta"
          placeholder="YYYY-MM-DD"
          value={formData.end_date ?? ''}
          onChangeText={(text) => onUpdate({ end_date: text })}
          error={errors.end_date}
        />
      </View>

      <View className="gap-3 pb-4">
        <Button title="Siguiente" onPress={handleNext} />
        <Button title="Anterior" variant="ghost" onPress={onBack} />
      </View>
    </View>
  );
}
