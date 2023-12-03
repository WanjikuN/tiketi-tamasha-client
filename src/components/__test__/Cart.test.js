import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cart from '../Cart';

describe('Cart component', () => {
  const mockCart = [
    
    {
      id: 1,
      event_name: 'Event 1',
      ticketType: 'Regular',
      regular_price: '10.00',
      MVP_price: '15.00',
      early_booking_price: '8.00',
      images: 'event1.jpg',
      cartItemId: 'cartItem1',
    },
    
  ];

  const mockRemoveFromCart = jest.fn();

  it('renders Cart with empty cart', () => {
    render(<Cart cart={[]} onClose={() => {}} removeFromCart={mockRemoveFromCart} />);

    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
    expect(screen.queryByTestId('cart_details')).not.toBeInTheDocument();
  });

  it('renders Cart with items in the cart', () => {
    render(<Cart cart={mockCart} onClose={() => {}} removeFromCart={mockRemoveFromCart} />);

    expect(screen.queryByText('Cart is empty')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('cart_details')).toHaveLength(mockCart.length);
  });

  it('calculates total price correctly', () => {
    render(<Cart cart={mockCart} onClose={() => {}} removeFromCart={mockRemoveFromCart} />);

    const total = screen.getByTestId('total');
    const expectedTotal = mockCart.reduce((acc, item) => {
      const itemTotal = parseFloat(item.regular_price) * (1 || 1); 
      return acc + itemTotal;
    }, 0);

    expect(total.textContent).toBe(`Total: $ ${expectedTotal.toFixed(2)}`);
  });

  it('calls removeFromCart when delete button is clicked', () => {
    render(<Cart cart={mockCart} onClose={() => {}} removeFromCart={mockRemoveFromCart} />);

    const deleteButtons = screen.getAllByText('X');
    deleteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(mockRemoveFromCart).toHaveBeenCalledTimes(mockCart.length);
  });

  
});
