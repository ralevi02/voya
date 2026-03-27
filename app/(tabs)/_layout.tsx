import { Tabs } from 'expo-router';
import { Home, Compass, Wallet, User } from 'lucide-react-native';
import { VoyaTabBar } from '@/shared/components/navigation/voya-tab-bar';
import type { TabDef } from '@/shared/components/navigation/voya-tab-bar';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const MAIN_TABS: TabDef[] = [
  { key: 'index', label: 'Viajes', icon: Home },
  { key: 'explore', label: 'Explorar', icon: Compass },
  { key: 'expenses', label: 'Gastos', icon: Wallet },
  { key: 'profile', label: 'Perfil', icon: User },
];

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const activeKey = state.routes[state.index]?.name ?? 'index';

  return (
    <VoyaTabBar
      tabs={MAIN_TABS}
      activeTab={activeKey}
      theme="light"
      onTabPress={(key) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: state.routes.find((r) => r.name === key)?.key,
          canPreventDefault: true,
        });
        if (!event.defaultPrevented) {
          navigation.navigate(key);
        }
      }}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="expenses" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
