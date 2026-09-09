import React from 'react';
import { useNavigate } from 'react-router-dom';
import roseImg from '../../assets/images/products-rose.jpg';
import sunflowerImg from '../../assets/images/products-sunflower.jpg';
import lilyImg from '../../assets/images/products-lily.jpg';
import tulipImg from '../../assets/images/products-tulip.jpg';
import ScrollReveal from '../common/ScrollReveal';

export default function FlowerFeelings() {
  const navigate = useNavigate();

  const feelings = [
    {
      feeling: 'Love & Passion',
      flower: 'Garden Roses',
      category: 'Roses',
      image: roseImg,
      tagline: 'Deep velvet petals expressing enduring devotion and romance.',
      accent: 'from-rose-900/80 to-stone-900/90',
    },
    {
      feeling: 'Joy & Warmth',
      flower: 'Sunflowers',
      category: 'Sunflowers',
      image: sunflowerImg,
      tagline: 'Golden sunburst heads that radiate uplifting optimism and happiness.',
      accent: 'from-amber-900/80 to-stone-900/90',
    },
    {
      feeling: 'Grace & Serenity',
      flower: 'White Lilies',
      category: 'Lilies',
      image: lilyImg,
      tagline: 'Architectural blossoms symbolizing pure elegance, peace, and rebirth.',
      accent: 'from-emerald-950/80 to-stone-900/90',
    },
    {
      feeling: 'Celebration & Hope',
      flower: 'French Tulips',
      category: 'Tulips',
      image: tulipImg,
      tagline: 'Vibrant cups blooming with fresh beginnings and seasonal splendor.',
      accent: 'from-purple-950/80 to-stone-900/90',
    },
  ];

  const handleNavigate = (cat) => {
    navigate(`/products?category=${encodeURIComponent(cat)}`);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <ScrollReveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
          Emotional Floristry
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-1.5 tracking-tight">
          Flowers for Every Feeling
        </h2>
        <p className="text-sm text-gray-600 mt-2.5 leading-relaxed font-sans">
          Every bloom speaks a silent language. Choose the sentiment that resonates with your heart.
        </p>
      </ScrollReveal>

      {/* 4-Card Editorial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feelings.map((item, idx) => (
          <ScrollReveal
            key={idx}
            animation="bloom"
            delay={idx * 120}
            className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-[#E8E0D2] bg-white flex flex-col justify-end"
            onClick={() => handleNavigate(item.category)}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${item.flower} for ${item.feeling}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigate(item.category);
              }
            }}
          >
            {/* Background Flower Imagery */}
            <div className="absolute inset-0 bg-[#FAF7F2] overflow-hidden">
              <img
                src={item.image}
                alt={item.flower}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-0.5 transition-transform duration-700 ease-out"
              />
              {/* Subtle Initial Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
              {/* Vibrant Hover Accent Tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${item.accent} opacity-0 group-hover:opacity-85 transition-opacity duration-500`}
              />
            </div>

            {/* Content Overlay that Slides Up on Hover */}
            <div className="relative z-10 p-6 transform transition-transform duration-400 ease-out group-hover:-translate-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300 group-hover:text-amber-300 transition-colors">
                {item.feeling}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1 leading-tight drop-shadow-sm">
                {item.flower}
              </h3>

              <p className="text-xs text-gray-200 mt-2 line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                {item.tagline}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-amber-200 transition-colors">
                <span>Shop {item.category}</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}