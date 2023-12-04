import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
    
  const addToCart = (item) => {
    const cartItemId = `${item.id}_${item.ticketType}`;

    const existingItem = cart.find((cartItem) => cartItem.cartItemId === cartItemId);

    if (existingItem) {
     setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.cartItemId === cartItemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
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
  const emptyCart =()=>{
    setCart([]);
  }
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, emptyCart }}>
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
