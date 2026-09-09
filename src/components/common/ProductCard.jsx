import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const favorited = isInWishlist(product.id);
  const [isAdded, setIsAdded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHeartRippling, setIsHeartRippling] = useState(false);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Maximum 3.5 degrees tilt
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!favorited) {
      setIsHeartRippling(true);
      setTimeout(() => setIsHeartRippling(false), 600);
    }
  };

  return (
    <>
      <article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out' : 'none',
        }}
        className="group relative flex flex-col justify-between h-full bg-[#fdfcf9] border border-[#eee9df] hover:border-emerald-300/80 rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        {/* Wishlist Heart Button with Circular Ripple */}
        <div className="absolute top-4 right-4 z-10 flex items-center justify-center">
          {isHeartRippling && (
            <span className="absolute w-8 h-8 rounded-full border-2 border-rose-400 animate-heart-ripple pointer-events-none" />
          )}
          <button
            type="button"
            aria-label={favorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            onClick={handleToggleWishlist}
            className="p-2 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white shadow-sm hover:shadow text-gray-500 hover:text-rose-600 transition-all duration-200 cursor-pointer active:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className={`w-4 h-4 transition-colors duration-200 ${
                favorited ? 'fill-rose-600 text-rose-600 animate-heart-bounce' : 'fill-none'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        {/* Flower Image Container with Depth Lift & Ambient Glow */}
        <div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#f7f5f0] to-[#f0ece1] p-3 aspect-square flex items-center justify-center">
            {/* Subtle radial glow behind flower on hover */}
            <div className="absolute inset-4 rounded-full bg-emerald-300/0 group-hover:bg-emerald-400/20 blur-xl transition-all duration-500 pointer-events-none" />

            <Link
              to={`/products/${product.id}`}
              className="block w-full h-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 rounded-lg"
              title={`View details for ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="object-contain max-h-48 sm:max-h-56 w-auto transform group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out drop-shadow-xs"
                onError={(e) => {
                  e.currentTarget.src = '/images/header-image.jpg';
                }}
              />
            </Link>

            {/* Quick View Button on Hover */}
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 px-2 pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsQuickViewOpen(true)}
                className="bg-white/95 text-emerald-950 hover:bg-emerald-950 hover:text-white border border-[#E0D7C9] text-[11px] font-bold py-1.5 px-3 rounded-full shadow-md transition-colors duration-200 cursor-pointer flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
                aria-label={`Quick View ${product.name}`}
              >
                <span>👁</span>
                <span>Quick View</span>
              </button>

              <Link
                to={`/products/${product.id}`}
                className="bg-emerald-950/90 text-white hover:bg-emerald-900 text-[11px] font-bold py-1.5 px-3 rounded-full shadow-md transition-colors duration-200 flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
              >
                <span>View</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Category Badge & Star Rating */}
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold tracking-wider text-emerald-900 bg-emerald-100/70 border border-emerald-200/60 px-2.5 py-0.5 rounded-full uppercase">
              {product.category || product.flowerType || 'Bloom'}
            </span>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-yellow-500 font-bold text-xs">★</span>
              <span className="font-semibold text-gray-800 text-xs">{product.rating || 4.9}</span>
            </div>
          </div>

          {/* Flower Name */}
          <Link
            to={`/products/${product.id}`}
            className="block mt-1.5 focus:outline-none focus-visible:underline"
          >
            <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-[#f0ece1] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-gray-400">Fresh Stem</span>
            <span className="text-lg font-extrabold text-gray-900 font-serif">
              ${product.price}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-300 cursor-pointer shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 ${
              isAdded
                ? 'bg-emerald-800 text-white scale-95 ring-2 ring-emerald-400/50'
                : 'bg-emerald-950 text-white hover:bg-emerald-900 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <span className="text-yellow-200 font-bold">✓</span>
                <span>Added</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span>Add to Basket</span>
              </>
            )}
          </button>
        </div>
      </article>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}