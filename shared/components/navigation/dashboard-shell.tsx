import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import { useCallback } from 'react';
import type { ReactNode } from 'react';
import {
  MapPin, CalendarDays, Home, DollarSign, Bell,
} from 'lucide-react-native';
import { VoyaTabBar } from './voya-tab-bar';
import type { TabDef } from './voya-tab-bar';

const TRIP_TABS: TabDef[] = [
  { key: 'home', label: 'Inicio', icon: Home },
  { key: 'agenda', label: 'Agenda', icon: CalendarDays },
  { key: 'expenses', label: 'Gastos', icon: DollarSign },
  { key: 'vault', label: 'Bóveda', icon: MapPin },
  { key: 'alerts', label: 'Alertas', icon: Bell, hasBadge: true },
];

const ROUTE_MAP: Record<string, string> = {
  home: '',
  agenda: 'itinerary',
  expenses: 'expenses',
  vault: 'vault',
  alerts: 'chat',
};

interface DashboardShellProps { children: ReactNode }

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pathname = usePathname();
  const activeTab = deriveTab(pathname);

  const handleTab = useCallback(
    (key: string) => {
      if (key === activeTab) return;
      const seg = ROUTE_MAP[key] ?? '';
      router.push((seg ? `/trip/${id}/${seg}` : `/trip/${id}`) as never);
    },
    [id, router, activeTab],
  );

  return (
    <View style={S.root}>
      <View style={S.content}>{children}</View>
      <VoyaTabBar
        tabs={TRIP_TABS}
        activeTab={activeTab}
        theme="dark"
        onTabPress={handleTab}
      />
    </View>
  );
}

function deriveTab(p: string): string {
  if (p.endsWith('/itinerary')) return 'agenda';
  if (p.endsWith('/expenses')) return 'expenses';
  if (p.endsWith('/vault')) return 'vault';
  if (p.endsWith('/chat')) return 'alerts';
  return 'home';
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#060606' },
  content: { flex: 1 },
});
