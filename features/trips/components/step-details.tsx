import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { FormError } from '@/shared/components/ui/form-error';
import { COVER_GRADIENTS } from '../constants/cover-gradients';
import { stepDetailsSchema } from '../types/schemas';
import type { CreateTripInput } from '../types/trip.types';

interface StepDetailsProps {
  formData: Partial<CreateTripInput>;
  formError: string | null;
  isSubmitting: boolean;
  onUpdate: (data: Partial<CreateTripInput>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function StepDetails({
  formData,
  formError,
  isSubmitting,
  onUpdate,
  onSubmit,
  onBack,
}: StepDetailsProps) {
  const [nameError, setNameError] = useState<string | undefined>();
  const selectedGradient = formData.cover_image?.replace('gradient:', '');

  function handleSubmit() {
    const result = stepDetailsSchema.safeParse({ name: formData.name });
    if (!result.success) {
      setNameError(result.error.issues[0]?.message);
      return;
    }
    setNameError(undefined);
    onSubmit();
  }

  return (
    <View className="flex-1 justify-between">
      <View className="gap-6">
        <View className="items-center gap-3 pt-8">
          <View className="rounded-full bg-primary-50 p-4">
            <Sparkles size={32} color="#4F46E5" />
          </View>
          <Text className="text-2xl font-bold text-neutral-900">
            Últimos detalles
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            Dale nombre y estilo a tu viaje
          </Text>
        </View>

        <FormError message={formError} />

        <Input
          label="Nombre del viaje"
          placeholder="Ej: Aventura en Tokyo 2026"
          value={formData.name ?? ''}
          onChangeText={(text) => onUpdate({ name: text })}
          error={nameError}
        />

        <View className="gap-2">
          <Text className="text-sm font-medium text-neutral-700">
            Portada
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3 py-1">
              {COVER_GRADIENTS.map((g) => (
                <Pressable
                  key={g.id}
                  onPress={() => onUpdate({ cover_image: `gradient:${g.id}` })}
                  className={`rounded-xl overflow-hidden ${selectedGradient === g.id ? 'border-2 border-primary-600' : 'border-2 border-transparent'}`}
                >
                  <LinearGradient
                    colors={g.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ width: 72, height: 48, borderRadius: 10 }}
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <View className="gap-3 pb-4">
        <Button
          title="Crear Viaje"
          onPress={handleSubmit}
          isLoading={isSubmitting}
        />
        <Button title="Anterior" variant="ghost" onPress={onBack} />
      </View>
    </View>
  );
}
