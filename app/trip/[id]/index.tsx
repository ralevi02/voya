import { useState, useCallback, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '@/stores/auth-store';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { useItinerary } from '@/features/itinerary/hooks/use-itinerary';
import { TripDashboard } from '@/features/dashboard/components/trip-dashboard';
import { VoyaTabBar } from '@/shared/components/navigation/voya-tab-bar';
import { DashboardShell } from '@/shared/components/navigation/dashboard-shell';
import type { DashboardTrip } from '@/features/dashboard/types/dashboard.types';

export default function TripHomeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const { data: trips } = useTrips(user?.id);
  const { data: items } = useItinerary(id);

  const trip = useMemo(
    () => trips?.find((t) => t.id === id),
    [trips, id],
  );

  const dashboardTrip: DashboardTrip = useMemo(() => ({
    id: id ?? 'unknown',
    name: trip?.name ?? 'Mi viaje',
    year: trip?.start_date?.split('-')[0] ?? '2026',
    onlineCount: 1,
    activeFlight: null,
    nextEvent: null,
    balance: 0,
    balanceStatus: 'Sin gastos',
    members: [],
    memberCount: 1,
    finance: {
      total: 0,
      myShare: 0,
      owedToMe: 0,
      iOwe: 0,
      today: 0,
      currency: '$',
      status: 'on_track',
    },
    timeline: (items ?? []).slice(0, 3).map((item, i) => ({
      id: item.id,
      title: item.title,
      time: item.start_time?.split('T')[1]?.slice(0, 5) ?? '',
      subtitle: item.type,
      status: i === 0 ? 'active' as const : 'next' as const,
      icon: item.type === 'flight' ? 'flight' as const
        : item.type === 'hotel' ? 'hotel' as const
        : 'clock' as const,
    })),
  }), [id, trip, items]);

  return (
    <DashboardShell>
      <TripDashboard trip={dashboardTrip} />
    </DashboardShell>
  );
}
