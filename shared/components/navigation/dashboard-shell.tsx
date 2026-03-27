import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { VoyaTabBar } from './voya-tab-bar';

/** Maps tab keys to route segments inside /trip/[id]/ */
const TAB_ROUTES: Record<string, string> = {
  home: '',
  agenda: 'itinerary',
  expenses: 'expenses',
  map: 'vault',
  alerts: 'chat',
};

interface DashboardShellProps {
  children: ReactNode;
}

/**
 * Persistent shell for all trip screens.
 * Renders the VoyaTabBar at the bottom with real navigation.
 */
export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pathname = usePathname();

  const activeTab = deriveActiveTab(pathname);

  const handleTab = useCallback(
    (key: string) => {
      if (key === activeTab) return;
      const segment = TAB_ROUTES[key] ?? '';
      const route = segment
        ? `/trip/${id}/${segment}`
        : `/trip/${id}`;
      router.push(route as never);
    },
    [id, router, activeTab],
  );

  return (
    <View style={S.root}>
      <View style={S.content}>{children}</View>
      <VoyaTabBar activeTab={activeTab} onTabPress={handleTab} />
    </View>
  );
}

function deriveActiveTab(pathname: string): string {
  if (pathname.endsWith('/itinerary')) return 'agenda';
  if (pathname.endsWith('/expenses')) return 'expenses';
  if (pathname.endsWith('/vault')) return 'map';
  if (pathname.endsWith('/chat')) return 'alerts';
  return 'home';
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#060606' },
  content: { flex: 1 },
});
