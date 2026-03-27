import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TEXT } from '../constants/colors';

interface FlightProgressBarProps {
  departureCode: string;
  arrivalCode: string;
  departureTime: string;
  arrivalTime: string;
  remainingTime: string;
  /** 0 – 1 */
  progress: number;
}

export function FlightProgressBar({
  departureCode,
  arrivalCode,
  departureTime,
  arrivalTime,
  remainingTime,
  progress,
}: FlightProgressBarProps) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;

  return (
    <View>
      {/* Codes + track */}
      <View style={S.trackRow}>
        <Text style={S.code}>{departureCode}</Text>
        <View style={S.track}>
          <LinearGradient
            colors={['rgba(255,255,255,0.45)', 'rgba(255,255,255,0.18)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[S.fill, { width: `${pct}%` }]}
          />
          <View style={[S.dot, { left: `${pct}%` }]} />
        </View>
        <Text style={S.code}>{arrivalCode}</Text>
      </View>

      {/* Times row */}
      <View style={S.timesRow}>
        <Text style={S.timeGhost}>Salida {departureTime}</Text>
        <Text style={S.timeCenter}>{remainingTime} restante</Text>
        <Text style={S.timeGhost}>Llegada {arrivalTime}</Text>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  code: {
    fontSize: 9,
    color: TEXT.dim,
    fontFamily: 'monospace',
  },
  track: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  dot: {
    position: 'absolute',
    top: '50%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.70)',
    transform: [{ translateX: -3 }, { translateY: -3 }],
  },
  timesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeGhost: { fontSize: 9, color: TEXT.ghost },
  timeCenter: { fontSize: 9, color: TEXT.label },
});
