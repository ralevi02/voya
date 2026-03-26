import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/config';
import { getUserTrips } from '../services/trips.service';

export function useTrips(userId: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.trips,
    queryFn: () => getUserTrips(userId!),
    enabled: !!userId,
  });
}
