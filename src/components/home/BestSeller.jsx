import React from 'react';
import { Link } from 'react-router-dom';
import { bestSellers } from '../../data/bestSellers';
import ProductCard from '../common/ProductCard';

export default function BestSeller() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-center sm:text-left">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
            Customer Favorites
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-1 tracking-tight">
            Beloved Blooms
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Flowers our customers can't get enough of — fresh, enduring, and divinely fragrant.
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-semibold text-emerald-900 hover:underline flex items-center justify-center sm:justify-start gap-1"
        >
          <span>Browse All Blooms</span>
          <span>→</span>
        </Link>
      </div>

      {/* Grid of 4 Best Sellers */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}