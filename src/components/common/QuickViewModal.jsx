import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

/**
 * Accessible Quick View Modal for previewing flower details without page navigation.
 * Employs focus management, keyboard ESC listener, and backdrop click dismiss.
 */
export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const closeBtnRef = useRef(null);

  const favorited = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setIsAdded(false);
      setTimeout(() => closeBtnRef.current?.focus(), 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick View for ${product.name}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#E8E0D2] shadow-2xl relative overflow-hidden flex flex-col md:flex-row animate-bloom">
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-900 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 cursor-pointer"
          aria-label="Close Quick View"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image Panel */}
        <div className="md:w-1/2 bg-gradient-to-b from-[#f2ece1] to-[#e8e0d0] p-6 flex items-center justify-center relative min-h-[260px] md:min-h-[380px]">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain max-h-60 md:max-h-72 w-auto drop-shadow-md hover:scale-105 transition-transform duration-500"
          />
          {product.category && (
            <span className="absolute bottom-4 left-4 bg-emerald-950 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-xs">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Info Panel */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span className="font-semibold text-emerald-800 tracking-wider uppercase">
                {product.flowerType || 'Fresh Bloom'}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 font-bold">★</span>
                <span className="font-semibold text-gray-800">{product.rating || 4.9}</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h2>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-serif font-extrabold text-emerald-950">
                ${product.price}
              </span>
              <span className="text-xs text-emerald-700 font-medium">✓ Fresh Farm Cut</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
              {product.description ||
                'Artisanal hand-selected stem arrangement, wrapped in eco-friendly hydration fabric and delivered with luxury satin ribbon.'}
            </p>

            {/* Fragrance & Vase Life Info */}
            <div className="mt-4 pt-3 border-t border-[#E8E0D2] grid grid-cols-2 gap-2 text-[11px] text-gray-600">
              <div>
                <span className="font-bold text-gray-800 block">Fragrance</span>
                <span className="text-emerald-900">{product.fragrance || 'Delicate & Fresh'}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800 block">Vase Life</span>
                <span className="text-emerald-900">{product.care?.vaseLife || '7–10 Days'}</span>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="mt-6 pt-4 border-t border-[#E8E0D2] space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#DDD3C4] rounded-full overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-emerald-100 text-sm font-bold transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-gray-600 hover:bg-emerald-100 text-sm font-bold transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Basket Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                  isAdded
                    ? 'bg-emerald-800 text-white'
                    : 'bg-emerald-950 text-white hover:bg-emerald-900'
                }`}
              >
                {isAdded ? (
                  <>
                    <span className="text-yellow-200 font-bold">✓</span>
                    <span>Added to Basket</span>
                  </>
                ) : (
                  <>
                    <span>Add to Basket</span>
                    <span>•</span>
                    <span>${product.price * quantity}</span>
                  </>
                )}
              </button>

              {/* Wishlist Toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={favorited ? 'Remove from wishlist' : 'Add to wishlist'}
                className="p-2.5 rounded-full border border-[#DDD3C4] bg-white hover:bg-rose-50 text-gray-500 hover:text-rose-600 transition-colors shadow-2xs cursor-pointer active:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className={`w-4 h-4 ${favorited ? 'fill-rose-600 text-rose-600' : 'fill-none'}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center">
              <Link
                to={`/products/${product.id}`}
                onClick={onClose}
                className="text-xs font-semibold text-emerald-900 hover:underline inline-flex items-center gap-1"
              >
                <span>View Complete Floral Story & Care Guide</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}