import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage('greenden_wishlist', []);
  const { showToast } = useToast();

  const isInWishlist = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          showToast(`Removed ${product.name} from wishlist`);
          return prev.filter((item) => item.id !== product.id);
        } else {
          showToast(`Added ${product.name} to wishlist`);
          return [...prev, product];
        }
      });
    },
    [setWishlist, showToast]
  );

  const removeFromWishlist = useCallback(
    (productId) => {
      const item = wishlist.find((i) => i.id === productId);
      setWishlist((prev) => prev.filter((i) => i.id !== productId));
      if (item) {
        showToast(`Removed ${item.name} from wishlist`);
      }
    },
    [wishlist, setWishlist, showToast]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}