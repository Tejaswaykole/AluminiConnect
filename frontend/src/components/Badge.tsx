import { View } from 'react-native';
import { Typography } from './Typography';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  className?: string;
}

export function Badge({ label, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 border-primary/20',
    secondary: 'bg-secondary/10 border-secondary/20',
    success: 'bg-status-success/10 border-status-success/20',
    warning: 'bg-status-warning/10 border-status-warning/20',
    error: 'bg-status-error/10 border-status-error/20',
    outline: 'bg-transparent border-border-strong',
  };

  const textColors = {
    primary: 'primary',
    secondary: 'muted',
    success: 'success', // note: need to update Typography if missing success/warning
    warning: 'warning',
    error: 'error',
    outline: 'default',
  } as const;

  return (
    <View className={`px-2.5 py-0.5 rounded-full border ${variants[variant]} ${className}`}>
      {/* We fallback to default if the color isn't strictly in Typography */}
      <Typography variant="caption" className={`font-medium ${
        variant === 'success' ? 'text-status-success' : 
        variant === 'warning' ? 'text-status-warning' : 
        variant === 'secondary' ? 'text-text-muted' : ''
      }`} color={['primary', 'error', 'default'].includes(textColors[variant]) ? textColors[variant] as any : undefined}>
        {label}
      </Typography>
    </View>
  );
}
