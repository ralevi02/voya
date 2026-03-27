import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import type { LucideIcon } from 'lucide-react-native';

interface SpeedDialItemProps {
  icon: LucideIcon;
  label: string;
  color: string;
  bgColor: string;
  isOpen: boolean;
  index: number;
  onPress: () => void;
}

const SPRING_CONFIG = { damping: 12, stiffness: 180 };

export function SpeedDialItem({
  icon: Icon,
  label,
  color,
  bgColor,
  isOpen,
  index,
  onPress,
}: SpeedDialItemProps) {
  const delay = index * 50;

  const containerStyle = useAnimatedStyle(() => ({
    opacity: withDelay(
      isOpen ? delay : 0,
      withSpring(isOpen ? 1 : 0, SPRING_CONFIG),
    ),
    transform: [
      {
        scale: withDelay(
          isOpen ? delay : 0,
          withSpring(isOpen ? 1 : 0, SPRING_CONFIG),
        ),
      },
      {
        translateY: withDelay(
          isOpen ? delay : 0,
          withSpring(isOpen ? 0 : 20, SPRING_CONFIG),
        ),
      },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: withDelay(
      isOpen ? delay + 80 : 0,
      withSpring(isOpen ? 1 : 0, SPRING_CONFIG),
    ),
    transform: [
      {
        translateX: withDelay(
          isOpen ? delay + 80 : 0,
          withSpring(isOpen ? 0 : -20, SPRING_CONFIG),
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.row, containerStyle]}>
      <Pressable
        style={[styles.miniFab, { backgroundColor: bgColor }]}
        onPress={onPress}
      >
        <Icon size={20} color={color} />
      </Pressable>
      <Animated.View style={labelStyle}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  miniFab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
