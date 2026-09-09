import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/Toast';
import CartDrawer from './components/common/CartDrawer';
import CustomCursor from './components/common/CustomCursor';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col justify-between bg-[#faf8f5] text-gray-900 selection:bg-emerald-200 selection:text-emerald-950 font-sans relative">
            <CustomCursor />
            <Navbar />
            <ScrollToTop />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <ToastContainer />
            <CartDrawer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}