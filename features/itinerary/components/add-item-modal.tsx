import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Button } from '@/shared/components/ui/button';
import { ITEM_TYPES, ITEM_TYPE_CONFIG } from '../constants/item-types';
import { ItemTypeIcon } from './item-type-icon';
import { useCreateItineraryItem } from '../hooks/use-create-itinerary-item';
import type { ItineraryItemType } from '../types/itinerary.types';

interface AddItemModalProps {
  tripId: string;
  visible: boolean;
  defaultType?: ItineraryItemType;
  defaultDate?: string;
  onClose: () => void;
}

export function AddItemModal({
  tripId,
  visible,
  defaultType = 'activity',
  defaultDate,
  onClose,
}: AddItemModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ItineraryItemType>(defaultType);
  const [date, setDate] = useState(defaultDate ?? '');
  const [time, setTime] = useState('12:00');
  const [locationName, setLocationName] = useState('');
  const [notes, setNotes] = useState('');

  const { submit, isSubmitting, isSuccess, formError, reset } =
    useCreateItineraryItem(tripId);

  useEffect(() => {
    if (defaultType) setType(defaultType);
  }, [defaultType]);

  useEffect(() => {
    if (defaultDate) setDate(defaultDate);
  }, [defaultDate]);

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setLocationName('');
      setNotes('');
      setTime('12:00');
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  function handleSubmit() {
    const startTime = `${date}T${time}:00`;
    submit({
      trip_id: tripId,
      title,
      type,
      start_time: startTime,
      location_name: locationName || null,
      notes: notes || null,
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
            Nueva actividad
          </Text>
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
            onPress={onClose}
          >
            <X size={16} color="#525252" />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-6 pt-4" keyboardShouldPersistTaps="handled">
          {/* Type selector */}
          <Text className="text-sm font-medium text-neutral-700 mb-2">
            Tipo
          </Text>
          <View className="flex-row gap-2 mb-4">
            {ITEM_TYPES.map((t) => {
              const config = ITEM_TYPE_CONFIG[t];
              const isActive = type === t;
              return (
                <Pressable
                  key={t}
                  className={`flex-row items-center gap-1.5 px-3 py-2 rounded-full border ${
                    isActive ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 bg-white'
                  }`}
                  onPress={() => setType(t)}
                >
                  <ItemTypeIcon type={t} size={14} />
                  <Text className={`text-xs font-medium ${isActive ? 'text-primary-700' : 'text-neutral-600'}`}>
                    {config.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Title */}
          <Text className="text-sm font-medium text-neutral-700 mb-1">
            Título *
          </Text>
          <TextInput
            className="h-12 border border-neutral-300 rounded-xl px-4 text-base text-neutral-900 mb-4"
            placeholder="Ej: Visitar Machu Picchu"
            placeholderTextColor="#A3A3A3"
            value={title}
            onChangeText={setTitle}
          />

          {/* Date + Time */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-medium text-neutral-700 mb-1">
                Fecha *
              </Text>
              <TextInput
                className="h-12 border border-neutral-300 rounded-xl px-4 text-base text-neutral-900"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#A3A3A3"
                value={date}
                onChangeText={setDate}
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-neutral-700 mb-1">
                Hora *
              </Text>
              <TextInput
                className="h-12 border border-neutral-300 rounded-xl px-4 text-base text-neutral-900"
                placeholder="HH:MM"
                placeholderTextColor="#A3A3A3"
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>

          {/* Location */}
          <Text className="text-sm font-medium text-neutral-700 mb-1">
            Ubicación
          </Text>
          <TextInput
            className="h-12 border border-neutral-300 rounded-xl px-4 text-base text-neutral-900 mb-4"
            placeholder="Ej: Cusco, Perú"
            placeholderTextColor="#A3A3A3"
            value={locationName}
            onChangeText={setLocationName}
          />

          {/* Notes */}
          <Text className="text-sm font-medium text-neutral-700 mb-1">
            Notas
          </Text>
          <TextInput
            className="border border-neutral-300 rounded-xl px-4 py-3 text-base text-neutral-900 mb-6"
            placeholder="Detalles adicionales..."
            placeholderTextColor="#A3A3A3"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            style={{ minHeight: 80, textAlignVertical: 'top' }}
          />

          {formError && (
            <Text className="text-sm text-red-500 mb-3">
              {formError}
            </Text>
          )}

          <Button
            title="Agregar al itinerario"
            onPress={handleSubmit}
            isLoading={isSubmitting}
            disabled={!title.trim() || !date.trim()}
          />
          <View className="h-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
