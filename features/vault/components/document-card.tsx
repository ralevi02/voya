import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { DocTypeIcon } from './doc-type-icon';
import { DOC_TYPE_CONFIG } from '../constants/doc-types';
import type { TravelDocument } from '../types/vault.types';

interface DocumentCardProps {
  document: TravelDocument;
  onPress: (doc: TravelDocument) => void;
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
  });
}

export function DocumentCard({ document, onPress }: DocumentCardProps) {
  const config = DOC_TYPE_CONFIG[document.doc_type];
  const sizeLabel = formatFileSize(document.file_size);
  const isPdf = document.mime_type?.includes('pdf');

  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-3 flex-row items-center gap-3 active:bg-neutral-50"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}
      onPress={() => onPress(document)}
    >
      <DocTypeIcon docType={document.doc_type} size={22} />

      <View className="flex-1 gap-0.5">
        <Text
          className="text-base font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {document.name}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-xs text-neutral-400">
            {config.label}
          </Text>
          {sizeLabel ? (
            <Text className="text-xs text-neutral-400">
              {sizeLabel}
            </Text>
          ) : null}
          <Text className="text-xs text-neutral-400">
            {isPdf ? 'PDF' : 'Imagen'}
          </Text>
          <Text className="text-xs text-neutral-400">
            {formatDate(document.created_at)}
          </Text>
        </View>
      </View>

      <ChevronRight size={18} color="#A3A3A3" />
    </Pressable>
  );
}
