import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <View 
      className={`bg-background rounded-lg border border-border shadow-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
