import { View, Text } from 'react-native';
import { Bot } from 'lucide-react-native';

export function ThinkingIndicator() {
  return (
    <View className="items-start mb-3">
      <View className="flex-row items-center gap-1.5 mb-1 ml-1">
        <Bot size={12} color="#8B5CF6" />
        <Text className="text-xs font-medium text-violet-600">
          Voya Concierge
        </Text>
      </View>
      <View className="bg-white border border-neutral-100 rounded-2xl rounded-bl-md px-4 py-3">
        <View className="flex-row gap-1.5">
          <View className="w-2 h-2 rounded-full bg-neutral-300 animate-pulse" />
          <View
            className="w-2 h-2 rounded-full bg-neutral-300 animate-pulse"
            style={{ animationDelay: '150ms' } as never}
          />
          <View
            className="w-2 h-2 rounded-full bg-neutral-300 animate-pulse"
            style={{ animationDelay: '300ms' } as never}
          />
        </View>
      </View>
    </View>
  );
}
