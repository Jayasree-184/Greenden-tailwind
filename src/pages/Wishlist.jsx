import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Wishlist() {
  useDocumentTitle('My Wishlist');
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#EBE4D8] max-w-md mx-auto shadow-sm">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-5 border border-rose-100 shadow-inner">
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-widest text-emerald-800 uppercase">Floral Wishlist</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">Your Flower Collection is Waiting</h1>
          <p className="text-gray-600 mt-2.5 text-sm leading-relaxed">
            Keep track of your favorite garden roses, fresh peonies, and bespoke stems by clicking the heart icon on any floral arrangement.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-emerald-950 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-emerald-900 hover:shadow-lg transition-all active:scale-95"
          >
            <span>Discover Fresh Blooms</span>
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
          <span className="text-xs font-semibold tracking-widest uppercase text-emerald-800">Curated Favorites</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-0.5">My Favorite Flowers</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'bloom' : 'blooms'} saved to your botanical wishlist.
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-semibold text-emerald-900 hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
        >
          <span>Browse All Blooms</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <article
            key={product.id}
            className="group relative flex flex-col justify-between h-full bg-white border border-[#EFE9DF] hover:border-emerald-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300"
          >
            {/* Remove from Wishlist Heart Button */}
            <button
              type="button"
              onClick={() => removeFromWishlist(product.id)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/95 hover:bg-white text-rose-500 shadow-sm transition-transform active:scale-125 cursor-pointer border border-rose-100"
              title="Remove from Wishlist"
              aria-label={`Remove ${product.name} from wishlist`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-rose-500">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </button>

            <div>
              {/* Product Image Link */}
              <Link
                to={`/products/${product.id}`}
                className="block overflow-hidden rounded-xl bg-[#FAF7F2] p-3 aspect-square flex items-center justify-center relative border border-[#F0EAE0]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="object-contain max-h-44 sm:max-h-48 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Category & Title */}
              <div className="mt-3">
                {product.category && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                )}
                <Link to={`/products/${product.id}`} className="block mt-1 focus:outline-none focus-visible:underline">
                  <h2 className="text-sm sm:text-base font-serif font-bold text-gray-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                    {product.name}
                  </h2>
                </Link>
                <p className="font-serif font-extrabold text-emerald-950 text-sm sm:text-base mt-1">
                  ${product.price}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-[#F0EAE0]">
              <button
                type="button"
                onClick={() => {
                  addToCart(product, 1, false);
                }}
                className="w-full bg-emerald-950 text-white text-xs font-semibold py-2.5 rounded-full hover:bg-emerald-900 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span>Move to Basket</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}