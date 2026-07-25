import { View, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';

interface ListItemProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export function ListItem({ title, subtitle, rightElement, leftElement, onPress, className = '' }: ListItemProps) {
  const Container = onPress ? TouchableOpacity : View;
  
  return (
    <Container 
      className={`flex-row items-center bg-background rounded-lg p-4 border border-border-strong mb-3 ${className}`}
      {...(onPress ? { onPress, activeOpacity: 0.7 } : {})}
    >
      {leftElement && <View className="mr-3">{leftElement}</View>}
      
      <View className="flex-1 justify-center">
        <Typography variant="body" className="font-semibold">{title}</Typography>
        {subtitle && (
          <Typography variant="caption" color="muted" className="mt-0.5">
            {subtitle}
          </Typography>
        )}
      </View>

      {rightElement && <View className="ml-3">{rightElement}</View>}
    </Container>
  );
}
