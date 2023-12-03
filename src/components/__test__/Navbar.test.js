import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

describe('Navbar component', () => {
  const mockCart = [
    
    {
      id: 1,
      event_name: 'marriage',
      ticketType: 'Regular',
      regular_price: '87',
      MVP_price: '116.00',
      early_booking_price: '68.00',
     // images: 'event1.jpg',
      cartItemId: 'cartItem1',
    },
   
  ];

  const mockRemoveFromCart = jest.fn();

  it('renders Navbar component', () => {
    render(<Navbar cartLength={mockCart.length} cart={mockCart} removeFromCart={mockRemoveFromCart} />);

    expect(screen.getByText('Tiketi Tamasha')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByAltText('Cart')).toBeInTheDocument();
  });

  it('opens and closes the shopping cart', () => {
    render(<Navbar cartLength={mockCart.length} cart={mockCart} removeFromCart={mockRemoveFromCart} />);

    const cartIcon = screen.getByAltText('Cart');


    expect(screen.queryByTestId('cart')).not.toBeInTheDocument();

   t
    fireEvent.click(cartIcon);

   
    expect(screen.getByTestId('cart')).toBeInTheDocument();

   
    fireEvent.click(cartIcon);

    
    expect(screen.queryByTestId('cart')).not.toBeInTheDocument();
  });

  
});
