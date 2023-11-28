// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Generate a unique ID based on item ID and ticket type
    const cartItemId = `${item.id}_${item.ticketType}`;

    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem.cartItemId === cartItemId);

    if (existingItem) {
      // If the item is already in the cart, update the quantity or perform other actions
      // For example, you might want to increase the quantity instead of adding a duplicate
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.cartItemId === cartItemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCart((prevCart) => [...prevCart, { ...item, cartItemId, quantity: 1 }]);
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
