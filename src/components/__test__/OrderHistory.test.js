import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderHistory from '../OrderHistory';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('OrderHistory component', () => {
  it('renders OrderHistory component with processed orders', async () => {
    const mockOrders = [
      { event_id: 1, event_name: 'marriage', amount: 1000, phone: '0702707326' },
      { event_id: 2, event_name: 'marriage', amount: 3000, phone: '0702707443' },
    ];

    
    fetch.mockResponseOnce(JSON.stringify(mockOrders));

    render(<OrderHistory />);

    
    await waitFor(() => {
      expect(screen.getByText('Processed Orders')).toBeInTheDocument();
    });

    
    expect(screen.getByText('Event Name: Event 1')).toBeInTheDocument();
    expect(screen.getByText('Amount: 1000')).toBeInTheDocument();
    expect(screen.getByText('Phone: 0702707326')).toBeInTheDocument();

    expect(screen.getByText('Event Name: Event 2')).toBeInTheDocument();
    expect(screen.getByText('Amount: 3000')).toBeInTheDocument();
    expect(screen.getByText('Phone: 0702707443')).toBeInTheDocument();
  });

  it('renders OrderHistory component with no processed orders', async () => {
    
    fetch.mockResponseOnce(JSON.stringify([]));

    render(<OrderHistory />);

    
    await waitFor(() => {
      expect(screen.getByText('Processed Orders')).toBeInTheDocument();
    });

    
    expect(screen.getByText('No processed events available.')).toBeInTheDocument();
  });
});
