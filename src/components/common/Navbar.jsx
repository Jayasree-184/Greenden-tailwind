import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/Greenden-icon.png';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, openCartDrawer, cartBadgePulse } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium hover underline animation growing from left to right
  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium tracking-wide transition-colors duration-300 text-emerald-950 hover:text-emerald-800 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-emerald-800 after:transition-transform after:duration-300 after:origin-left ${
      isActive ? 'font-bold after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf8f5]/96 backdrop-blur-md border-b border-[#ede7dc] shadow-sm py-0.5'
          : 'bg-[#faf8f5]/85 backdrop-blur-xs border-b border-[#ede7dc]/60 py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-15' : 'h-18'}`}>
          {/* Greenden Logo Lockup */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 rounded-lg p-1"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Greenden Flower Boutique Home"
          >
            <div className="p-1.5 rounded-full bg-emerald-100/60 border border-emerald-200/50 group-hover:scale-105 transition-transform duration-300">
              <img src={logoImg} alt="Greenden Flower Boutique" className="h-8 w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black tracking-wider text-emerald-950 group-hover:text-emerald-800 transition-colors">
                GREENDEN
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-emerald-700/80 -mt-1">
                Flower Boutique
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Florist Navigation">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Flowers
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Shop
            </NavLink>
            <a
              href="#about"
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  navigate('/#about');
                }
              }}
              className="relative py-1 text-sm font-medium tracking-wide transition-colors duration-300 text-emerald-950 hover:text-emerald-800 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-emerald-800 after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-100"
            >
              About
            </a>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Desktop Right Action Icons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Icon */}
            <Link
              to="/products"
              className="p-2 text-emerald-950 hover:text-emerald-700 hover:bg-emerald-100/50 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
              title="Search Flowers"
              aria-label="Search Flowers"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-emerald-950 hover:text-rose-600 hover:bg-rose-50/60 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
              title="View Favorite Flowers"
              aria-label={`Wishlist (${wishlistCount})`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[10px] font-extrabold rounded-full h-4 min-w-[1rem] px-1 flex items-center justify-center shadow-xs animate-heart-bounce">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative p-2 text-emerald-950 hover:text-emerald-700 hover:bg-emerald-100/50 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
              title="Open Floral Cart"
              aria-label={`Cart with ${totalItems} items`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {totalItems > 0 && (
                <span
                  className={`absolute -top-0.5 -right-0.5 bg-emerald-900 text-white text-[10px] font-extrabold rounded-full h-4 min-w-[1rem] px-1 flex items-center justify-center shadow-xs transition-transform duration-300 ${
                    cartBadgePulse ? 'animate-badge-pulse ring-2 ring-emerald-400/80 bg-emerald-700' : ''
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center gap-1.5 md:hidden">
            <Link
              to="/wishlist"
              className="relative p-2 text-emerald-950"
              aria-label={`Wishlist (${wishlistCount})`}
              onClick={() => setIsMobileOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-600 text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCartDrawer}
              className="relative p-2 text-emerald-950 cursor-pointer"
              aria-label={`Cart (${totalItems})`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {totalItems > 0 && (
                <span
                  className={`absolute top-1 right-1 bg-emerald-900 text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center transition-transform duration-300 ${
                    cartBadgePulse ? 'animate-badge-pulse ring-2 ring-emerald-400/80 bg-emerald-700' : ''
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="p-2 rounded-lg text-emerald-950 hover:bg-emerald-100/60 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
            >
              {isMobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-[#ede7dc] bg-[#faf8f5]/98 backdrop-blur-lg px-5 pt-3 pb-5 space-y-2 animate-fade-in">
          <NavLink
            to="/"
            onClick={() => setIsMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-950 hover:bg-emerald-100/50"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setIsMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-950 hover:bg-emerald-100/50"
          >
            Flowers
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setIsMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-950 hover:bg-emerald-100/50"
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-950 hover:bg-emerald-100/50"
          >
            Contact
          </NavLink>
          <div className="pt-3 border-t border-[#ede7dc] mt-2 flex justify-between gap-3 text-xs font-semibold">
            <Link
              to="/wishlist"
              onClick={() => setIsMobileOpen(false)}
              className="flex-1 py-2 px-3 rounded-lg bg-white border border-[#ede7dc] flex items-center justify-center gap-1.5 text-emerald-950"
            >
              <span>Wishlist</span>
              <span className="bg-rose-600 text-white rounded-full px-1.5 py-0.2 text-[10px]">
                {wishlistCount}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                openCartDrawer();
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-emerald-950 text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Cart</span>
              <span className="bg-emerald-800 text-white rounded-full px-1.5 py-0.2 text-[10px]">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}