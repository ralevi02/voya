export const APP_CONFIG = {
  name: 'Voya',
  version: '1.0.0',
  defaultCurrency: 'USD',
  maxFileSize: 50 * 1024 * 1024, // 50MB
  paginationLimit: 20,
} as const;

export const QUERY_KEYS = {
  trips: ['trips'] as const,
  trip: (id: string) => ['trips', id] as const,
  tripMembers: (tripId: string) => ['trips', tripId, 'members'] as const,
  expenses: (tripId: string) => ['expenses', tripId] as const,
  expensesGlobal: ['expenses', 'global'] as const,
  itinerary: (tripId: string) => ['itinerary', tripId] as const,
  vault: (userId: string) => ['vault', userId] as const,
  vaultTrip: (tripId: string) => ['vault', 'trip', tripId] as const,
  voteSessions: (tripId: string) => ['votes', tripId] as const,
  album: (tripId: string) => ['album', tripId] as const,
  profile: (userId: string) => ['profile', userId] as const,
} as const;
