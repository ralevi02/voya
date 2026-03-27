import { View, StyleSheet } from 'react-native';
import { StatCardNext } from './stat-card-next';
import { StatCardBalance } from './stat-card-balance';
import { StatCardGroup } from './stat-card-group';
import type { DashboardTrip } from '../types/dashboard.types';

interface QuickStatsGridProps {
  trip: DashboardTrip;
}

export function QuickStatsGrid({ trip }: QuickStatsGridProps) {
  return (
    <View style={S.row}>
      {trip.nextEvent && (
        <View style={S.cell}>
          <StatCardNext event={trip.nextEvent} />
        </View>
      )}
      <View style={S.cell}>
        <StatCardBalance
          amount={trip.balance}
          currency={trip.finance.currency}
          status={trip.balanceStatus}
        />
      </View>
      <View style={S.cell}>
        <StatCardGroup
          members={trip.members}
          totalCount={trip.memberCount}
        />
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  cell: {
    flex: 1,
  },
});
