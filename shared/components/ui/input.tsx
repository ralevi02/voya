import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  type TextInputProps,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  isPassword = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = !!error;

  const inputBorder = hasError ? 'border-red-400' : 'border-neutral-300';

  return (
    <View className="gap-1.5">
      <Text className="text-sm font-medium text-neutral-700">{label}</Text>
      <View>
        <TextInput
          className={`h-12 rounded-xl border px-4 text-base text-neutral-900 bg-white ${inputBorder}`}
          placeholderTextColor="#A3A3A3"
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          {...props}
        />
        {isPassword && (
          <Pressable
            className="absolute right-3 top-3.5"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff size={20} color="#737373" />
            ) : (
              <Eye size={20} color="#737373" />
            )}
          </Pressable>
        )}
      </View>
      {hasError && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  );
}
