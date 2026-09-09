import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import headerImg from '../../assets/images/header-image.jpg';
import FloatingPetals from '../common/FloatingPetals';

export default function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isInteractiveParallax, setIsInteractiveParallax] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isTouch && !prefersReducedMotion) {
      setIsInteractiveParallax(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!isInteractiveParallax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-b from-[#f5f1e8] via-[#faf7f2] to-[#faf8f5] pt-12 pb-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#eee8dc]"
    >
      {/* Floating Petals Micro-Animation */}
      <FloatingPetals count={8} />

      {/* Parallax Layer 1: Background Botanical Leaf Silhouettes */}
      <div
        className="absolute top-6 left-4 pointer-events-none opacity-25 text-emerald-800 hidden lg:block select-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -16}px, ${mouseOffset.y * -16}px, 0)`,
        }}
        aria-hidden="true"
      >
        <svg width="140" height="140" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C60 30, 90 40, 100 50 C70 60, 60 90, 50 100 C40 70, 10 60, 0 50 C30 40, 40 10, 50 0 Z" opacity="0.3" />
        </svg>
      </div>
      <div
        className="absolute bottom-6 right-8 pointer-events-none opacity-20 text-rose-800 hidden lg:block select-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -12}px, 0)`,
        }}
        aria-hidden="true"
      >
        <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" opacity="0.15" />
          <path d="M50 10 C65 35, 85 50, 90 50 C85 50, 65 65, 50 90 C35 65, 15 50, 10 50 C15 50, 35 35, 50 10 Z" opacity="0.25" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Column: Editorial Headline & CTAs */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/75 border border-emerald-200/70 text-emerald-950 text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-2xs animate-fade-up"
            style={{ animationDelay: '0.05s' }}
          >
            <span className="text-rose-500">🌸</span>
            <span>Fresh Blooms • Brighter Days</span>
          </div>

          {/* Luxury Editorial Heading */}
          <h1
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Beautiful Flowers <br />
            for <span className="italic font-normal text-emerald-900 font-serif">Every Moment</span>
          </h1>

          {/* Supporting Description */}
          <p
            className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up font-sans"
            style={{ animationDelay: '0.2s' }}
          >
            Discover fresh boutique flowers carefully selected to brighten your home, celebrate love, and bring nature's sweetest fragrance to life.
          </p>

          {/* Staggered CTAs */}
          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link
              to="/products"
              className="relative overflow-hidden bg-emerald-950 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-emerald-900 transition-all duration-300 shadow-md hover:shadow-xl active:scale-97 flex items-center gap-2 group cursor-pointer"
            >
              {/* Subtle hover shine animation */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none" />
              <span>Shop Fresh Flowers</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <a
              href="#categories"
              className="border border-emerald-900/30 text-emerald-950 bg-white/80 hover:bg-emerald-950 hover:text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-2xs active:scale-97"
            >
              Explore Collections
            </a>
          </div>

          {/* Boutique Quality Badges */}
          <div
            className="mt-10 pt-6 border-t border-[#e8e2d8] flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs font-semibold text-gray-600 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-emerald-700 text-sm">✓</span>
              <span>100% Farm-Fresh Blooms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-700 text-sm">🚚</span>
              <span>Same-Day Artisan Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-700 text-sm">🌿</span>
              <span>7-Day Vase Life Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floral Image Composition with Parallax Layers */}
        <div
          className="flex-1 flex justify-center lg:justify-end animate-bloom"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="relative group max-w-lg w-full">
            {/* Parallax Layer 2: Soft Organic Ambient Halo */}
            <div
              className="absolute -inset-5 bg-gradient-to-tr from-emerald-300/30 via-rose-200/30 to-amber-200/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-95 transition-all duration-700"
              style={{
                transform: `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px, 0)`,
              }}
            />

            {/* Parallax Layer 3: Floral Hero Image Container */}
            <div
              className="relative rounded-3xl overflow-hidden bg-white/70 p-3 sm:p-4 border border-[#e8e2d8] shadow-2xl transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 10}px, 0)`,
              }}
            >
              <img
                src={headerImg}
                alt="Artisanal bouquet of fresh garden roses, lilies, and botanical stems"
                loading="eager"
                fetchpriority="high"
                className="rounded-2xl w-full object-cover max-h-[490px] shadow-sm transform group-hover:scale-103 transition-transform duration-700 ease-out"
              />

              {/* Parallax Layer 4: Foreground Floating Stems Badge */}
              <div
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-[#e8e2d8] rounded-2xl p-3.5 shadow-xl flex items-center gap-3 transition-transform duration-200 ease-out"
                style={{
                  transform: `translate3d(${mouseOffset.x * 20}px, ${mouseOffset.y * 16}px, 0)`,
                }}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-900 font-bold text-lg shadow-inner">
                  🌸
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 font-serif">Hand-Tied Stems</p>
                  <p className="text-[10px] text-gray-500 font-sans">Artisan Florist Series</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}