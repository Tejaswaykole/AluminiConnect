import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'default' | 'muted' | 'inverse' | 'primary' | 'error';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function Typography({ 
  variant = 'body', 
  color = 'default', 
  align = 'left',
  className = '', 
  children, 
  ...props 
}: TypographyProps) {
  const baseClasses = 'font-sans';
  
  const variants = {
    h1: 'text-4xl font-bold leading-tight',
    h2: 'text-2xl font-semibold leading-snug',
    h3: 'text-xl font-medium leading-normal',
    body: 'text-base font-normal leading-relaxed',
    caption: 'text-sm font-normal leading-normal',
  };

  const colors = {
    default: 'text-text',
    muted: 'text-text-muted',
    inverse: 'text-text-inverse',
    primary: 'text-primary',
    error: 'text-status-error',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const classes = `${baseClasses} ${variants[variant]} ${colors[color]} ${alignments[align]} ${className}`;

  return (
    <Text className={classes} {...props}>
      {children}
    </Text>
  );
}
