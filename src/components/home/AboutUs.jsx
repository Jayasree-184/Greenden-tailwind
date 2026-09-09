import React from 'react';
import { features } from '../../data/features';

function renderFloralIcon(iconType) {
  switch (iconType) {
    case 'document':
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl shadow-xs">
          🌸
        </div>
      );
    case 'shipping':
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl shadow-xs">
          🚚
        </div>
      );
    case 'support':
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl shadow-xs">
          🌿
        </div>
      );
    default:
      return null;
  }
}

export default function AboutUs() {
  return (
    <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
          The Greenden Promise
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-1 tracking-tight">
          Why Choose Greenden Boutique
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
          From farm harvest to your tabletop, we believe in delivering botanical beauty with uncompromising quality and love.
        </p>
      </header>

      {/* 3 Editorial Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <article
            key={feature.id}
            className="border border-[#e8dfcf] rounded-2xl p-6 sm:p-8 bg-[#fdfcf9] shadow-2xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {renderFloralIcon(feature.icon)}
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}