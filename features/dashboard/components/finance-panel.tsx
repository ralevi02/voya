import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from './glass-card';
import { FinanceDonutChart } from './finance-donut-chart';
import { TEXT, GREEN } from '../constants/colors';
import type { FinanceOverview } from '../types/dashboard.types';

interface FinancePanelProps {
  finance: FinanceOverview;
}

const CELLS: {
  key: keyof Pick<FinanceOverview, 'myShare' | 'owedToMe' | 'iOwe' | 'today'>;
  label: string;
  color: string;
  variant: 'bright' | 'dim';
}[] = [
  { key: 'myShare', label: 'Mi parte', color: TEXT.primary, variant: 'bright' },
  { key: 'owedToMe', label: 'Me deben', color: 'rgba(57,217,138,0.80)', variant: 'bright' },
  { key: 'iOwe', label: 'Debo', color: 'rgba(195,200,225,0.55)', variant: 'dim' },
  { key: 'today', label: 'Hoy', color: 'rgba(195,200,225,0.55)', variant: 'dim' },
];

export function FinancePanel({ finance }: FinancePanelProps) {
  const isOnTrack = finance.status === 'on_track';

  return (
    <GlassCard variant="standard" radius={22}>
      <View style={S.pad}>
        {/* Header */}
        <View style={S.header}>
          <Text style={S.title}>Panel financiero</Text>
          <View style={[S.badge, isOnTrack ? S.badgeGreen : S.badgeRed]}>
            <Text style={[S.badgeText, isOnTrack && S.badgeTextGreen]}>
              ● {isOnTrack ? 'Al día' : 'Pendiente'}
            </Text>
          </View>
        </View>

        {/* Body — donut + grid */}
        <View style={S.body}>
          <FinanceDonutChart finance={finance} />

          <View style={S.grid}>
            {CELLS.map((c) => (
              <View
                key={c.key}
                style={[S.cell, c.variant === 'bright' ? S.cellBright : S.cellDim]}
              >
                <Text style={[S.cellLabel, c.variant === 'dim' && S.cellLabelDim]}>
                  {c.label}
                </Text>
                <Text style={[S.cellValue, { color: c.color }]}>
                  {finance.currency}{finance[c.key]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </GlassCard>
  );
}

const S = StyleSheet.create({
  pad: { padding: 15, paddingHorizontal: 18 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: TEXT.label,
  },
  badge: {
    borderRadius: 40,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  badgeGreen: {
    backgroundColor: 'rgba(57,217,138,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(57,217,138,0.18)',
  },
  badgeRed: {
    backgroundColor: 'rgba(239,68,68,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.18)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(239,68,68,0.75)',
  },
  badgeTextGreen: {
    color: 'rgba(57,217,138,0.75)',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cell: {
    width: '47%',
    borderRadius: 14,
    padding: 9,
    paddingHorizontal: 11,
    borderWidth: 1,
  },
  cellBright: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.09)',
  },
  cellDim: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cellLabel: {
    fontSize: 8.5,
    fontWeight: '600',
    letterSpacing: 0.85,
    textTransform: 'uppercase',
    color: 'rgba(138,142,162,0.40)',
    marginBottom: 4,
  },
  cellLabelDim: {
    color: 'rgba(138,142,162,0.32)',
  },
  cellValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
});
