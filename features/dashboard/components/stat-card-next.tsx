import { View, Text, StyleSheet } from 'react-native';
import { Home } from 'lucide-react-native';
import { GlassCard } from './glass-card';
import { TEXT } from '../constants/colors';
import type { NextEvent } from '../types/dashboard.types';

interface StatCardNextProps {
  event: NextEvent;
}

export function StatCardNext({ event }: StatCardNextProps) {
  return (
    <GlassCard variant="standard" radius={22}>
      <View style={S.pad}>
        <Text style={S.label}>Siguiente</Text>
        <View style={S.iconBox}>
          <Home size={14} color="rgba(200,205,228,0.60)" />
        </View>
        <Text style={S.title}>{event.title}</Text>
        <Text style={S.meta}>{event.time} · {event.eta}</Text>
      </View>
    </GlassCard>
  );
}

const S = StyleSheet.create({
  pad: { padding: 14, paddingHorizontal: 13 },
  label: {
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: TEXT.label,
    marginBottom: 7,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12.5,
    fontWeight: '600',
    color: TEXT.secondary,
    lineHeight: 15,
  },
  meta: {
    fontSize: 9,
    color: TEXT.label,
    marginTop: 4,
  },
});
