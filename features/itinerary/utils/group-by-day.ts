import type {
  ItineraryItem,
  ItineraryDay,
} from '../types/itinerary.types';
import { parseDateSafe } from '@/shared/utils/date';

/**
 * Agrupa items de itinerario por día para SectionList.
 * Retorna un array ordenado por fecha ascendente.
 */
export function groupItemsByDay(
  items: ItineraryItem[],
): ItineraryDay[] {
  const map = new Map<string, ItineraryItem[]>();

  for (const item of items) {
    const date = new Date(item.start_time);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const existing = map.get(key) ?? [];
    existing.push(item);
    map.set(key, existing);
  }

  const days: ItineraryDay[] = [];
  for (const [dateKey, dayItems] of map.entries()) {
    const parsed = parseDateSafe(dateKey);
    const label = parsed.toLocaleDateString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    days.push({ date: dateKey, label, items: dayItems });
  }

  days.sort((a, b) => a.date.localeCompare(b.date));
  return days;
}
