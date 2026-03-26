import { View } from 'react-native';
import {
  UtensilsCrossed, Car, BedDouble, Ticket,
  ShoppingBag, Heart, Wifi, MoreHorizontal,
} from 'lucide-react-native';
import type { ExpenseCategory } from '../types/expense.types';
import { CATEGORY_CONFIG } from '../constants/categories';

const ICON_MAP = {
  UtensilsCrossed, Car, BedDouble, Ticket,
  ShoppingBag, Heart, Wifi, MoreHorizontal,
} as const;

interface CategoryIconProps {
  category: ExpenseCategory;
  size?: number;
}

export function CategoryIcon({
  category,
  size = 20,
}: CategoryIconProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = ICON_MAP[config.icon as keyof typeof ICON_MAP];

  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        backgroundColor: config.bgColor,
        width: size + 16,
        height: size + 16,
      }}
    >
      <Icon size={size} color={config.color} />
    </View>
  );
}
