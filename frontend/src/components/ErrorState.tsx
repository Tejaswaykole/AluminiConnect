import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = 'Something went wrong', 
  message = 'We encountered an unexpected error. Please try again.',
  onRetry
}) => {
  return (
    <View style={styles.container} testID="error-state">
      <Typography variant="h3" style={styles.title}>{title}</Typography>
      <Typography variant="body" style={styles.message}>{message}</Typography>
      {onRetry && (
        <Button title="Retry" onPress={onRetry} style={styles.retryButton} />
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
    color: '#D32F2F',
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
