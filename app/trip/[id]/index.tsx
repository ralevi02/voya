import { useState, useCallback, useMemo } from 'react';
import { View, Text, SectionList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useItinerary } from '@/features/itinerary/hooks/use-itinerary';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { useAuthStore } from '@/stores/auth-store';
import { groupItemsByDay } from '@/features/itinerary/utils/group-by-day';
import { TimelineItem } from '@/features/itinerary/components/timeline-item';
import { DaySectionHeader } from '@/features/itinerary/components/day-section-header';
import { EmptyItinerary } from '@/features/itinerary/components/empty-itinerary';
import { FabAddItem } from '@/features/itinerary/components/fab-add-item';
import { AddItemModal } from '@/features/itinerary/components/add-item-modal';
import { ItemDetailModal } from '@/features/itinerary/components/item-detail-modal';
import { LoadingSpinner } from '@/shared/components/ui/loading-spinner';
import { ErrorView } from '@/shared/components/ui/error-view';
import type { ItineraryItem, ItineraryItemType } from '@/features/itinerary/types/itinerary.types';

export default function TripItineraryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const { data: trips } = useTrips(user?.id);
  const { data: items, isLoading, error, refetch } = useItinerary(id);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [defaultType, setDefaultType] = useState<ItineraryItemType>('activity');
  const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(null);

  const trip = useMemo(
    () => trips?.find((t) => t.id === id),
    [trips, id],
  );

  const sections = useMemo(() => {
    if (!items?.length) return [];
    return groupItemsByDay(items).map((day) => ({
      date: day.date,
      label: day.label,
      data: day.items,
    }));
  }, [items]);

  const handleAddItem = useCallback((type: ItineraryItemType) => {
    setDefaultType(type);
    setAddModalVisible(true);
  }, []);

  const handleItemPress = useCallback((item: ItineraryItem) => {
    setSelectedItem(item);
  }, []);

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (error) return <ErrorView message={error.message} onRetry={refetch} />;

  const hasItems = !!items?.length;

  return (
    <SafeAreaView className="flex-1 bg-neutral-50" edges={['bottom']}>
      {/* Header */}
      <View className="px-6 pt-2 pb-3 bg-white border-b border-neutral-100">
        <Text className="text-2xl font-bold text-neutral-900" numberOfLines={1}>
          {trip?.name ?? 'Itinerario'}
        </Text>
        {trip && (
          <Text className="text-sm text-neutral-500 mt-0.5">
            {trip.destination}
          </Text>
        )}
      </View>

      {!hasItems ? (
        <EmptyItinerary onAddItem={handleAddItem} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <DaySectionHeader
              label={section.label}
              dayNumber={sections.indexOf(section) + 1}
            />
          )}
          renderItem={({ item, index, section }) => (
            <TimelineItem
              item={item}
              onPress={handleItemPress}
              isLast={index === section.data.length - 1}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FabAddItem onPress={() => setAddModalVisible(true)} />

      <AddItemModal
        tripId={id!}
        visible={addModalVisible}
        defaultType={defaultType}
        defaultDate={trip?.start_date}
        onClose={() => setAddModalVisible(false)}
      />

      <ItemDetailModal
        item={selectedItem}
        visible={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </SafeAreaView>
  );
}
