import { View, ScrollView, StyleSheet } from 'react-native';
import { MapHeader } from './map-header';
import { TripHeroCard } from './trip-hero-card';
import { QuickStatsGrid } from './quick-stats-grid';
import { FinancePanel } from './finance-panel';
import { DARK } from '../constants/colors';
import type { DashboardTrip } from '../types/dashboard.types';

interface TripDashboardProps {
  trip: DashboardTrip;
}

export function TripDashboard({ trip }: TripDashboardProps) {
  return (
    <ScrollView
      style={S.scroll}
      contentContainerStyle={S.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Map zone + hero card overlap area */}
      <View style={S.mapZone}>
        <MapHeader
          tripName={trip.name}
          year={trip.year}
          onlineCount={trip.onlineCount}
        />
        {trip.activeFlight && (
          <TripHeroCard flight={trip.activeFlight} style={S.heroCard} />
        )}
      </View>

      {/* Widgets */}
      <View style={S.widgets}>
        <QuickStatsGrid trip={trip} />
        <FinancePanel finance={trip.finance} />
      </View>
    </ScrollView>
  );
}

const S = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: DARK.bg,
  },
  content: {
    paddingBottom: 32,
  },
  mapZone: {
    position: 'relative',
    paddingBottom: 24,
  },
  heroCard: {
    marginTop: -70,
    zIndex: 10,
  },
  widgets: {
    paddingHorizontal: 16,
  },
});
