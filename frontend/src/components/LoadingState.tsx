import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Typography } from './Typography';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container} testID="loading-state">
      <ActivityIndicator size="large" color="#0000ff" />
      <Typography variant="body" style={styles.message}>{message}</Typography>
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
  message: {
    marginTop: 16,
    textAlign: 'center',
  },
});
