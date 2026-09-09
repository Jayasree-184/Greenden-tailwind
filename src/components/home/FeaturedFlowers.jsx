import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../common/ProductCard';

export default function FeaturedFlowers() {
  const featuredLarge = products[0]; // Red Velvet Garden Roses
  const featuredSmall1 = products[2]; // Casablanca White Lily
  const featuredSmall2 = products[4]; // Vibrant Dutch Tulips

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
            Artisanal Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-1 tracking-tight">
            Flowers That Make Moments Special
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Handcrafted arrangements, artisanal stems, and romantic bouquets designed to captivate.
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-semibold text-emerald-900 hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View Full Collection</span>
          <span>→</span>
        </Link>
      </div>

      {/* Editorial Presentation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Large Featured Card (5 cols) */}
        <div className="lg:col-span-5 h-full">
          {featuredLarge && (
            <div className="h-full bg-gradient-to-b from-[#faf5ee] to-[#f4eee2] rounded-3xl p-6 sm:p-8 border border-[#e8dfcf] flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <span className="absolute top-6 left-6 z-10 text-[10px] font-extrabold uppercase tracking-widest bg-emerald-950 text-white px-3 py-1 rounded-full shadow-xs">
                Flower of the Month
              </span>

              <Link
                to={`/products/${featuredLarge.id}`}
                className="block mt-8 mb-4 overflow-hidden rounded-2xl flex items-center justify-center p-4 bg-white/50 backdrop-blur-xs aspect-square"
              >
                <img
                  src={featuredLarge.image}
                  alt={featuredLarge.name}
                  loading="lazy"
                  className="object-contain max-h-72 w-auto transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </Link>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow-500 text-sm">★★★★★</span>
                  <span className="text-xs font-semibold text-gray-600">4.9 / 5.0 rating</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                  {featuredLarge.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {featuredLarge.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#e2d8c7]">
                  <span className="font-serif text-2xl font-black text-emerald-950">
                    ${featuredLarge.price}
                  </span>
                  <Link
                    to={`/products/${featuredLarge.id}`}
                    className="bg-emerald-950 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
                  >
                    View Floral Details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2 Smaller Cards + 1 Promotional Card (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredSmall1 && <ProductCard product={featuredSmall1} />}
          {featuredSmall2 && <ProductCard product={featuredSmall2} />}

          {/* Editorial Promotional Gift Card */}
          <div className="sm:col-span-2 bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-emerald-900 relative overflow-hidden">
            <div className="relative z-10 max-w-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                The Greenden Standard
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-white">
                Fresh Floral Concierge
              </h3>
              <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
                Need a bespoke bridal bouquet, event floral installation, or recurring weekly fresh stems? Our master florists are at your service.
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <Link
                to="/contact"
                className="inline-block bg-white text-emerald-950 px-6 py-3 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors shadow-sm"
              >
                Inquire With Florist
              </Link>
            </div>
            {/* Background botanical ornament */}
            <div className="absolute right-0 bottom-0 pointer-events-none opacity-10 text-white select-none">
              <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="45" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}