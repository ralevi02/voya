import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { useAuthStore } from '@/stores/auth-store';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { TripCard } from '@/features/trips/components/trip-card';
import { EmptyTrips } from '@/features/trips/components/empty-trips';
import { LoadingSpinner } from '@/shared/components/ui/loading-spinner';
import { ErrorView } from '@/shared/components/ui/error-view';
import type { Trip } from '@/features/trips/types/trip.types';

export default function TripsScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { data: trips, isLoading, error, refetch } = useTrips(user?.id);

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (error) return <ErrorView message={error.message} onRetry={refetch} />;

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="flex-row items-center justify-between px-6 pt-2 pb-4">
        <Text className="text-3xl font-bold text-neutral-900">
          Mis Viajes
        </Text>
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-primary-600"
          onPress={() => router.push('/trip/create')}
        >
          <Plus size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      {!trips?.length ? (
        <EmptyTrips />
      ) : (
        <FlatList<Trip>
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TripCard trip={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
