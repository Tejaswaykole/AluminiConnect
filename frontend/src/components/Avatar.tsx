import { View, Image } from 'react-native';
import { Typography } from './Typography';

interface AvatarProps {
  url?: string;
  fallbackInitials: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ url, fallbackInitials, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'caption',
    md: 'body',
    lg: 'h3',
    xl: 'h2',
  } as const;

  return (
    <View className={`rounded-full bg-secondary items-center justify-center overflow-hidden ${sizes[size]} ${className}`}>
      {url ? (
        <Image source={{ uri: url }} className="w-full h-full" resizeMode="cover" />
      ) : (
        <Typography variant={textSizes[size]} color="inverse" className="font-bold">
          {fallbackInitials}
        </Typography>
      )}
    </View>
  );
}
