import { View, ViewProps, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenContainerProps extends ViewProps {
  scrollable?: boolean;
  className?: string;
}

export function ScreenContainer({ 
  scrollable = false, 
  className = '', 
  children, 
  ...props 
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const Container = scrollable ? ScrollView : View;
  
  return (
    <Container
      className={`flex-1 bg-background-surface ${className}`}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      {...(scrollable ? { contentContainerStyle: { flexGrow: 1 } } : {})}
      {...props}
    >
      <View className="flex-1 px-4 py-6 w-full max-w-7xl mx-auto">
        {children}
      </View>
    </Container>
  );
}
