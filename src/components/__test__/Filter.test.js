import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './Filter';

describe('filter component', () => {
  const mockHandleName = jest.fn();

  it('renders filter component', () => {
    render(<Filter handlename={mockHandleName} />);

    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search name or location ...')).toBeInTheDocument();
  });

  it('calls handlename when input value changes', () => {
    render(<Filter handlename={mockHandleName} />);

    const input = screen.getByPlaceholderText('Search name or location ...');
    fireEvent.change(input, { target: { value: 'New York' } });

    expect(mockHandleName).toHaveBeenCalledWith(expect.any(Object));
    expect(mockHandleName).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'New York' } }));
  });


});
