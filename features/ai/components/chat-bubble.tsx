import { View, Text, Pressable } from 'react-native';
import { CalendarPlus, Bot } from 'lucide-react-native';
import type { ChatMessage } from '../types/ai.types';

interface ChatBubbleProps {
  message: ChatMessage;
  onAddToItinerary?: () => void;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ChatBubble({
  message,
  onAddToItinerary,
}: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View
      className={`mb-3 ${isUser ? 'items-end' : 'items-start'}`}
    >
      {!isUser && (
        <View className="flex-row items-center gap-1.5 mb-1 ml-1">
          <Bot size={12} color="#8B5CF6" />
          <Text className="text-xs font-medium text-violet-600">
            Voya Concierge
          </Text>
        </View>
      )}

      <View
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-primary-600 rounded-br-md'
            : 'bg-white border border-neutral-100 rounded-bl-md'
        }`}
        style={
          !isUser
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 1,
              }
            : undefined
        }
      >
        <Text
          className={`text-sm leading-5 ${
            isUser ? 'text-white' : 'text-neutral-800'
          }`}
        >
          {message.content}
        </Text>
      </View>

      {/* Action button for itinerary suggestions */}
      {message.has_itinerary_action && onAddToItinerary && (
        <Pressable
          className="flex-row items-center gap-1.5 mt-1.5 ml-1 px-3 py-1.5 bg-violet-50 rounded-lg"
          onPress={onAddToItinerary}
        >
          <CalendarPlus size={14} color="#7C3AED" />
          <Text className="text-xs font-medium text-violet-700">
            Añadir al itinerario
          </Text>
        </Pressable>
      )}

      <Text
        className={`text-[10px] mt-1 ${
          isUser
            ? 'text-neutral-400 mr-1'
            : 'text-neutral-300 ml-1'
        }`}
      >
        {formatTime(message.timestamp)}
      </Text>
    </View>
  );
}
