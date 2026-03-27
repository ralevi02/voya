import { View, ScrollView, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { MapHeader } from './map-header';
import { TripHeroCard } from './trip-hero-card';
import { QuickStatsGrid } from './quick-stats-grid';
import { TimelineView } from './timeline-view';
import { FinancePanel } from './finance-panel';
import { DARK } from '../constants/colors';
import type { DashboardTrip } from '../types/dashboard.types';

interface TripDashboardProps {
  trip: DashboardTrip;
  footer?: ReactNode;
}

export function TripDashboard({ trip, footer }: TripDashboardProps) {
  return (
    <View style={S.root}>
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
          {trip.timeline.length > 0 && (
            <View style={S.section}>
              <TimelineView events={trip.timeline} />
            </View>
          )}
          <View style={S.section}>
            <FinancePanel finance={trip.finance} />
          </View>
        </View>
      </ScrollView>
      {footer}
    </View>
  );
}

const S = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 12,
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
  section: {
    marginTop: 12,
  },
});
