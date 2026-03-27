import { useMemo } from 'react';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { useItinerary } from '@/features/itinerary/hooks/use-itinerary';
import { useExpenses } from '@/features/expenses/hooks/use-expenses';
import { useAuthStore } from '@/stores/auth-store';
import { calculateBalances } from '@/features/expenses/utils/settlement';
import type { DashboardTrip, TimelineEvent } from '../types/dashboard.types';

export function useDashboardData(tripId: string) {
  const user = useAuthStore((s) => s.user);
  const { data: trips } = useTrips(user?.id);
  const { data: items } = useItinerary(tripId);
  const { data: expenses } = useExpenses(tripId);

  const trip = useMemo(
    () => trips?.find((t) => t.id === tripId),
    [trips, tripId],
  );

  return useMemo((): DashboardTrip => {
    const memberIds = getMemberIds(trip, user?.id);
    const balances = expenses?.length
      ? calculateBalances(expenses, memberIds)
      : [];
    const myBal = balances.find((b) => b.user_id === user?.id);
    const totalSpent = (expenses ?? []).reduce(
      (s, e) => s + e.base_amount, 0,
    );

    return {
      id: tripId,
      name: trip?.name ?? 'Mi viaje',
      year: trip?.start_date?.split('-')[0] ?? '2026',
      onlineCount: memberIds.length,
      activeFlight: null,
      nextEvent: null,
      balance: Math.round(myBal?.totalPaid ?? 0),
      balanceStatus: totalSpent > 0 ? 'Activo' : 'Sin gastos',
      members: memberIds.slice(0, 5).map((uid) => ({
        initials: uid === user?.id ? 'TÚ' : uid.slice(0, 2).toUpperCase(),
        bg: '#3A3C44',
      })),
      memberCount: memberIds.length,
      finance: buildFinance(totalSpent, myBal, trip?.base_currency),
      timeline: buildTimeline(items ?? []),
    };
  }, [tripId, trip, items, expenses, user?.id]);
}

function getMemberIds(
  trip: { trip_members?: { user_id: string }[] } | undefined,
  userId: string | undefined,
): string[] {
  const ids = trip?.trip_members?.map((m) => m.user_id) ?? [];
  if (!ids.length && userId) return [userId];
  return ids;
}

function buildFinance(
  total: number,
  myBal: { totalPaid: number; totalOwed: number; net: number } | undefined,
  currency = 'USD',
) {
  const sym = currency === 'EUR' ? '€' : '$';
  return {
    total: Math.round(total),
    myShare: Math.round(myBal?.totalPaid ?? 0),
    owedToMe: Math.round(Math.max(0, myBal?.net ?? 0)),
    iOwe: Math.round(Math.abs(Math.min(0, myBal?.net ?? 0))),
    today: 0,
    currency: sym,
    status: 'on_track' as const,
  };
}

function buildTimeline(
  items: { id: string; title: string; start_time: string; type: string; is_completed: boolean }[],
): TimelineEvent[] {
  return items.slice(0, 3).map((item, i) => ({
    id: item.id,
    title: item.title,
    time: item.start_time?.split('T')[1]?.slice(0, 5) ?? '',
    subtitle: item.is_completed ? 'Completado' : item.type,
    status: item.is_completed ? 'past' as const
      : i === 0 ? 'active' as const
      : 'next' as const,
    icon: item.type === 'flight' ? 'flight' as const
      : item.type === 'hotel' ? 'hotel' as const
      : 'clock' as const,
  }));
}
