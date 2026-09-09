import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('greenden_cart', []);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [cartBadgePulse, setCartBadgePulse] = useState(false);
  const { showToast } = useToast();

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);
  const toggleCartDrawer = useCallback(() => setIsCartDrawerOpen((prev) => !prev), []);

  const addToCart = (product, quantity = 1, shouldOpenDrawer = false) => {
    const qty = Math.max(1, Number(quantity) || 1);
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      }
      return [...prevCart, { ...product, quantity: qty }];
    });
    showToast(`Added ${product.name} to cart!`);
    setCartBadgePulse(true);
    setTimeout(() => setCartBadgePulse(false), 600);
    if (shouldOpenDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.name} from cart`);
    } else {
      showToast('Removed from cart');
    }
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  const { totalItems, subtotal } = useMemo(() => {
    const items = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const sum = cart.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    return { totalItems: items, subtotal: sum };
  }, [cart]);

  const freeShippingThreshold = 50;
  const hasFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const shipping = subtotal === 0 || hasFreeShipping ? 0 : 10;
  const total = subtotal + (subtotal === 0 ? 0 : shipping);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        total,
        freeShippingThreshold,
        hasFreeShipping,
        amountUntilFreeShipping,
        freeShippingProgress,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer,
        cartBadgePulse,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}