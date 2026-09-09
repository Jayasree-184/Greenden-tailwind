import React, { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Contact() {
  useDocumentTitle('Contact Us');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipcode: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Address / Street is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country / Region is required';
    if (!formData.state.trim()) newErrors.state = 'State / Province is required';
    if (!formData.zipcode.trim()) newErrors.zipcode = 'Zipcode is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSuccessMessage(
      'Thank you! Your floral inquiry has been received. Our Greenden master florist will be in touch within 24 hours.'
    );
    setFormData({
      fullName: '',
      email: '',
      address: '',
      city: '',
      country: '',
      state: '',
      zipcode: '',
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-[75vh] flex flex-col justify-center">
      <section className="bg-[#132A1C] text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#2D4F37] relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <header className="mb-8 relative z-10">
          <span className="text-xs font-semibold tracking-widest text-emerald-300 uppercase">
            Floral Concierge • Inquiries & Bespoke Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white mt-1">
            Floral Concierge & Inquiries
          </h1>
          <p className="mt-2 text-sm text-emerald-100/80 leading-relaxed max-w-2xl font-sans">
            Planning a bespoke wedding, corporate floral installation, luxury arrangement, or have questions about bouquet care? Our master florists are at your service.
          </p>
        </header>

        {successMessage && (
          <div
            role="status"
            className="bg-emerald-900/90 border border-emerald-500/50 text-white p-4 sm:p-5 rounded-2xl mb-6 text-sm flex items-center gap-3 animate-fade-in shadow-lg relative z-10"
          >
            <span className="text-2xl">🌸</span>
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-emerald-100 mb-1.5">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Eleanor Vance"
                className="w-full bg-[#FAF7F2] text-gray-900 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all shadow-inner"
                aria-required="true"
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <p className="text-rose-300 text-xs mt-1.5 font-medium">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-emerald-100 mb-1.5">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="eleanor@botanical.com"
                className="w-full bg-[#FAF7F2] text-gray-900 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all shadow-inner"
                aria-required="true"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-rose-300 text-xs mt-1.5 font-medium">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-xs font-semibold text-emerald-100 mb-1.5">
              Street Address / Delivery Location *
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="124 Rose Garden Boulevard"
              className="w-full bg-[#FAF7F2] text-gray-900 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all shadow-inner"
              aria-required="true"
              aria-invalid={!!errors.address}
            />
            {errors.address && (
              <p className="text-rose-300 text-xs mt-1.5 font-medium">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-xs font-semibold text-emerald-100 mb-1.5">
                City *
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="San Francisco"
                className="w-full bg-[#FAF7F2] text-gray-900 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all shadow-inner"
                aria-required="true"
                aria-invalid={!!errors.city}
              />
              {errors.city && (
                <p className="text-rose-300 text-xs mt-1.5 font-medium">{errors.city}</p>
              )}
            </div>

            {/* Country / Region */}
            <div>
              <label htmlFor="country" className="block text-xs font-semibold text-emerald-100 mb-1.5">
                Country / Region *
              </label>
              <input
                id="country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
                className="w-full bg-[#FAF7F2] text-gray-900 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all shadow-inner"
                aria-required="true"
                aria-invalid={!!errors.country}
              />
              {errors.country && (
                <p className="text-rose-300 text-xs mt-1.5 font-medium">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* State / Province */}
            <div>
              <label htmlFor="state" className="block text-xs font-semibold text-emerald-100 mb-1.5">
                State / Province *
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="California"
                className="w-full bg-[#FAF7F2] text-gray-900 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all shadow-inner"
                aria-required="true"
                aria-invalid={!!errors.state}
              />
              {errors.state && (
                <p className="text-rose-300 text-xs mt-1.5 font-medium">{errors.state}</p>
              )}
            </div>

            {/* Zipcode */}
            <div>
              <label htmlFor="zipcode" className="block text-xs font-semibold text-emerald-100 mb-1.5">
                Zipcode *
              </label>
              <input
                id="zipcode"
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                placeholder="94102"
                className="w-full bg-[#FAF7F2] text-gray-900 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all shadow-inner"
                aria-required="true"
                aria-invalid={!!errors.zipcode}
              />
              {errors.zipcode && (
                <p className="text-rose-300 text-xs mt-1.5 font-medium">{errors.zipcode}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-amber-400 text-emerald-950 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-amber-300 transition-all shadow-md cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-amber-300 flex items-center justify-center gap-2"
            >
              <span>Send Floral Inquiry</span>
              <span>→</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}