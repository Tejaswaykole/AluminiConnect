import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = 'No Data Found', 
  message = 'There is currently no data to display here.' 
}) => {
  return (
    <View style={styles.container} testID="empty-state">
      <Typography variant="h3" style={styles.title}>{title}</Typography>
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
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#666',
  },
});
