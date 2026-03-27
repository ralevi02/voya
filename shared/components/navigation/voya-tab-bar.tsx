import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { DockTabItem } from './dock-tab-item';
import type { DockTheme } from './dock-tab-item';
import type { LucideIcon } from 'lucide-react-native';

export interface TabDef {
  key: string;
  label: string;
  icon: LucideIcon;
  hasBadge?: boolean;
}

interface VoyaTabBarProps {
  tabs: TabDef[];
  activeTab: string;
  onTabPress: (key: string) => void;
  theme?: DockTheme;
}

export function VoyaTabBar({
  tabs,
  activeTab,
  onTabPress,
  theme = 'dark',
}: VoyaTabBarProps) {
  const isDark = theme === 'dark';

  return (
    <View style={[S.wrapper, isDark ? S.wrapperDark : S.wrapperLight]}>
      <View style={S.separator} />
      <View style={[S.dock, isDark ? S.dockDark : S.dockLight]}>
        {isDark && (
          <BlurView intensity={64} tint="dark" style={S.blur} />
        )}
        {isDark && <View style={S.insetHighlight} />}
        <View style={S.row}>
          {tabs.map((tab) => (
            <DockTabItem
              key={tab.key}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.key}
              hasBadge={tab.hasBadge}
              theme={theme}
              onPress={() => onTabPress(tab.key)}
            />
          ))}
        </View>
      </View>
      {isDark && (
        <View style={S.indicatorWrap}>
          <View style={S.indicator} />
        </View>
      )}
    </View>
  );
}

const S = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, paddingBottom: 4 },
  wrapperDark: { backgroundColor: '#060606' },
  wrapperLight: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.055)' },
  dock: {
    borderRadius: 28,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: 'relative',
  },
  dockDark: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.09)',
    marginBottom: 6,
  },
  dockLight: {
    backgroundColor: 'transparent',
    marginBottom: 0,
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
  indicatorWrap: { paddingVertical: 4, paddingBottom: 10 },
  indicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.28)',
    alignSelf: 'center',
  },
});
