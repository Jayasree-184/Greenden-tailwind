import React from 'react';
import { reviews } from '../../data/reviews';

export default function CustomerReviews() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
          Loved by Flower Lovers
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-1 tracking-tight">
          Customer Stories & Reviews
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600">
          Real words from customers who celebrated life’s brightest moments with Greenden blooms.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((item) => (
          <article
            key={item.id}
            className="bg-[#fdfcf9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xl border border-[#e8dfcf] hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1 relative group"
          >
            {/* Elegant Quotation Mark */}
            <div>
              <div className="font-serif text-4xl leading-none text-emerald-800/40 select-none mb-1">
                “
              </div>
              <div className="text-amber-500 text-xs tracking-wider mb-3">★★★★★</div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                {item.review}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0ece1] flex items-center justify-between">
              <div>
                <span className="font-serif font-bold text-sm text-gray-900 block">
                  {item.name}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <span>🌸</span>
                  <span>Verified Flower Lover</span>
                </span>
              </div>
              <span className="text-xs text-gray-400">5.0 ★</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}