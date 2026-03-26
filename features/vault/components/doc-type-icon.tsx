import { View } from 'react-native';
import {
  Plane, BedDouble, Shield, BookOpen, FileText,
} from 'lucide-react-native';
import type { DocType } from '../types/vault.types';
import { DOC_TYPE_CONFIG } from '../constants/doc-types';

const ICON_MAP = {
  Plane, BedDouble, Shield, BookOpen, FileText,
} as const;

interface DocTypeIconProps {
  docType: DocType;
  size?: number;
}

export function DocTypeIcon({ docType, size = 20 }: DocTypeIconProps) {
  const config = DOC_TYPE_CONFIG[docType];
  const Icon = ICON_MAP[config.icon as keyof typeof ICON_MAP];

  return (
    <View
      className="items-center justify-center rounded-xl"
      style={{
        backgroundColor: config.bgColor,
        width: size + 16,
        height: size + 16,
      }}
    >
      <Icon size={size} color={config.color} />
    </View>
  );
}
