import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/Greenden-icon.png';

export default function Footer() {
  return (
    <footer className="bg-[#f5f1e8] border-t border-[#e8dfcf] pt-14 pb-8 px-4 sm:px-6 lg:px-8 mt-16 relative overflow-hidden">
      {/* Corner Botanical Silhouettes */}
      <div className="absolute -bottom-6 -left-6 pointer-events-none opacity-15 text-emerald-950 text-8xl select-none" aria-hidden="true">
        🌿
      </div>
      <div className="absolute -top-6 -right-6 pointer-events-none opacity-15 text-rose-400 text-8xl select-none" aria-hidden="true">
        🌸
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#e2d8c7] relative z-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-emerald-100 border border-emerald-200">
              <img src={logoImg} alt="Greenden" className="h-7 w-auto" />
            </div>
            <span className="font-serif text-xl font-bold tracking-wider text-emerald-950">
              GREENDEN
            </span>
          </div>
          <p className="font-serif italic text-sm text-emerald-900 font-medium">
            "Bringing the beauty of fresh flowers closer to you."
          </p>
          <p className="text-xs text-gray-600 max-w-sm leading-relaxed">
            Handcrafted with love since 2015. We partner directly with sustainable floral nurseries to bring you farm-fresh, premium cut stems for life's unforgettable moments.
          </p>
          <div className="flex items-center gap-3 text-xs text-emerald-900 font-semibold pt-1">
            <span>🌸 Daily Farm Harvest</span>
            <span>•</span>
            <span>🚚 Express Delivery</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-emerald-950">
            Shop Flowers
          </h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li>
              <Link to="/products?category=Roses" className="hover:text-emerald-950 hover:underline">
                Garden Roses
              </Link>
            </li>
            <li>
              <Link to="/products?category=Lilies" className="hover:text-emerald-950 hover:underline">
                Casablanca Lilies
              </Link>
            </li>
            <li>
              <Link to="/products?category=Tulips" className="hover:text-emerald-950 hover:underline">
                Dutch Tulips
              </Link>
            </li>
            <li>
              <Link to="/products?category=Orchids" className="hover:text-emerald-950 hover:underline">
                Phalaenopsis Orchids
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore Links */}
        <div className="space-y-2">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-emerald-950">
            Boutique & Care
          </h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li>
              <Link to="/" className="hover:text-emerald-950 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-emerald-950 hover:underline">
                All Flowers Collection
              </Link>
            </li>
            <li>
              <a href="#about" className="hover:text-emerald-950 hover:underline">
                Why Choose Greenden
              </a>
            </li>
            <li>
              <Link to="/contact" className="hover:text-emerald-950 hover:underline">
                Floral Concierge
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-2">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-emerald-950">
            Customer Care
          </h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li>
              <Link to="/cart" className="hover:text-emerald-950 hover:underline">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-emerald-950 hover:underline">
                Saved Wishlist
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-emerald-950 hover:underline">
                Care Inquiries
              </Link>
            </li>
            <li>
              <span className="text-gray-500 text-[11px] block mt-2">
                Concierge: Mon - Sun (24/7)
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 relative z-10">
        <p>&copy; {new Date().getFullYear()} Greenden Flower Boutique. All rights reserved.</p>
        <p className="text-[11px] text-gray-400 font-serif italic">
          Artisanal floral beauty, crafted for every moment.
        </p>
      </div>
    </footer>
  );
}