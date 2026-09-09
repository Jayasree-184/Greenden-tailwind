import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Cart() {
  useDocumentTitle('Shopping Cart');

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    shipping,
    total,
    hasFreeShipping,
    amountUntilFreeShipping,
    freeShippingProgress,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleOpenCheckout = () => {
    setOrderNumber(`GD-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsCheckoutOpen(true);
  };

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#EBE4D8] max-w-md mx-auto shadow-sm">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-widest text-emerald-800 uppercase">Empty Basket</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">Your Flower Basket is Empty</h1>
          <p className="text-gray-600 mt-2.5 text-sm leading-relaxed">
            Fill your home with color and natural fragrance! Explore our luxury collection of fresh bouquets, garden roses, and seasonal blooms.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-emerald-950 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-emerald-900 hover:shadow-lg transition-all active:scale-95"
          >
            <span>Explore Fresh Blooms</span>
            <span>→</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 pb-4 border-b border-[#EBE4D8]">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-emerald-800">Florist Basket</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-0.5">Your Flower Basket</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-sans">
            Review your handpicked floral arrangements and proceed to delivery.
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-semibold text-emerald-900 hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
        >
          <span>←</span>
          <span>Add More Blooms</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item Cards */}
        <section className="lg:col-span-8 space-y-4">
          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex justify-between items-center text-xs font-semibold text-emerald-950 mb-2">
              <span className="flex items-center gap-1.5">
                <span>{hasFreeShipping ? '🌸' : '🌿'}</span>
                <span>
                  {hasFreeShipping
                    ? 'Complimentary floral delivery unlocked!'
                    : `Add $${amountUntilFreeShipping} more for complimentary floral delivery`}
                </span>
              </span>
              <span className="text-emerald-800 font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E5DDCF] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-900 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden sm:grid grid-cols-12 text-[11px] font-bold text-gray-400 uppercase tracking-wider px-4 pb-2 border-b border-gray-100">
            <span className="col-span-6">Flower Arrangement</span>
            <span className="col-span-2 text-center">Stem Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Subtotal</span>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {cart.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <article
                  key={item.id}
                  className="bg-white border border-[#EFE9DF] hover:border-emerald-200 rounded-2xl p-4 shadow-xs transition-all flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4"
                >
                  {/* Image & Title */}
                  <div className="col-span-6 flex items-center gap-3.5 w-full">
                    <Link
                      to={`/products/${item.id}`}
                      className="shrink-0 w-20 h-20 rounded-xl bg-[#FAF7F2] p-1.5 overflow-hidden flex items-center justify-center border border-[#EFE9DF]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain max-h-full w-auto hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.id}`}
                        className="font-serif font-bold text-sm sm:text-base text-gray-900 hover:text-emerald-900 truncate block"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        {item.category && (
                          <span className="text-[10px] font-semibold text-emerald-900 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase">
                            {item.category}
                          </span>
                        )}
                        {item.fragrance && (
                          <span className="text-[10px] text-gray-400 hidden sm:inline-block">
                            • {item.fragrance}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-rose-500 hover:text-rose-700 hover:underline mt-2 sm:hidden cursor-pointer flex items-center gap-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="col-span-2 text-center text-sm font-semibold text-gray-700 flex sm:block justify-between w-full sm:w-auto">
                    <span className="sm:hidden text-gray-500 text-xs font-normal">Stem Price:</span>
                    <span>${item.price}</span>
                  </div>

                  {/* Quantity Control */}
                  <div className="col-span-2 flex items-center justify-center w-full sm:w-auto">
                    <div className="flex items-center border border-[#DDD3C4] rounded-full overflow-hidden bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-emerald-100 text-sm font-bold transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        className="w-9 text-center text-xs font-bold text-gray-900 bg-transparent focus:outline-none"
                        aria-label="Item quantity"
                      />
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-emerald-100 text-sm font-bold transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Subtotal & Desktop Remove */}
                  <div className="col-span-2 flex sm:flex-col sm:items-end justify-between items-center w-full sm:w-auto">
                    <span className="sm:hidden text-gray-500 text-xs">Item Total:</span>
                    <span className="text-base font-bold text-emerald-950">${itemTotal}</span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="hidden sm:inline-block text-xs text-rose-500 hover:text-rose-700 hover:underline mt-1 cursor-pointer transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 px-1">
            <Link
              to="/products"
              className="text-xs sm:text-sm font-semibold text-emerald-900 hover:text-emerald-700 hover:underline"
            >
              ← Add more fresh blooms
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs sm:text-sm font-semibold text-rose-600 hover:underline cursor-pointer"
            >
              Clear Basket
            </button>
          </div>
        </section>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-4 bg-[#FAF7F2] rounded-3xl p-6 border border-[#EBE4D8] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E0D7C9]">
            <span className="text-[11px] font-semibold text-emerald-800 tracking-wider uppercase">Boutique Checkout</span>
            <h2 className="text-lg font-serif font-bold text-gray-900">
              Order Summary
            </h2>
          </div>

          <div className="space-y-2.5 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Arrangements</span>
              <span className="font-semibold text-gray-900">{totalItems}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${subtotal}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Boutique Delivery</span>
              {shipping === 0 ? (
                <span className="font-bold text-emerald-800 text-xs bg-emerald-100/90 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  FREE
                </span>
              ) : (
                <span className="font-semibold text-gray-900">${shipping}</span>
              )}
            </div>

            <div className="flex justify-between">
              <span>Florist Tax</span>
              <span className="font-semibold text-gray-900">$0.00</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E0D7C9] flex justify-between items-baseline">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-2xl font-serif font-extrabold text-emerald-950">${total}</span>
          </div>

          <button
            type="button"
            onClick={handleOpenCheckout}
            className="w-full bg-emerald-950 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-emerald-900 hover:shadow-lg transition-all cursor-pointer mt-4 active:scale-98"
          >
            Proceed to Florist Checkout
          </button>

          <div className="pt-3 border-t border-[#E0D7C9] space-y-2 text-[11px] text-gray-500">
            <p className="flex items-center gap-1.5">
              <span className="text-emerald-700 font-bold">✓</span> 7-Day fresh bloom & vase life guarantee
            </p>
            <p className="flex items-center gap-1.5">
              <span className="text-emerald-700 font-bold">✓</span> Hand-tied with satin ribbon in boutique hydration wrap
            </p>
          </div>
        </aside>
      </div>

      {/* Checkout Simulation Modal */}
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Florist Checkout Demo Confirmation"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center border border-[#EBE4D8]">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
              <span className="text-2xl">🌸</span>
            </div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-800">Order Confirmed Demo</span>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">Florist Checkout Coming Soon!</h2>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Thank you for exploring Greenden Flower Boutique! This is a frontend demo. Production payment gateway with Apple Pay and credit cards will be available soon.
            </p>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl my-4 text-left text-xs text-gray-700 space-y-1.5 border border-[#E8E0D2]">
              <div className="flex justify-between font-semibold text-emerald-950 border-b border-[#E0D7C9] pb-1.5">
                <span>Demo Bouquet Reference</span>
                <span className="font-mono text-emerald-900">{orderNumber}</span>
              </div>
              <p>Arrangements in Basket: {totalItems} bloom(s)</p>
              <p>Subtotal: ${subtotal}</p>
              <p>Delivery: {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}`}</p>
              <p className="font-serif font-bold text-emerald-950 pt-1 text-sm">Total: ${total}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="w-full bg-emerald-950 text-white py-3 rounded-full text-sm font-semibold hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              Continue Browsing Blooms
            </button>
          </div>
        </div>
      )}
    </main>
  );
}