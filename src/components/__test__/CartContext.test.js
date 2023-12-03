import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '../CartProvider';

describe('CartProvider and useCart', () => {
  it('renders children with CartProvider', () => {
    const MockComponent = () => {
      const cartContext = useCart();
      return (
        <div>
          <span data-testid="cart-length">{cartContext.cart.length}</span>
          <button onClick={() => cartContext.addToCart({ id: 1, ticketType: 'Regular' })}>Add to Cart</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>
    );

    
    expect(screen.getByTestId('cart-length')).toBeInTheDocument();
  });

  it('updates cart state with addToCart', () => {
    const MockComponent = () => {
      const cartContext = useCart();
      return (
        <div>
          <span data-testid="cart-length">{cartContext.cart.length}</span>
          <button onClick={() => cartContext.addToCart({ id: 1, ticketType: 'Regular' })}>Add to Cart</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>
    );

    
    expect(screen.getByTestId('cart-length')).toHaveTextContent('0');

   
    const addToCartButton = screen.getByText('Add to Cart');
    addToCartButton.click();

    
    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
  });

  it('updates cart state with removeFromCart', () => {
    const MockComponent = () => {
      const cartContext = useCart();
      return (
        <div>
          <span data-testid="cart-length">{cartContext.cart.length}</span>
          <button onClick={() => cartContext.addToCart({ id: 1, ticketType: 'Regular' })}>Add to Cart</button>
          <button onClick={() => cartContext.removeFromCart('1_Regular')}>Remove from Cart</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <MockComponent />
      </CartProvider>
    );

    
    const addToCartButton = screen.getByText('Add to Cart');
    addToCartButton.click();

    
    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');

    
    const removeFromCartButton = screen.getByText('Remove from Cart');
    removeFromCartButton.click();

    
    expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
  });
});
