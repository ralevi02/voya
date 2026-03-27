export type FlightStatus = 'boarding' | 'in_flight' | 'landed' | 'delayed';

export interface ActiveFlight {
  flightCode: string;
  destination: string;
  gate: string;
  terminal: string;
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  /** 0-1 progress along route */
  progress: number;
  status: FlightStatus;
  remainingTime: string;
}

export interface NextEvent {
  title: string;
  time: string;
  eta: string;
  icon: 'hotel' | 'flight' | 'activity';
}

export interface GroupMember {
  initials: string;
  bg: string;
}

export interface FinanceOverview {
  total: number;
  myShare: number;
  owedToMe: number;
  iOwe: number;
  today: number;
  currency: string;
  status: 'on_track' | 'behind';
}

export interface DashboardTrip {
  id: string;
  name: string;
  year: string;
  onlineCount: number;
  activeFlight: ActiveFlight | null;
  nextEvent: NextEvent | null;
  balance: number;
  balanceStatus: string;
  members: GroupMember[];
  memberCount: number;
  finance: FinanceOverview;
}
