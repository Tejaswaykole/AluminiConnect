import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '../../src/components/Badge';

describe('Badge Component', () => {
  it('renders correctly with default variant', () => {
    const { getByText } = render(<Badge text="New" />);
    expect(getByText('New')).toBeTruthy();
  });

  it('renders success variant', () => {
    const { getByText } = render(<Badge text="Success" variant="success" />);
    expect(getByText('Success')).toBeTruthy();
  });
});
