import { useState } from 'react';
import { View, Text } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { stepDestinationSchema } from '../types/schemas';
import type { CreateTripInput } from '../types/trip.types';

interface StepDestinationProps {
  formData: Partial<CreateTripInput>;
  onUpdate: (data: Partial<CreateTripInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDestination({
  formData,
  onUpdate,
  onNext,
  onBack,
}: StepDestinationProps) {
  const [error, setError] = useState<string | undefined>();

  function handleNext() {
    const result = stepDestinationSchema.safeParse({
      destination: formData.destination,
    });
    if (!result.success) {
      setError(result.error.issues[0]?.message);
      return;
    }
    setError(undefined);
    onNext();
  }

  return (
    <View className="flex-1 justify-between">
      <View className="gap-6">
        <View className="items-center gap-3 pt-8">
          <View className="rounded-full bg-primary-50 p-4">
            <MapPin size={32} color="#4F46E5" />
          </View>
          <Text className="text-2xl font-bold text-neutral-900">
            ¿A dónde vamos?
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            Escribe el destino de tu viaje
          </Text>
        </View>

        {/* Preparado para Google Places Autocomplete */}
        <Input
          label="Destino"
          placeholder="Ej: Tokyo, Japón"
          value={formData.destination ?? ''}
          onChangeText={(text) => onUpdate({ destination: text })}
          error={error}
        />
      </View>

      <View className="gap-3 pb-4">
        <Button title="Siguiente" onPress={handleNext} />
        <Button title="Cancelar" variant="ghost" onPress={onBack} />
      </View>
    </View>
  );
}
