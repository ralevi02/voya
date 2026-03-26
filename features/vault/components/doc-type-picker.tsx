import { View, Text, Pressable } from 'react-native';
import { DocTypeIcon } from './doc-type-icon';
import { DOC_TYPES, DOC_TYPE_CONFIG } from '../constants/doc-types';
import type { DocType } from '../types/vault.types';

interface DocTypePickerProps {
  selected: DocType;
  onSelect: (t: DocType) => void;
}

export function DocTypePicker({ selected, onSelect }: DocTypePickerProps) {
  return (
    <View className="flex-row flex-wrap gap-2 mb-4">
      {DOC_TYPES.map((t) => {
        const active = t === selected;
        const cfg = DOC_TYPE_CONFIG[t];
        return (
          <Pressable
            key={t}
            className={`flex-row items-center gap-2 px-3 py-2 rounded-xl border ${
              active
                ? 'border-primary-300 bg-primary-50'
                : 'border-neutral-200 bg-white'
            }`}
            onPress={() => onSelect(t)}
          >
            <DocTypeIcon docType={t} size={14} />
            <Text
              className={`text-sm ${
                active
                  ? 'font-semibold text-primary-700'
                  : 'text-neutral-600'
              }`}
            >
              {cfg.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
