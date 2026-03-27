import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import type { ReactNode } from 'react';
import { GLASS } from '../constants/colors';

type Variant = 'standard' | 'subtle' | 'hero' | 'dock';

interface GlassCardProps {
  variant?: Variant;
  radius?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function GlassCard({
  variant = 'standard',
  radius = 22,
  children,
  style,
}: GlassCardProps) {
  const token = GLASS[variant];

  return (
    <View
      style={[
        S.outer,
        {
          borderRadius: radius,
          borderColor: token.border,
          backgroundColor: token.bg,
        },
        style,
      ]}
    >
      <BlurView
        intensity={token.blur}
        tint="dark"
        style={[S.blur, { borderRadius: radius }]}
      />
      {'inset' in token && (
        <View
          style={[
            S.insetHighlight,
            {
              borderRadius: radius,
              borderTopColor: token.inset,
            },
          ]}
        />
      )}
      <View style={S.content}>{children}</View>
    </View>
  );
}

const S = StyleSheet.create({
  outer: {
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  insetHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    borderColor: 'transparent',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
