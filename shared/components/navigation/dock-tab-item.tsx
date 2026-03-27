import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

export type DockTheme = 'dark' | 'light';

interface DockTabItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  hasBadge?: boolean;
  theme?: DockTheme;
  onPress?: () => void;
}

const COLORS = {
  dark: {
    iconActive: 'rgba(235,236,244,0.90)',
    icon: 'rgba(180,188,215,0.52)',
    boxBg: 'rgba(255,255,255,0.05)',
    boxBorder: 'rgba(255,255,255,0.09)',
    activeBg: 'rgba(255,255,255,0.13)',
    activeBorder: 'rgba(255,255,255,0.22)',
    label: 'rgba(135,140,168,0.45)',
    labelActive: 'rgba(215,220,242,0.70)',
  },
  light: {
    iconActive: '#4F46E5',
    icon: '#9CA3AF',
    boxBg: 'rgba(0,0,0,0.03)',
    boxBorder: 'rgba(0,0,0,0.06)',
    activeBg: 'rgba(79,70,229,0.10)',
    activeBorder: 'rgba(79,70,229,0.20)',
    label: '#9CA3AF',
    labelActive: '#4F46E5',
  },
};

export function DockTabItem({
  icon: Icon,
  label,
  isActive,
  hasBadge,
  theme = 'dark',
  onPress,
}: DockTabItemProps) {
  const c = COLORS[theme];

  return (
    <Pressable style={S.item} onPress={onPress}>
      <View
        style={[
          S.iconBox,
          {
            backgroundColor: isActive ? c.activeBg : c.boxBg,
            borderColor: isActive ? c.activeBorder : c.boxBorder,
          },
        ]}
      >
        <Icon
          size={18}
          color={isActive ? c.iconActive : c.icon}
          strokeWidth={1.6}
        />
        {hasBadge && <View style={S.badge} />}
      </View>
      <Text style={[S.label, { color: isActive ? c.labelActive : c.label }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const S = StyleSheet.create({
  item: { flex: 1, alignItems: 'center', gap: 4 },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF453A',
    borderWidth: 2,
    borderColor: 'rgba(6,6,6,0.88)',
  },
  label: { fontSize: 9, fontWeight: '600' },
});
