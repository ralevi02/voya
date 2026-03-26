export interface CoverGradient {
  id: string;
  colors: [string, string];
  label: string;
}

export const COVER_GRADIENTS: CoverGradient[] = [
  { id: 'sunset', colors: ['#F97316', '#EC4899'], label: 'Atardecer' },
  { id: 'ocean', colors: ['#06B6D4', '#3B82F6'], label: 'Océano' },
  { id: 'forest', colors: ['#22C55E', '#14B8A6'], label: 'Bosque' },
  { id: 'lavender', colors: ['#8B5CF6', '#EC4899'], label: 'Lavanda' },
  { id: 'coral', colors: ['#F43F5E', '#FB923C'], label: 'Coral' },
  { id: 'midnight', colors: ['#1E3A5F', '#4F46E5'], label: 'Medianoche' },
  { id: 'aurora', colors: ['#06B6D4', '#A78BFA'], label: 'Aurora' },
  { id: 'peach', colors: ['#FB923C', '#FBBF24'], label: 'Durazno' },
];

export type CoverGradientId = (typeof COVER_GRADIENTS)[number]['id'];

const DEFAULT_GRADIENT = COVER_GRADIENTS[0];

export function getGradientById(id: string): CoverGradient {
  return COVER_GRADIENTS.find((g) => g.id === id) ?? DEFAULT_GRADIENT;
}

export function getRandomGradient(): CoverGradient {
  const index = Math.floor(Math.random() * COVER_GRADIENTS.length);
  return COVER_GRADIENTS[index];
}
