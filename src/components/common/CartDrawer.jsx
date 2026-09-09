import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ onOpenCheckoutModal }) {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    subtotal,
    amountUntilFreeShipping,
    hasFreeShipping,
    freeShippingProgress,
  } = useCart();

  const navigate = useNavigate();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside className="relative w-full max-w-md bg-[#faf8f5] h-full shadow-2xl flex flex-col z-10 animate-slide-in-right border-l border-[#ede7dc] transition-transform duration-350 ease-out">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ede7dc] flex items-center justify-between bg-white/85 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-heart-bounce">🌸</span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              Floral Basket ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCartDrawer}
            className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
            aria-label="Close cart drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Indicator with Celebratory Blooming Petals */}
        <div className="bg-[#FAF7F2] p-4 text-xs border-b border-[#E8E0D2] relative overflow-hidden">
          <div className="flex justify-between items-center mb-2 font-medium text-emerald-950">
            {hasFreeShipping ? (
              <span className="font-bold flex items-center gap-1.5 text-emerald-900 animate-fade-in">
                <span className="animate-spin text-sm" style={{ animationDuration: '6s' }}>🌸</span>
                <span>You unlocked COMPLIMENTARY DELIVERY!</span>
                <span className="animate-spin text-sm" style={{ animationDuration: '6s' }}>🌸</span>
              </span>
            ) : (
              <span>
                Add <strong className="font-bold text-emerald-900">${amountUntilFreeShipping}</strong> more for <strong>COMPLIMENTARY DELIVERY</strong>
              </span>
            )}
            <span className="font-extrabold text-emerald-900">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#E5DDCF] rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-900 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-900 rounded-full flex items-center justify-center mb-3 text-3xl">
                🌸
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Your flower basket is empty
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xs leading-relaxed">
                Explore our fresh collection of garden roses, lilies, and vibrant tulips to brighten your day.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  navigate('/products');
                }}
                className="mt-5 bg-emerald-950 text-white px-6 py-2.5 text-xs font-semibold rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer shadow-xs"
              >
                Browse Flowers
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-[#ede7dc] bg-white shadow-2xs hover:border-emerald-200 transition-all"
              >
                <Link
                  to={`/products/${item.id}`}
                  onClick={closeCartDrawer}
                  className="shrink-0 w-16 h-16 rounded-lg bg-[#f7f5f0] p-1 overflow-hidden flex items-center justify-center border border-[#eee8dc]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain max-h-full w-auto hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${item.id}`}
                    onClick={closeCartDrawer}
                    className="font-serif font-bold text-xs sm:text-sm text-gray-900 hover:text-emerald-900 truncate block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs font-semibold text-emerald-900 mt-0.5">
                    ${item.price} each
                  </p>

                  {/* Quantity Controls in Drawer */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg text-xs bg-gray-50/80">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-0.5 hover:bg-gray-200 text-gray-600 font-bold"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-2 font-semibold text-gray-800">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-0.5 hover:bg-gray-200 text-gray-600 font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-serif text-sm font-extrabold text-gray-900 block">
                    ${item.price * item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[11px] text-rose-500 hover:text-rose-700 hover:underline mt-2 inline-block cursor-pointer font-medium"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#ede7dc] bg-white/80 backdrop-blur-xs space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="font-serif text-lg font-black text-emerald-950">${subtotal}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/cart"
                onClick={closeCartDrawer}
                className="w-full text-center border border-emerald-950 rounded-xl py-2.5 text-xs font-semibold text-emerald-950 hover:bg-emerald-950 hover:text-white transition-colors"
              >
                View Full Cart
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  if (onOpenCheckoutModal) onOpenCheckoutModal();
                  else navigate('/cart');
                }}
                className="w-full bg-emerald-950 text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}