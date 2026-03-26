import type { ItineraryItemType } from '../types/itinerary.types';

interface ItemTypeConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const ITEM_TYPE_CONFIG: Record<
  ItineraryItemType,
  ItemTypeConfig
> = {
  flight: {
    label: 'Vuelo',
    icon: 'Plane',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
  },
  hotel: {
    label: 'Alojamiento',
    icon: 'BedDouble',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
  food: {
    label: 'Comida',
    icon: 'UtensilsCrossed',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
  },
  activity: {
    label: 'Actividad',
    icon: 'MapPin',
    color: '#22C55E',
    bgColor: '#F0FDF4',
  },
};

export const ITEM_TYPES: ItineraryItemType[] = [
  'activity',
  'food',
  'flight',
  'hotel',
];

export const SUGGESTION_CARDS = [
  {
    type: 'flight' as ItineraryItemType,
    title: '¿Ya tienes vuelo?',
    subtitle: 'Agrega tu vuelo para tener todo organizado',
  },
  {
    type: 'hotel' as ItineraryItemType,
    title: '¿Dónde te hospedarás?',
    subtitle: 'Agrega tu hotel o alojamiento',
  },
  {
    type: 'food' as ItineraryItemType,
    title: '¿Algún restaurante en mente?',
    subtitle: 'Guarda los lugares donde quieres comer',
  },
  {
    type: 'activity' as ItineraryItemType,
    title: '¿Qué quieres hacer?',
    subtitle: 'Planifica actividades para tu viaje',
  },
];
