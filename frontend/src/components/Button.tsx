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
  
  const baseClasses = 'flex-row items-center justify-center rounded-lg px-4 py-3 active:opacity-80 transition-opacity';
  
  const variants = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    outline: 'border-2 border-border-strong bg-transparent',
    ghost: 'bg-transparent',
  };

  const textColors = {
    primary: 'inverse',
    secondary: 'inverse',
    outline: 'default',
    ghost: 'primary',
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
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#2563eb' : '#ffffff'} />
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
