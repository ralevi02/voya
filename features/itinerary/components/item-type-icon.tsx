import { View } from 'react-native';
import {
  Plane,
  BedDouble,
  UtensilsCrossed,
  MapPin,
} from 'lucide-react-native';
import type { ItineraryItemType } from '../types/itinerary.types';
import { ITEM_TYPE_CONFIG } from '../constants/item-types';

const ICON_MAP = {
  Plane,
  BedDouble,
  UtensilsCrossed,
  MapPin,
} as const;

interface ItemTypeIconProps {
  type: ItineraryItemType;
  size?: number;
}

export function ItemTypeIcon({ type, size = 20 }: ItemTypeIconProps) {
  const config = ITEM_TYPE_CONFIG[type];
  const IconComponent =
    ICON_MAP[config.icon as keyof typeof ICON_MAP];

  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        backgroundColor: config.bgColor,
        width: size + 16,
        height: size + 16,
      }}
    >
      <IconComponent size={size} color={config.color} />
    </View>
  );
}
