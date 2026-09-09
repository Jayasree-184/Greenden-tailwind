import React from 'react';
import { useNavigate } from 'react-router-dom';
import { flowerCategoryList } from '../../data/products';

export default function FlowerCategories() {
  const navigate = useNavigate();

  const handleSelectCategory = (slug) => {
    navigate(`/products?category=${encodeURIComponent(slug)}`);
  };

  return (
    <section id="categories" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
          Curated Blooms
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-1 tracking-tight">
          Explore by Flower Variety
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          From fragrant garden roses to exotic phalaenopsis orchids, find your favorite floral expression.
        </p>
      </div>

      {/* Categories Horizontal Grid / Scroll on Mobile */}
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 text-center">
        {flowerCategoryList.map((cat, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectCategory(cat.slug)}
            className="group relative flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 rounded-2xl p-2 transition-all duration-300 hover:-translate-y-2"
          >
            {/* Subtle radial glow behind flower on hover */}
            <div className="absolute top-2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-emerald-400/0 group-hover:bg-emerald-400/25 blur-lg transition-all duration-500 pointer-events-none" />

            {/* Circular Flower Image Frame */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full p-1 bg-white border-2 border-[#e8e2d8] group-hover:border-emerald-700 group-hover:ring-4 group-hover:ring-emerald-100 group-hover:shadow-xl transition-all duration-400 overflow-hidden flex items-center justify-center">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-full transform group-hover:scale-112 group-hover:rotate-1 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 rounded-full bg-emerald-950/0 group-hover:bg-emerald-950/10 transition-colors duration-300" />
            </div>

            {/* Category Name */}
            <span className="mt-3 text-xs sm:text-sm font-serif font-bold text-gray-900 group-hover:text-emerald-900 transition-colors tracking-tight">
              {cat.name}
            </span>
            <span className="text-[10px] text-gray-400 group-hover:text-emerald-700 font-sans hidden sm:inline-block transition-colors">
              {cat.description}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}