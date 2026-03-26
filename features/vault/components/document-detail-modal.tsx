import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import { X, Trash2 } from 'lucide-react-native';
import { DocTypeIcon } from './doc-type-icon';
import { DocumentViewer } from './document-viewer';
import { DOC_TYPE_CONFIG } from '../constants/doc-types';
import type { TravelDocument } from '../types/vault.types';

interface DocumentDetailModalProps {
  document: TravelDocument | null;
  visible: boolean;
  onClose: () => void;
  onDelete?: (doc: TravelDocument) => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatSize(bytes: number | null): string {
  if (!bytes) return 'Tamaño desconocido';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentDetailModal({
  document,
  visible,
  onClose,
  onDelete,
}: DocumentDetailModalProps) {
  if (!document) return null;

  const config = DOC_TYPE_CONFIG[document.doc_type];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-3 border-b border-neutral-100">
          <View className="flex-row items-center gap-3">
            <DocTypeIcon docType={document.doc_type} size={18} />
            <Text
              className="text-xs font-medium"
              style={{ color: config.color }}
            >
              {config.label}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            {onDelete && (
              <Pressable
                className="h-8 w-8 items-center justify-center rounded-full bg-red-50"
                onPress={() => onDelete(document)}
              >
                <Trash2 size={14} color="#EF4444" />
              </Pressable>
            )}
            <Pressable
              className="h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
              onPress={onClose}
            >
              <X size={16} color="#525252" />
            </Pressable>
          </View>
        </View>

        <ScrollView className="flex-1 px-6 pt-4">
          <Text className="text-2xl font-bold text-neutral-900">
            {document.name}
          </Text>

          <View className="flex-row items-center gap-2 mt-2">
            <Text className="text-xs text-neutral-400">
              {formatSize(document.file_size)}
            </Text>
            <Text className="text-xs text-neutral-400">
              {formatDate(document.created_at)}
            </Text>
          </View>

          {/* Viewer */}
          <View className="mt-5">
            <DocumentViewer document={document} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
