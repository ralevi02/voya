import { View, Text, StyleSheet } from 'react-native';
import { GREEN } from '../constants/colors';

interface StatusBadgeProps {
  label: string;
  variant?: 'green' | 'neutral';
}

export function StatusBadge({
  label,
  variant = 'green',
}: StatusBadgeProps) {
  const isGreen = variant === 'green';

  return (
    <View
      style={[
        S.badge,
        {
          backgroundColor: isGreen
            ? GREEN.badge_bg
            : 'rgba(255,255,255,0.06)',
          borderColor: isGreen
            ? GREEN.badge_border
            : 'rgba(255,255,255,0.10)',
        },
      ]}
    >
      <Text
        style={[
          S.text,
          {
            color: isGreen
              ? GREEN.badge_text
              : 'rgba(180,188,215,0.65)',
          },
        ]}
      >
        {`● ${label}`}
      </Text>
    </View>
  );
}

const S = StyleSheet.create({
  badge: {
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
  },
  text: {
    fontSize: 9,
    fontWeight: '600',
  },
});
