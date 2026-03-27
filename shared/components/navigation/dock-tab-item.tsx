import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

interface DockTabItemProps {
  icon: LucideIcon;
  label: string;
  isCenter?: boolean;
  isActive?: boolean;
  hasBadge?: boolean;
  onPress?: () => void;
}

export function DockTabItem({
  icon: Icon,
  label,
  isCenter,
  isActive,
  hasBadge,
  onPress,
}: DockTabItemProps) {
  const size = isCenter ? 48 : 40;
  const iconSize = isCenter ? 21 : 17;

  return (
    <Pressable style={S.item} onPress={onPress}>
      <View
        style={[
          isCenter ? S.iconBoxActive : S.iconBox,
          { width: size, height: size },
        ]}
      >
        <Icon
          size={iconSize}
          color={
            isCenter
              ? 'rgba(235,236,244,0.90)'
              : 'rgba(180,188,215,0.52)'
          }
          strokeWidth={1.6}
        />
        {hasBadge && <View style={S.badge} />}
      </View>
      <Text
        style={[
          S.label,
          isCenter && S.labelCenter,
          isActive && !isCenter && S.labelSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const S = StyleSheet.create({
  item: { flex: 1, alignItems: 'center', gap: 5 },
  iconBox: {
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxActive: {
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF453A',
    borderWidth: 2,
    borderColor: 'rgba(6,6,6,0.88)',
  },
  label: {
    fontSize: 8,
    fontWeight: '500',
    color: 'rgba(135,140,168,0.45)',
  },
  labelCenter: {
    fontWeight: '700',
    color: 'rgba(215,220,242,0.70)',
  },
  labelSelected: {
    color: 'rgba(180,188,215,0.65)',
  },
});
