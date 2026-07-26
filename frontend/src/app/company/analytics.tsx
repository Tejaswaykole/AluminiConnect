import { View } from 'react-native';
import { Typography } from '../../components/Typography';
import { ScreenContainer } from '../../components/ScreenContainer';

export default function AnalyticsScreen() {
  return (
    <ScreenContainer className="justify-center items-center">
      <Typography variant="h1" className="mb-2">Analytics</Typography>
      <Typography variant="body" color="muted">This page is currently under construction.</Typography>
    </ScreenContainer>
  );
}
