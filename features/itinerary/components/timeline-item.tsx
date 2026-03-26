import { View, Text, Pressable } from 'react-native';
import { Clock, ChevronRight } from 'lucide-react-native';
import { ItemTypeIcon } from './item-type-icon';
import { ITEM_TYPE_CONFIG } from '../constants/item-types';
import type { ItineraryItem } from '../types/itinerary.types';

interface TimelineItemProps {
  item: ItineraryItem;
  onPress: (item: ItineraryItem) => void;
  isLast?: boolean;
}

function formatItemTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TimelineItem({
  item,
  onPress,
  isLast = false,
}: TimelineItemProps) {
  const config = ITEM_TYPE_CONFIG[item.type];

  return (
    <Pressable
      className="flex-row active:opacity-70"
      onPress={() => onPress(item)}
    >
      {/* Timeline line + dot */}
      <View className="items-center mr-3" style={{ width: 36 }}>
        <ItemTypeIcon type={item.type} size={18} />
        {!isLast && (
          <View className="flex-1 w-0.5 bg-neutral-200 mt-1" />
        )}
      </View>

      {/* Content card */}
      <View
        className="flex-1 bg-white rounded-xl p-3 mb-3"
        style={{
          borderLeftWidth: 3,
          borderLeftColor: config.color,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Text
            className="text-base font-semibold text-neutral-900 flex-1"
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <ChevronRight size={16} color="#A3A3A3" />
        </View>

        <View className="flex-row items-center mt-1 gap-1">
          <Clock size={12} color="#737373" />
          <Text className="text-xs text-neutral-500">
            {formatItemTime(item.start_time)}
            {item.end_time &&
              ` - ${formatItemTime(item.end_time)}`}
          </Text>
        </View>

        {item.location_name && (
          <Text
            className="text-xs text-neutral-400 mt-1"
            numberOfLines={1}
          >
            {item.location_name}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
