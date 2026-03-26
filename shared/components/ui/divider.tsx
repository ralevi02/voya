import { View, Text } from 'react-native';

interface DividerProps {
  text?: string;
}

export function Divider({ text }: DividerProps) {
  if (!text) {
    return <View className="h-px bg-neutral-200" />;
  }

  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-1 h-px bg-neutral-200" />
      <Text className="text-sm text-neutral-400">{text}</Text>
      <View className="flex-1 h-px bg-neutral-200" />
    </View>
  );
}
