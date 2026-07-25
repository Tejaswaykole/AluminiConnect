import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body-lg' | 'body' | 'body-sm' | 'label-md' | 'caption';
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
    h1: 'text-3xl font-semibold leading-[1.2] tracking-[-0.02em]',
    h2: 'text-[28px] font-semibold leading-[1.2] tracking-[-0.01em]',
    h3: 'text-2xl font-semibold leading-[1.3]',
    h4: 'text-xl font-semibold leading-[1.4]',
    'body-lg': 'text-lg font-normal leading-[1.6]',
    body: 'text-base font-normal leading-[1.6]',
    'body-sm': 'text-sm font-normal leading-[1.5]',
    'label-md': 'text-[13px] font-medium leading-none',
    caption: 'text-xs font-medium leading-none tracking-[0.02em]',
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
