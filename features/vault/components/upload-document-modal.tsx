import { useState, useEffect } from 'react';
import {
  View, Text, Modal, Pressable, ScrollView,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Button } from '@/shared/components/ui/button';
import { DocTypePicker } from './doc-type-picker';
import { useUploadDocument } from '../hooks/use-upload-document';
import type { DocType } from '../types/vault.types';

interface UploadDocumentModalProps {
  tripId: string;
  visible: boolean;
  onClose: () => void;
  preselectedItemId?: string | null;
}

export function UploadDocumentModal({
  tripId,
  visible,
  onClose,
  preselectedItemId = null,
}: UploadDocumentModalProps) {
  const [name, setName] = useState('');
  const [docType, setDocType] = useState<DocType>('other');
  const { upload, error, isUploading, isSuccess, reset } =
    useUploadDocument(tripId);

  useEffect(() => {
    if (isSuccess) {
      setName('');
      setDocType('other');
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  function handleUpload() {
    upload({
      tripId,
      docType,
      name: name.trim(),
      itemId: preselectedItemId,
    });
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-3 border-b border-neutral-100">
          <Text className="text-lg font-bold text-neutral-900">
            Subir documento
          </Text>
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
            onPress={onClose}
          >
            <X size={16} color="#525252" />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-4"
          keyboardShouldPersistTaps="handled"
        >
          {/* Name */}
          <Text className="text-sm font-medium text-neutral-700 mb-1">
            Nombre del documento *
          </Text>
          <TextInput
            className="h-12 border border-neutral-300 rounded-xl px-4 text-base text-neutral-900 mb-4"
            placeholder="Ej: Boarding pass LAN123"
            placeholderTextColor="#A3A3A3"
            value={name}
            onChangeText={setName}
          />

          {/* Doc type */}
          <Text className="text-sm font-medium text-neutral-700 mb-2">
            Tipo de documento
          </Text>
          <DocTypePicker selected={docType} onSelect={setDocType} />

          {error && (
            <Text className="text-sm text-red-500 mt-4">{error}</Text>
          )}

          <View className="mt-6 mb-8">
            <Button
              title="Seleccionar archivo y subir"
              onPress={handleUpload}
              isLoading={isUploading}
              disabled={!name.trim()}
            />
          </View>

          <Text className="text-xs text-neutral-400 text-center mb-4">
            PDF o imagen, hasta 10 MB
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
