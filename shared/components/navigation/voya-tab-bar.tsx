import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import {
  MapPin, CalendarDays, Home, DollarSign, Bell,
} from 'lucide-react-native';
import { DockTabItem } from './dock-tab-item';

const TABS = [
  { key: 'map', label: 'Mapa', icon: MapPin },
  { key: 'agenda', label: 'Agenda', icon: CalendarDays },
  { key: 'home', label: 'Inicio', icon: Home, isCenter: true },
  { key: 'expenses', label: 'Gastos', icon: DollarSign },
  { key: 'alerts', label: 'Alertas', icon: Bell, hasBadge: true },
] as const;

interface VoyaTabBarProps {
  activeTab?: string;
  onTabPress?: (key: string) => void;
}

export function VoyaTabBar({
  activeTab = 'home',
  onTabPress,
}: VoyaTabBarProps) {
  return (
    <View style={S.wrapper}>
      <View style={S.separator} />
      <View style={S.dock}>
        <BlurView intensity={64} tint="dark" style={S.blur} />
        <View style={S.insetHighlight} />
        <View style={S.row}>
          {TABS.map((tab) => (
            <DockTabItem
              key={tab.key}
              icon={tab.icon}
              label={tab.label}
              isCenter={'isCenter' in tab}
              isActive={activeTab === tab.key}
              hasBadge={'hasBadge' in tab}
              onPress={() => onTabPress?.(tab.key)}
            />
          ))}
        </View>
      </View>
      <View style={S.indicatorWrap}>
        <View style={S.indicator} />
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  wrapper: { backgroundColor: '#060606', paddingHorizontal: 16 },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.055)',
    marginBottom: 10,
  },
  dock: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.09)',
    paddingVertical: 11,
    paddingHorizontal: 18,
    marginBottom: 10,
    position: 'relative',
  },
  blur: { ...StyleSheet.absoluteFillObject, borderRadius: 28 },
  insetHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.20)',
    borderColor: 'transparent',
    borderRadius: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  indicatorWrap: { paddingVertical: 6, paddingBottom: 14 },
  indicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.28)',
    alignSelf: 'center',
  },
});
