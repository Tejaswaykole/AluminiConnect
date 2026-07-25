import { TextInput, TextInputProps, View } from 'react-native';
import { Typography } from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <View className={`w-full ${className}`}>
      {label && (
        <Typography variant="caption" color="muted" className="mb-1 font-medium">
          {label}
        </Typography>
      )}
      <TextInput
        className={`w-full bg-background-surface border ${error ? 'border-status-error' : 'border-border-strong'} rounded-md px-4 py-3 text-text font-sans`}
        placeholderTextColor="#64748b"
        {...props}
      />
      {error && (
        <Typography variant="caption" color="error" className="mt-1">
          {error}
        </Typography>
      )}
    </View>
  );
}
