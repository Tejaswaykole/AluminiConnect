import { TouchableOpacity } from 'react-native';
import { Typography } from './Typography';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  className?: string;
}

export function FilterChip({ label, isSelected, onPress, className = '' }: FilterChipProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`px-4 py-1.5 rounded-full border ${
        isSelected 
          ? 'bg-primary border-primary' 
          : 'bg-background border-border-strong'
      } ${className}`}
    >
      <Typography 
        variant="caption" 
        className={`font-medium ${isSelected ? 'text-text-inverse' : 'text-text'}`}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
}
