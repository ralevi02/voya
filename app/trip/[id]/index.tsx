import { useLocalSearchParams } from 'expo-router';
import { TripDashboard } from '@/features/dashboard/components/trip-dashboard';
import { DashboardShell } from '@/shared/components/navigation/dashboard-shell';
import { useDashboardData } from '@/features/dashboard/hooks/use-dashboard-data';

export default function TripHomeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = useDashboardData(id!);

  return (
    <DashboardShell>
      <TripDashboard trip={trip} />
    </DashboardShell>
  );
}
