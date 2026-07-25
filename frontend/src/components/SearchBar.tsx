import { View, TextInput, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search...', className = '' }: SearchBarProps) {
  return (
    <View className={`flex-row items-center bg-background-surface border border-border-strong rounded-lg px-3 py-2 ${className}`}>
      <Typography variant="body" color="muted" className="mr-2">🔍</Typography>
      <TextInput
        className="flex-1 text-text font-sans"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} className="p-1">
          <Typography variant="caption" color="muted" className="font-bold">✕</Typography>
        </TouchableOpacity>
      )}
    </View>
  );
}
