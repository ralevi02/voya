import { Pressable, Text, ActivityIndicator } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-primary-600 active:bg-primary-700',
    text: 'text-white',
  },
  secondary: {
    container: 'bg-neutral-100 active:bg-neutral-200',
    text: 'text-neutral-800',
  },
  ghost: {
    container: 'bg-transparent active:bg-neutral-100',
    text: 'text-primary-600',
  },
  outline: {
    container: 'bg-white border border-neutral-300 active:bg-neutral-50',
    text: 'text-neutral-800',
  },
};

export function Button({
  title,
  variant = 'primary',
  isLoading = false,
  disabled,
  onPress,
  icon,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const classes = variantClasses[variant];
  const spinnerColor = variant === 'primary' ? '#FFFFFF' : '#4F46E5';

  return (
    <Pressable
      className={`h-12 rounded-xl items-center justify-center px-6 flex-row gap-2 ${classes.container} ${isDisabled ? 'opacity-50' : ''}`}
      disabled={isDisabled}
      onPress={isDisabled ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <>
          {icon}
          <Text className={`text-base font-semibold ${classes.text}`}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}
