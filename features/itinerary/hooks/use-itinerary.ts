import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/config';
import { getItineraryItems } from '../services/itinerary.service';

export function useItinerary(tripId: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.itinerary(tripId ?? ''),
    queryFn: () => getItineraryItems(tripId!),
    enabled: !!tripId,
  });
}
