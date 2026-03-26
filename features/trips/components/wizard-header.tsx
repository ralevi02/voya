import { View, Text, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface WizardHeaderProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
}

export function WizardHeader({ step, totalSteps, onBack }: WizardHeaderProps) {
  return (
    <View className="flex-row items-center gap-3 pb-4">
      <Pressable
        className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100"
        onPress={onBack}
      >
        <ChevronLeft size={20} color="#404040" />
      </Pressable>

      <View className="flex-1 flex-row gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i <= step ? 'bg-primary-600' : 'bg-neutral-200'
            }`}
          />
        ))}
      </View>

      <Text className="text-sm text-neutral-400">
        {step + 1}/{totalSteps}
      </Text>
    </View>
  );
}
