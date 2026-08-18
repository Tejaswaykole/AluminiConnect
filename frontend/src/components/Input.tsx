import { TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Typography } from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  isPassword?: boolean;
}

export function Input({ label, error, className = '', isPassword = false, ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);

  return (
    <View className={`w-full ${className}`}>
      {label ? (
        <Typography variant="caption" color="muted" className="mb-1 font-medium">
          {label}
        </Typography>
      ) : null}
      <View className="relative w-full">
        <TextInput
          className={`w-full bg-surface border ${error ? 'border-status-error' : 'border-border-strong'} rounded-md px-4 py-3 text-text font-sans ${isPassword ? 'pr-12' : ''}`}
          placeholderTextColor="#64748b"
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity 
            className="absolute right-4 top-0 bottom-0 justify-center"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Typography variant="caption" color="muted">
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Typography>
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <Typography variant="caption" color="error" className="mt-1">
          {error}
        </Typography>
      ) : null}
    </View>
  );
}
