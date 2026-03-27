import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DARK, TEXT, GREEN } from '../constants/colors';

interface MapHeaderProps {
  tripName: string;
  year: string;
  onlineCount: number;
}

export function MapHeader({ tripName, year, onlineCount }: MapHeaderProps) {
  return (
    <View style={S.container}>
      {/* Map-like background */}
      <LinearGradient
        colors={DARK.mapGradient}
        locations={[0, 0.3, 0.65, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={S.gradient}
      />

      {/* Top fade for status bar */}
      <LinearGradient
        colors={['rgba(6,6,6,0.88)', 'transparent']}
        style={S.topFade}
      />

      {/* Floating header */}
      <View style={S.header}>
        <View>
          <Text style={S.label}>Viaje activo</Text>
          <Text style={S.title}>{tripName}</Text>
          <Text style={S.year}>{year}</Text>
        </View>
        <View style={S.onlineBadge}>
          <View style={S.dot} />
          <Text style={S.onlineText}>{onlineCount} online</Text>
        </View>
      </View>

      {/* Curved bottom mask */}
      <View style={S.curvedMask} />
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    height: 240,
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    zIndex: 2,
  },
  header: {
    position: 'absolute',
    top: 52,
    left: 22,
    right: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 5,
  },
  label: {
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: 'rgba(150,158,182,0.44)',
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: TEXT.primary,
    letterSpacing: -1,
    lineHeight: 28,
  },
  year: {
    fontSize: 26,
    fontWeight: '200',
    color: 'rgba(195,200,222,0.30)',
    letterSpacing: -1,
    lineHeight: 28,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 40,
    paddingHorizontal: 13,
    paddingVertical: 6,
    marginTop: 4,
  },
  dot: {
    width: 5.5,
    height: 5.5,
    borderRadius: 3,
    backgroundColor: GREEN.solid,
  },
  onlineText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(180,188,215,0.65)',
  },
  curvedMask: {
    position: 'absolute',
    bottom: -2,
    left: -4,
    right: -4,
    height: 60,
    backgroundColor: DARK.bg,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },
});
