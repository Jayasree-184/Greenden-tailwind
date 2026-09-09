import React from 'react';
import Hero from '../components/home/Hero';
import FlowerCategories from '../components/home/FlowerCategories';
import FeaturedFlowers from '../components/home/FeaturedFlowers';
import FlowerFeelings from '../components/home/FlowerFeelings';
import AboutUs from '../components/home/AboutUs';
import BestSeller from '../components/home/BestSeller';
import FloralBanner from '../components/home/FloralBanner';
import CustomerReviews from '../components/home/CustomerReviews';
import Newsletter from '../components/home/Newsletter';
import ScrollReveal from '../components/common/ScrollReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Luxury Flower Boutique & Fresh Blooms');

  return (
    <main className="min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* 1. Cinematic Flower Hero Section with Parallax */}
      <Hero />

      {/* 2. Flower Category Circular Selector */}
      <ScrollReveal animation="fade-up" delay={50}>
        <FlowerCategories />
      </ScrollReveal>

      {/* Organic Botanical Separator Accent */}
      <div className="flex items-center justify-center my-4 opacity-30 select-none pointer-events-none" aria-hidden="true">
        <span className="h-[1px] w-24 bg-emerald-900/40" />
        <span className="mx-3 text-emerald-800 text-sm">🌸</span>
        <span className="h-[1px] w-24 bg-emerald-900/40" />
      </div>

      {/* 3. Featured Flowers Editorial Presentation */}
      <ScrollReveal animation="bloom" delay={100}>
        <FeaturedFlowers />
      </ScrollReveal>

      {/* 4. Flowers for Every Feeling (Editorial Story) */}
      <FlowerFeelings />

      {/* 5. Why Choose Greenden (Botanical Promises) */}
      <ScrollReveal animation="fade-up" delay={50}>
        <AboutUs />
      </ScrollReveal>

      {/* 6. Beloved Blooms (Best Sellers Grid) */}
      <ScrollReveal animation="fade-up" delay={50}>
        <BestSeller />
      </ScrollReveal>

      {/* 7. Promotional Floral Banner with Floating Petals */}
      <FloralBanner />

      {/* 8. Customer Reviews & Testimonials */}
      <ScrollReveal animation="fade-up" delay={50}>
        <CustomerReviews />
      </ScrollReveal>

      {/* 9. Newsletter Signup */}
      <ScrollReveal animation="bloom" delay={50}>
        <Newsletter />
      </ScrollReveal>
    </main>
  );
}