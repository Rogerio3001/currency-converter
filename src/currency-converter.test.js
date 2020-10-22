import React from 'react';
import ReactDOM from 'react-dom'
import CurrencyConverter from './currency-converter';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'

describe('Test of component currency converter', () => {
  it('renders learn react link', () => {
    const { getByText } = render(<CurrencyConverter />);
    const linkElement = getByText(/Conversor/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('shold make a conversion of currency', async () => {
    const {findByTestId, getByTestId } = render(<CurrencyConverter />)
    axiosMock.get.mockResolvedValueOnce({
      data: { success: true, rates: { BRL: 4.564292, USD: 1.101049}}
    })
    fireEvent.click(getByTestId('btn-converter'))
    const modal = await findByTestId('modal')
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(modal).toHaveTextContent('1 BRL = 0.24 USD')
  })
})