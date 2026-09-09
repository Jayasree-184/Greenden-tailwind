import React from 'react';
import { Link } from 'react-router-dom';
import FloatingPetals from '../common/FloatingPetals';
import ScrollReveal from '../common/ScrollReveal';
import headerImg from '../../assets/images/header-image.jpg';

export default function FloralBanner() {
  return (
    <ScrollReveal
      animation="bloom"
      className="relative my-14 sm:my-20 mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto rounded-3xl overflow-hidden bg-emerald-950 text-white shadow-2xl border border-emerald-900/60"
    >
      {/* Background Floral Imagery with subtle scale */}
      <div className="absolute inset-0 opacity-30 mix-blend-luminosity overflow-hidden">
        <img
          src={headerImg}
          alt="Boutique flower backdrop"
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-900/80" />
      </div>

      {/* Floating Petals Effect */}
      <FloatingPetals count={6} />

      {/* Decorative botanical halo */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 p-8 sm:p-16 lg:p-20 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300 bg-emerald-900/70 px-4 py-1 rounded-full mb-5 border border-emerald-700/50 shadow-xs">
          <span>🌸</span>
          <span>Spoken in Petals</span>
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight text-white">
          Let Flowers Say It For You
        </h2>

        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-8 max-w-lg mx-auto font-sans">
          Fresh artisanal blooms for birthdays, anniversaries, heartfelt celebrations, love, and every precious moment in between.
        </p>

        <Link
          to="/products"
          className="relative overflow-hidden inline-flex items-center gap-2 bg-white text-emerald-950 px-8 py-4 rounded-full text-xs sm:text-sm font-bold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-97 group cursor-pointer"
        >
          {/* Subtle button sheen */}
          <span className="absolute inset-0 w-1/2 h-full bg-emerald-900/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
          <span>Explore Flowers</span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>
    </ScrollReveal>
  );
}