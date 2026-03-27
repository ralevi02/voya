import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from './glass-card';
import { StatusBadge } from './status-badge';
import { FlightIconBox } from './flight-icon-box';
import { FlightProgressBar } from './flight-progress-bar';
import { TEXT } from '../constants/colors';
import type { ActiveFlight } from '../types/dashboard.types';

const STATUS_LABELS: Record<string, string> = {
  boarding: 'Embarcando',
  in_flight: 'En vuelo',
  landed: 'Aterrizado',
  delayed: 'Retrasado',
};

interface TripHeroCardProps {
  flight: ActiveFlight;
  style?: object;
}

export function TripHeroCard({ flight, style }: TripHeroCardProps) {
  return (
    <GlassCard variant="hero" radius={28} style={[S.card, style]}>
      <View style={S.padding}>
        {/* Header row */}
        <View style={S.headerRow}>
          <Text style={S.sectionLabel}>En curso ahora</Text>
          <StatusBadge label={STATUS_LABELS[flight.status] ?? flight.status} />
        </View>

        {/* Flight info row */}
        <View style={S.flightRow}>
          <FlightIconBox />
          <View style={S.flightInfo}>
            <Text style={S.flightTitle}>
              {flight.flightCode} → {flight.destination}
            </Text>
            <Text style={S.flightSub}>
              Puerta {flight.gate} · Terminal {flight.terminal}
            </Text>
          </View>
          <Text style={S.bigTime}>{flight.departureTime}</Text>
        </View>

        {/* Progress */}
        <FlightProgressBar
          departureCode={flight.departureCode}
          arrivalCode={flight.arrivalCode}
          departureTime={flight.departureTime}
          arrivalTime={flight.arrivalTime}
          remainingTime={flight.remainingTime}
          progress={flight.progress}
        />
      </View>
    </GlassCard>
  );
}

const S = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  padding: {
    padding: 18,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  sectionLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: TEXT.label,
  },
  flightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 15,
  },
  flightInfo: {
    flex: 1,
  },
  flightTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT.primary,
    letterSpacing: -0.3,
  },
  flightSub: {
    fontSize: 11,
    color: TEXT.muted,
    marginTop: 3,
  },
  bigTime: {
    fontSize: 30,
    fontWeight: '400',
    color: 'rgba(235,236,242,0.90)',
    letterSpacing: -0.6,
    fontFamily: 'monospace',
  },
});
