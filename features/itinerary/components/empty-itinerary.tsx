import { View, Text, Pressable, ScrollView } from 'react-native';
import {
  CalendarDays,
  Plane,
  BedDouble,
  UtensilsCrossed,
  MapPin,
} from 'lucide-react-native';
import { SUGGESTION_CARDS } from '../constants/item-types';
import { ITEM_TYPE_CONFIG } from '../constants/item-types';
import type { ItineraryItemType } from '../types/itinerary.types';

const ICON_MAP = {
  Plane,
  BedDouble,
  UtensilsCrossed,
  MapPin,
} as const;

interface EmptyItineraryProps {
  onAddItem: (type: ItineraryItemType) => void;
}

export function EmptyItinerary({ onAddItem }: EmptyItineraryProps) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="items-center px-6 pt-12 pb-8"
    >
      <View className="rounded-full bg-primary-50 p-5 mb-4">
        <CalendarDays size={40} color="#4F46E5" />
      </View>

      <Text className="text-xl font-bold text-neutral-900 text-center">
        Tu itinerario está vacío
      </Text>
      <Text className="text-base text-neutral-500 text-center mt-2 mb-8">
        Empieza a planificar tu viaje agregando actividades
      </Text>

      <View className="w-full gap-3">
        {SUGGESTION_CARDS.map((card) => {
          const config = ITEM_TYPE_CONFIG[card.type];
          const Icon =
            ICON_MAP[config.icon as keyof typeof ICON_MAP];

          return (
            <Pressable
              key={card.type}
              className="flex-row items-center bg-white rounded-xl p-4 active:opacity-70"
              style={{ borderLeftWidth: 3, borderLeftColor: config.color }}
              onPress={() => onAddItem(card.type)}
            >
              <View
                className="rounded-full items-center justify-center mr-3"
                style={{
                  backgroundColor: config.bgColor,
                  width: 40,
                  height: 40,
                }}
              >
                <Icon size={20} color={config.color} />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-neutral-900">
                  {card.title}
                </Text>
                <Text className="text-xs text-neutral-500 mt-0.5">
                  {card.subtitle}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
