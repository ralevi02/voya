import { TripDashboard } from '@/features/dashboard/components/trip-dashboard';
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
};

export default function DashboardScreen() {
  return <TripDashboard trip={MOCK_TRIP} />;
}
