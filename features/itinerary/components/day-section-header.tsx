import { View, Text } from 'react-native';

interface DaySectionHeaderProps {
  label: string;
  dayNumber: number;
}

export function DaySectionHeader({
  label,
  dayNumber,
}: DaySectionHeaderProps) {
  return (
    <View className="flex-row items-center gap-3 py-3">
      <View className="h-8 w-8 rounded-full bg-primary-600 items-center justify-center">
        <Text className="text-xs font-bold text-white">
          {dayNumber}
        </Text>
      </View>
      <Text className="text-sm font-semibold text-neutral-700 capitalize">
        {label}
      </Text>
    </View>
  );
}
