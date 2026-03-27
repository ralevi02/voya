import { useState, useCallback } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Send, Loader2 } from 'lucide-react-native';

interface ChatInputProps {
  onSend: (text: string) => void;
  isSending: boolean;
}

export function ChatInput({ onSend, isSending }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = useCallback(() => {
    if (!text.trim() || isSending) return;
    onSend(text.trim());
    setText('');
  }, [text, isSending, onSend]);

  return (
    <View className="flex-row items-end gap-2 px-4 py-3 bg-white border-t border-neutral-100">
      <TextInput
        className="flex-1 min-h-[44px] max-h-[100px] border border-neutral-200 rounded-2xl px-4 py-2.5 text-sm text-neutral-900"
        placeholder="Pregunta algo sobre tu viaje..."
        placeholderTextColor="#A3A3A3"
        value={text}
        onChangeText={setText}
        multiline
        onSubmitEditing={handleSend}
        editable={!isSending}
      />
      <Pressable
        className={`h-11 w-11 rounded-full items-center justify-center ${
          text.trim() && !isSending
            ? 'bg-primary-600'
            : 'bg-neutral-200'
        }`}
        onPress={handleSend}
        disabled={!text.trim() || isSending}
      >
        {isSending ? (
          <Loader2 size={18} color="#737373" />
        ) : (
          <Send size={18} color={text.trim() ? '#FFFFFF' : '#A3A3A3'} />
        )}
      </Pressable>
    </View>
  );
}
