import React from 'react';
import { render } from '@testing-library/react';
import CurrencyConverter from './currency-converter';

test('renders learn react link', () => {
  const { getByText } = render(<CurrencyConverter />);
  const linkElement = getByText(/currency/i);
  expect(linkElement).toBeInTheDocument();
});
