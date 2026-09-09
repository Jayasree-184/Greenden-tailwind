import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('404 Flower Path Not Found');

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-inner">
        <span className="text-3xl">🌸</span>
      </div>
      <span className="text-xs font-semibold tracking-widest text-emerald-800 uppercase mb-1">Garden Pathway</span>
      <span className="text-6xl sm:text-7xl font-serif font-extrabold text-emerald-950 mb-2">404</span>
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">Oops! This Flower Path Doesn't Exist</h1>
      <p className="text-xs sm:text-sm text-gray-600 max-w-md mb-8 leading-relaxed font-sans">
        It seems this petal has drifted away or the garden path has moved. Let us guide you back to our fresh blooms.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/products"
          className="bg-emerald-950 text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-emerald-900 transition-all shadow-md active:scale-95"
        >
          Back to Flowers →
        </Link>
        <Link
          to="/"
          className="border border-[#D4C8B8] text-gray-800 px-7 py-3 rounded-full text-xs font-semibold hover:bg-[#FAF7F2] transition-colors active:scale-95"
        >
          Return to Boutique
        </Link>
      </div>
    </main>
  );
}