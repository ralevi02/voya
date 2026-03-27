import { useState, useCallback } from 'react';
import { TripDashboard } from '@/features/dashboard/components/trip-dashboard';
import { VoyaTabBar } from '@/shared/components/navigation/voya-tab-bar';
import type { DashboardTrip } from '@/features/dashboard/types/dashboard.types';

const MOCK_TRIP: DashboardTrip = {
  id: 'demo',
  name: 'Florida',
  year: '2026',
  onlineCount: 6,
  activeFlight: {
    flightCode: 'AA 1284',
    destination: 'Miami',
    gate: 'B22',
    terminal: '2',
    departureTime: '14:35',
    arrivalTime: '16:10',
    departureCode: 'JFK',
    arrivalCode: 'MIA',
    progress: 0.38,
    status: 'boarding',
    remainingTime: '1h 12m',
  },
  nextEvent: {
    title: 'Nobu\nHotel',
    time: '18:00',
    eta: '+3h',
    icon: 'hotel',
  },
  balance: 140,
  balanceStatus: 'Saldado',
  members: [
    { initials: 'CL', bg: '#3A3C44' },
    { initials: 'MR', bg: '#464850' },
    { initials: 'JK', bg: '#404248' },
    { initials: 'AN', bg: '#3C3E48' },
  ],
  memberCount: 6,
  finance: {
    total: 840,
    myShare: 140,
    owedToMe: 32,
    iOwe: 0,
    today: 48,
    currency: '€',
    status: 'on_track',
  },
  timeline: [
    {
      id: 'ev1',
      title: 'Check-in online',
      time: '07:00',
      subtitle: 'Completado',
      status: 'past',
      icon: 'clock',
    },
    {
      id: 'ev2',
      title: 'Vuelo AA 1284 → MIA',
      time: '14:35',
      subtitle: 'En curso',
      status: 'active',
      icon: 'flight',
    },
    {
      id: 'ev3',
      title: 'Nobu Hotel · Brickell',
      time: '18:00',
      subtitle: 'Check-in',
      status: 'next',
      icon: 'hotel',
    },
  ],
};

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const handleTab = useCallback((key: string) => setActiveTab(key), []);

  return (
    <TripDashboard
      trip={MOCK_TRIP}
      footer={<VoyaTabBar activeTab={activeTab} onTabPress={handleTab} />}
    />
  );
}
