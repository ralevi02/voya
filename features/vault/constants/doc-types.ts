import type { DocType } from '../types/vault.types';

interface DocTypeConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const DOC_TYPE_CONFIG: Record<DocType, DocTypeConfig> = {
  flight: {
    label: 'Vuelo',
    icon: 'Plane',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
  },
  hotel: {
    label: 'Hotel',
    icon: 'BedDouble',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
  insurance: {
    label: 'Seguro',
    icon: 'Shield',
    color: '#22C55E',
    bgColor: '#F0FDF4',
  },
  passport: {
    label: 'Pasaporte',
    icon: 'BookOpen',
    color: '#EF4444',
    bgColor: '#FEF2F2',
  },
  other: {
    label: 'Otro',
    icon: 'FileText',
    color: '#737373',
    bgColor: '#F5F5F5',
  },
};

export const DOC_TYPES: DocType[] = [
  'flight', 'hotel', 'insurance', 'passport', 'other',
];
