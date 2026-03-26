import { LinearGradient } from 'expo-linear-gradient';
import { type ViewStyle } from 'react-native';
import { getGradientById } from '../constants/cover-gradients';

interface GradientCoverProps {
  gradientId: string;
  style?: ViewStyle;
  className?: string;
}

export function GradientCover({
  gradientId,
  style,
  className,
}: GradientCoverProps) {
  const gradient = getGradientById(gradientId);

  return (
    <LinearGradient
      colors={gradient.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={className}
      style={style}
    />
  );
}
