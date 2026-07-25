import { View, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';

interface SectionProps {
  title: string;
  onSeeAll?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, onSeeAll, children, className = '' }: SectionProps) {
  return (
    <View className={`mb-6 w-full ${className}`}>
      <View className="flex-row justify-between items-center mb-3">
        <Typography variant="h3" className="font-semibold">
          {title}
        </Typography>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7} className="px-2 py-1 -mr-2">
            <Typography variant="caption" color="primary" className="font-medium">
              See All
            </Typography>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}
