import { useRef, useEffect, useMemo } from 'react';
import {
  View, Text, FlatList, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';
import { useAuthStore } from '@/stores/auth-store';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { useItinerary } from '@/features/itinerary/hooks/use-itinerary';
import { useConcierge } from '@/features/ai/hooks/use-concierge';
import { ChatBubble } from '@/features/ai/components/chat-bubble';
import { ChatInput } from '@/features/ai/components/chat-input';
import { ThinkingIndicator } from '@/features/ai/components/thinking-indicator';
import { DashboardShell } from '@/shared/components/navigation/dashboard-shell';
import type { TripContext } from '@/features/ai/types/ai.types';

function buildItinerarySummary(
  items: { title: string; start_time: string; type: string }[],
): string {
  if (!items.length) return 'No hay actividades programadas.';
  return items
    .slice(0, 15)
    .map((i) => `- ${i.title} (${i.type}, ${i.start_time.split('T')[0]})`)
    .join('\n');
}

export default function TripChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const { data: trips } = useTrips(user?.id);
  const { data: items } = useItinerary(id);
  const listRef = useRef<FlatList>(null);

  const trip = useMemo(
    () => trips?.find((t) => t.id === id),
    [trips, id],
  );

  const tripContext: TripContext = useMemo(() => ({
    trip_name: trip?.name ?? 'Mi viaje',
    destination: trip?.destination ?? '',
    start_date: trip?.start_date ?? '',
    end_date: trip?.end_date ?? '',
    itinerary_summary: buildItinerarySummary(items ?? []),
  }), [trip, items]);

  const { messages, send, isSending, error } =
    useConcierge(id!, tripContext);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  return (
    <DashboardShell>
    <SafeAreaView className="flex-1 bg-neutral-50" edges={['bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {messages.length === 0 ? (
          <WelcomeState tripName={trip?.name ?? 'tu viaje'} />
        ) : (
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(m) => m.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              isSending ? <ThinkingIndicator /> : null
            }
          />
        )}

        {error && (
          <Text className="text-xs text-red-500 text-center px-4 pb-1">
            {error}
          </Text>
        )}

        <ChatInput onSend={send} isSending={isSending} />
      </KeyboardAvoidingView>
    </SafeAreaView>
    </DashboardShell>
  );
}

function WelcomeState({ tripName }: { tripName: string }) {
  return (
    <View className="flex-1 items-center justify-center px-8 gap-4">
      <View className="rounded-full bg-violet-50 p-5">
        <MessageCircle size={40} color="#7C3AED" />
      </View>
      <Text className="text-xl font-bold text-neutral-900 text-center">
        Voya Concierge
      </Text>
      <Text className="text-base text-neutral-500 text-center">
        Tu asistente de viaje para {tripName}.
        Pregúntame sobre restaurantes, actividades,
        transporte o cualquier cosa del destino.
      </Text>
    </View>
  );
}
