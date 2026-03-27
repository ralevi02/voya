import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface SpeedDialBackdropProps {
  isOpen: boolean;
  onPress: () => void;
}

export function SpeedDialBackdrop({
  isOpen,
  onPress,
}: SpeedDialBackdropProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? 1 : 0, { duration: 200 }),
    pointerEvents: isOpen ? ('auto' as const) : ('none' as const),
  }));

  return (
    <Animated.View style={[styles.backdrop, animatedStyle]}>
      <Animated.View
        style={styles.touchable}
        onTouchEnd={onPress}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 90,
  },
  touchable: {
    flex: 1,
  },
});
