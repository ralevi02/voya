import { View, Text } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

interface FormErrorProps {
  message: string | null;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <View className="flex-row items-center gap-2 rounded-lg bg-red-50 px-4 py-3">
      <AlertCircle size={18} color="#EF4444" />
      <Text className="flex-1 text-sm text-red-600">{message}</Text>
    </View>
  );
}
