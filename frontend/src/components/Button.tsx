import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Typography } from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  className?: string;
}

export function Button({ 
  title, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  disabled, 
  ...props 
}: ButtonProps) {
  
  const baseClasses = 'flex-row items-center justify-center rounded px-4 py-3 active:opacity-80 transition-opacity';
  
  const variants = {
    primary: 'bg-primary-container',
    secondary: 'bg-white border border-border',
    outline: 'border border-border bg-transparent',
    ghost: 'bg-transparent active:bg-surface hover:bg-surface',
  };

  const textColors = {
    primary: 'inverse',
    secondary: 'default',
    outline: 'default',
    ghost: 'muted',
  };

  const disabledClass = disabled || isLoading ? 'opacity-50' : '';
  const classes = `${baseClasses} ${variants[variant]} ${disabledClass} ${className}`;

  return (
    <TouchableOpacity 
      className={classes} 
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#154539'} />
      ) : (
        <Typography 
          variant="body" 
          color={textColors[variant] as any}
          className="font-semibold"
        >
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
}
