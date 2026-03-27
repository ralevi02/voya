import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from './glass-card';
import { TimelineItem } from './timeline-item';
import { TEXT } from '../constants/colors';
import type { TimelineEvent } from '../types/dashboard.types';

interface TimelineViewProps {
  events: TimelineEvent[];
}

export function TimelineView({ events }: TimelineViewProps) {
  if (!events.length) return null;

  return (
    <GlassCard variant="standard" radius={22}>
      <View style={S.pad}>
        {/* Header */}
        <View style={S.header}>
          <Text style={S.label}>Itinerario · hoy</Text>
          <Text style={S.count}>{events.length} eventos</Text>
        </View>

        {/* Events with connector lines */}
        {events.map((event, i) => (
          <View key={event.id}>
            <TimelineItem event={event} />
            {i < events.length - 1 && <Connector />}
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

function Connector() {
  return (
    <View style={S.connectorWrap}>
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
        style={S.connectorLine}
      />
    </View>
  );
}

const S = StyleSheet.create({
  pad: { padding: 15, paddingHorizontal: 18 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: TEXT.label,
  },
  count: {
    fontSize: 9.5,
    color: 'rgba(138,142,162,0.40)',
  },
  connectorWrap: {
    paddingLeft: 17,
    paddingVertical: 2,
    marginVertical: 2,
  },
  connectorLine: {
    width: 1.5,
    height: 20,
  },
});
