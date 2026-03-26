import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import { X, Clock, MapPin, FileText } from 'lucide-react-native';
import { ItemTypeIcon } from './item-type-icon';
import { MapPreview } from './map-preview';
import { LinkedDocuments } from '@/features/vault/components/linked-documents';
import { ITEM_TYPE_CONFIG } from '../constants/item-types';
import type { ItineraryItem } from '../types/itinerary.types';

interface ItemDetailModalProps {
  item: ItineraryItem | null;
  visible: boolean;
  onClose: () => void;
}

function formatDetailTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDetailDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function ItemDetailModal({
  item,
  visible,
  onClose,
}: ItemDetailModalProps) {
  if (!item) return null;

  const config = ITEM_TYPE_CONFIG[item.type];
  const hasLocation =
    item.location_lat != null && item.location_lng != null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-3 border-b border-neutral-100">
          <View className="flex-row items-center gap-3">
            <ItemTypeIcon type={item.type} size={20} />
            <Text className="text-xs font-medium" style={{ color: config.color }}>
              {config.label}
            </Text>
          </View>
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
            onPress={onClose}
          >
            <X size={16} color="#525252" />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-6 pt-4">
          <Text className="text-2xl font-bold text-neutral-900">
            {item.title}
          </Text>

          {/* Time */}
          <View className="flex-row items-center gap-2 mt-4">
            <Clock size={16} color="#737373" />
            <Text className="text-sm text-neutral-600">
              {formatDetailDate(item.start_time)},{' '}
              {formatDetailTime(item.start_time)}
              {item.end_time &&
                ` - ${formatDetailTime(item.end_time)}`}
            </Text>
          </View>

          {/* Location */}
          {item.location_name && (
            <View className="flex-row items-center gap-2 mt-3">
              <MapPin size={16} color="#737373" />
              <Text className="text-sm text-neutral-600">
                {item.location_name}
              </Text>
            </View>
          )}

          {/* Map */}
          {hasLocation && item.location_name && (
            <View className="mt-4">
              <MapPreview
                locationName={item.location_name}
                lat={item.location_lat!}
                lng={item.location_lng!}
              />
            </View>
          )}

          {/* Notes */}
          {item.notes && (
            <View className="mt-4">
              <View className="flex-row items-center gap-2 mb-2">
                <FileText size={16} color="#737373" />
                <Text className="text-sm font-medium text-neutral-700">
                  Notas
                </Text>
              </View>
              <Text className="text-sm text-neutral-600 leading-5">
                {item.notes}
              </Text>
            </View>
          )}

          {/* Linked Documents */}
          <LinkedDocuments itemId={item.id} />
        </ScrollView>
      </View>
    </Modal>
  );
}
