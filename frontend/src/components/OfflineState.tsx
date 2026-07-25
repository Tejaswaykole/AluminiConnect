import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { Button } from './Button';

interface OfflineStateProps {
  onRetry?: () => void;
}

export const OfflineState: React.FC<OfflineStateProps> = ({ onRetry }) => {
  return (
    <View style={styles.container} testID="offline-state">
      <Typography variant="h3" style={styles.title}>You are Offline</Typography>
      <Typography variant="body" style={styles.message}>Please check your internet connection and try again.</Typography>
      {onRetry && (
        <Button title="Try Again" onPress={onRetry} style={styles.retryButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  retryButton: {
    minWidth: 120,
  }
});
