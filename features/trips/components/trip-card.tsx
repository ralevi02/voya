import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { MapPin, Calendar } from 'lucide-react-native';
import { formatDate, getDaysBetween } from '@/shared/utils/date';
import { GradientCover } from './gradient-cover';
import type { Trip } from '../types/trip.types';

interface TripCardProps {
  trip: Trip;
}

function parseCoverImage(cover: string | null) {
  if (!cover) return { type: 'gradient' as const, id: 'ocean' };
  if (cover.startsWith('gradient:')) {
    return { type: 'gradient' as const, id: cover.replace('gradient:', '') };
  }
  return { type: 'url' as const, url: cover };
}

export function TripCard({ trip }: TripCardProps) {
  const router = useRouter();
  const cover = parseCoverImage(trip.cover_image);
  const days = getDaysBetween(trip.start_date, trip.end_date);

  return (
    <Pressable
      className="mb-4 overflow-hidden rounded-2xl bg-white shadow-sm"
      onPress={() => router.push(`/trip/${trip.id}`)}
    >
      {cover.type === 'gradient' ? (
        <GradientCover gradientId={cover.id} className="h-36 w-full" />
      ) : (
        <Image
          source={{ uri: cover.url }}
          className="h-36 w-full"
          contentFit="cover"
        />
      )}

      <View className="p-4 gap-2">
        <Text className="text-lg font-bold text-neutral-900">
          {trip.name}
        </Text>

        <View className="flex-row items-center gap-1.5">
          <MapPin size={14} color="#737373" />
          <Text className="text-sm text-neutral-500">
            {trip.destination}
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5">
          <Calendar size={14} color="#737373" />
          <Text className="text-sm text-neutral-500">
            {formatDate(trip.start_date, 'es-CL')} —{' '}
            {formatDate(trip.end_date, 'es-CL')}
          </Text>
          <View className="ml-auto rounded-full bg-primary-50 px-2.5 py-0.5">
            <Text className="text-xs font-medium text-primary-600">
              {days} días
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
