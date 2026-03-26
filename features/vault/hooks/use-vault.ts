import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/config';
import { getTripDocuments } from '../services/vault.service';

export function useVault(tripId: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.vaultTrip(tripId ?? ''),
    queryFn: () => getTripDocuments(tripId!),
    enabled: !!tripId,
  });
}
