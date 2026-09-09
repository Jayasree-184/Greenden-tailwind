import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ProductCard from '../components/common/ProductCard';
import ScrollReveal from '../components/common/ScrollReveal';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);

  useDocumentTitle(product ? product.name : 'Flower Not Found');

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Related flowers generated dynamically from existing product data
  const relatedFlowers = useMemo(() => {
    if (!product) return [];
    const sameCategory = products.filter(
      (p) => p.id !== product.id && (p.category === product.category || p.flowerType === product.flowerType)
    );
    const otherCategory = products.filter(
      (p) => p.id !== product.id && p.category !== product.category && p.flowerType !== product.flowerType
    );
    return [...sameCategory, ...otherCategory].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-[65vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          🌸
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-gray-900 mb-2">
          Flower Not Found
        </h1>
        <p className="text-gray-600 mb-6 max-w-sm text-xs sm:text-sm">
          The floral arrangement or stem you are looking for has blossomed or been relocated in our nursery.
        </p>
        <Link
          to="/products"
          className="bg-emerald-950 text-white px-7 py-3 rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
        >
          Return to Flowers Collection
        </Link>
      </main>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const maxStock = product.inStock || 15;

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => Math.min(maxStock, prev + 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-8 flex items-center gap-1.5 font-medium">
        <Link to="/" className="hover:text-emerald-950 transition-colors">
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <Link to="/products" className="hover:text-emerald-950 transition-colors">
          Flowers
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Flower Image Container with Zoom & Botanical Depth */}
        <div className="lg:col-span-6 animate-bloom">
          <div className="group overflow-hidden rounded-3xl bg-gradient-to-b from-[#f7f4ee] to-[#ede7dc] border border-[#e8dfcf] p-6 sm:p-12 flex items-center justify-center relative shadow-md">
            {/* Ambient botanical radial glow behind flower */}
            <div className="absolute inset-8 rounded-full bg-emerald-300/25 blur-3xl group-hover:bg-emerald-300/40 transition-all duration-700 pointer-events-none" />

            {/* Decorative leaf corner accents */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-20 text-emerald-800" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0 C60 30, 90 40, 100 50 C70 60, 60 90, 50 100 C40 70, 10 60, 0 50 C30 40, 40 10, 50 0 Z" />
              </svg>
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="rounded-2xl object-contain max-h-[500px] w-auto transform group-hover:scale-108 transition-transform duration-700 ease-out drop-shadow-sm"
            />
            {product.category && (
              <span className="absolute top-5 left-5 text-[10px] font-bold uppercase tracking-widest text-emerald-950 bg-white/95 backdrop-blur-xs px-3.5 py-1 rounded-full shadow-xs border border-emerald-100">
                {product.category}
              </span>
            )}
            {product.freshness && (
              <span className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100/90 backdrop-blur-xs px-3 py-1 rounded-full shadow-2xs">
                {product.freshness}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Floral Details & Controls */}
        <div className="lg:col-span-6 flex flex-col space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
                Boutique Cut Stems
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-yellow-500 font-bold">★★★★★</span>
                <span className="font-bold text-gray-900">{product.rating || 4.9}</span>
                <span className="text-gray-500">({product.reviewsCount || 42} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-1 tracking-tight leading-tight">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="font-serif italic text-sm text-emerald-900 mt-1 font-medium">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Price & Delivery Badge */}
          <div className="flex items-baseline gap-4 pb-3 border-b border-[#e8dfcf]">
            <span className="font-serif text-3xl sm:text-4xl font-black text-emerald-950">
              ${product.price}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
              Free Shipping Over $50
            </span>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-emerald-900">
              In Stock & Hand-Selected ({maxStock} stems available today)
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#e8dfcf] rounded-xl overflow-hidden bg-white shadow-2xs shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleDecrease}
                className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={maxStock}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val)) setQuantity(Math.max(1, Math.min(maxStock, val)));
                }}
                className="w-12 text-center text-sm font-semibold text-gray-900 focus:outline-none"
                aria-label="Flower quantity"
              />
              <button
                type="button"
                onClick={handleIncrease}
                className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-98 ${
                isAdded
                  ? 'bg-emerald-800 text-white ring-2 ring-emerald-300'
                  : 'bg-emerald-950 text-white hover:bg-emerald-800'
              }`}
            >
              {isAdded ? (
                <>
                  <span className="text-yellow-200 font-bold">✓</span>
                  <span>Added to Floral Cart ({quantity})</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span>Add to Cart • ${product.price * quantity}</span>
                </>
              )}
            </button>

            {/* Wishlist Heart */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer shadow-2xs active:scale-95 ${
                isFavorited
                  ? 'border-rose-500 bg-rose-50 text-rose-600'
                  : 'border-[#e8dfcf] hover:border-emerald-950 text-gray-700 bg-white'
              }`}
              title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={`w-5 h-5 ${
                  isFavorited ? 'fill-rose-600 text-rose-600 animate-heart-bounce' : 'fill-none'
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

          {/* Occasion / Perfect For Tags */}
          {product.perfectFor && (
            <div className="pt-4 border-t border-[#e8dfcf]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Perfect For Occasions
              </span>
              <div className="flex flex-wrap gap-2">
                {product.perfectFor.map((occ, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-emerald-950 bg-[#f4eee2] px-3 py-1 rounded-full border border-[#e8dfcf]"
                  >
                    🌸 {occ}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Structured Floral Tabs / Guide Section */}
      <section className="mt-16 pt-10 border-t border-[#e8dfcf] grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About this Flower */}
        <div className="bg-[#fdfcf9] rounded-2xl p-6 sm:p-8 border border-[#e8dfcf]">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            About this Flower
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
            {product.description}
          </p>
          {product.fragrance && (
            <p className="text-xs text-gray-600 flex items-center gap-2 font-medium">
              <span className="text-rose-500">✨ Fragrance Profile:</span>
              <span className="text-emerald-950 font-bold">{product.fragrance}</span>
            </p>
          )}
        </div>

        {/* Floral Care Guide */}
        <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-900">
          <h2 className="font-serif text-xl sm:text-2xl font-bold mb-3 text-white">
            Florist Care Guide
          </h2>
          {product.careGuide ? (
            <div className="space-y-3 text-xs text-emerald-100">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">💧 Water:</span>
                <span>{product.careGuide.water}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">☀️ Light:</span>
                <span>{product.careGuide.sunlight}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✂️ Stem Prep:</span>
                <span>{product.careGuide.trim}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">⏳ Expected Vase Life:</span>
                <span className="font-bold text-yellow-200">{product.careGuide.vaseLife}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-emerald-100">
              Keep stems hydrated in clean chilled water and away from direct drafts.
            </p>
          )}
        </div>
      </section>

      {/* Related Flowers Section */}
      <ScrollReveal animation="fade-up" className="mt-16 pt-10 border-t border-[#e8dfcf]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
              Floral Pairings
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-0.5">
              Related Flowers
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-emerald-950 hover:underline uppercase tracking-wider"
          >
            Explore All Flowers →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedFlowers.map((relFlower) => (
            <ProductCard key={relFlower.id} product={relFlower} />
          ))}
        </div>
      </ScrollReveal>
    </main>
  );
}