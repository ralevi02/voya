import type { ExpenseCategory } from '../types/expense.types';

interface CategoryConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const CATEGORY_CONFIG: Record<
  ExpenseCategory,
  CategoryConfig
> = {
  food: {
    label: 'Comida',
    icon: 'UtensilsCrossed',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
  },
  transport: {
    label: 'Transporte',
    icon: 'Car',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
  },
  lodging: {
    label: 'Alojamiento',
    icon: 'BedDouble',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
  activity: {
    label: 'Actividad',
    icon: 'Ticket',
    color: '#22C55E',
    bgColor: '#F0FDF4',
  },
  shopping: {
    label: 'Compras',
    icon: 'ShoppingBag',
    color: '#EC4899',
    bgColor: '#FDF2F8',
  },
  health: {
    label: 'Salud',
    icon: 'Heart',
    color: '#EF4444',
    bgColor: '#FEF2F2',
  },
  communication: {
    label: 'Comunicación',
    icon: 'Wifi',
    color: '#06B6D4',
    bgColor: '#ECFEFF',
  },
  other: {
    label: 'Otro',
    icon: 'MoreHorizontal',
    color: '#737373',
    bgColor: '#F5F5F5',
  },
};

export const CATEGORIES: ExpenseCategory[] = [
  'food', 'transport', 'lodging', 'activity',
  'shopping', 'health', 'communication', 'other',
];
