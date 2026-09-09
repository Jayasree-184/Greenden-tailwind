import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/common/ProductCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Products() {
  useDocumentTitle('Fresh Flowers Collection');

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Flowers';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(50);
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category state with search query param
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const { minAvailablePrice, maxAvailablePrice } = useMemo(() => {
    const prices = products.map((p) => p.price);
    return {
      minAvailablePrice: Math.min(...prices),
      maxAvailablePrice: Math.max(...prices),
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // 1. Search filter: matches name, category, subtitle, or perfectFor tags
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.subtitle && product.subtitle.toLowerCase().includes(query)) ||
        (product.flowerType && product.flowerType.toLowerCase().includes(query)) ||
        (product.perfectFor && product.perfectFor.some((tag) => tag.toLowerCase().includes(query)));

      // 2. Category filter
      const matchesCategory =
        selectedCategory === 'All Flowers' ||
        product.category === selectedCategory ||
        product.flowerType === selectedCategory ||
        product.name.toLowerCase().includes(selectedCategory.toLowerCase());

      // 3. Price filter
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // 4. Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All Flowers') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Flowers');
    setMaxPrice(maxAvailablePrice);
    setSortBy('default');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All Flowers' ||
    maxPrice < maxAvailablePrice ||
    sortBy !== 'default';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Header with Botanical Ornament */}
      <section className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 mb-2 text-rose-500">
          <span className="text-xs">🌸</span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-900 font-sans">
            Fresh & Handpicked
          </span>
          <span className="text-xs">🌸</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Fresh Flowers Collection
        </h1>

        <p className="text-xs sm:text-sm text-gray-600 mt-2 font-serif italic max-w-lg mx-auto">
          "Handpicked blooms for every occasion — freshly cut, delicately arranged, and delivered with love."
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-xl mx-auto relative">
          <label htmlFor="flowerSearch" className="sr-only">
            Search flowers
          </label>
          <div className="relative">
            <input
              id="flowerSearch"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flowers by name, fragrance, or occasion..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-[#e8dfcf] bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 outline-none transition-all shadow-2xs"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-emerald-800/60 absolute left-4 top-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-black text-sm p-0.5"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter Toolbar for Desktop */}
      <section
        aria-label="Flower filters and sorting"
        className="bg-[#fdfcf9] border border-[#e8dfcf] rounded-2xl p-4 sm:p-5 shadow-2xs mb-8"
      >
        {/* Flower Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2 hidden sm:inline">
            Flower:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 ${
                selectedCategory === cat
                  ? 'bg-emerald-950 text-white shadow-xs font-bold'
                  : 'bg-emerald-100/60 text-emerald-950 hover:bg-emerald-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Slider, Sorting, Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3.5 border-t border-[#f0ece1] text-xs">
          {/* Price Range Slider */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <label htmlFor="flowerPriceSlider" className="font-semibold text-gray-700 whitespace-nowrap">
              Max Price: <span className="font-extrabold text-emerald-950">${maxPrice}</span>
            </label>
            <input
              id="flowerPriceSlider"
              type="range"
              min={minAvailablePrice}
              max={maxAvailablePrice}
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-emerald-900 w-32 sm:w-44 cursor-pointer"
            />
          </div>

          {/* Sort Dropdown & Reset */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5">
              <label htmlFor="flowerSort" className="font-semibold text-gray-700 whitespace-nowrap">
                Sort:
              </label>
              <select
                id="flowerSort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-[#e8dfcf] rounded-lg px-2.5 py-1.5 bg-white text-xs text-gray-800 outline-none focus:border-emerald-800 cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer ml-2"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1 mb-4">
        <span>Displaying {filteredProducts.length} floral arrangements</span>
        {isFiltered && (
          <span className="text-emerald-900 font-semibold">Filtered view</span>
        )}
      </div>

      {/* Flower Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-[#fdfcf9] rounded-3xl border border-dashed border-[#e8dfcf] p-8">
            <div className="w-14 h-14 bg-rose-100/70 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              🌸
            </div>
            <h2 className="font-serif text-xl font-bold text-gray-900">
              No floral blooms match your criteria
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
              We couldn't find any flowers under these filters. Try expanding your price limit, searching another keyword, or resetting all filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 bg-emerald-950 text-white px-6 py-2.5 text-xs font-semibold rounded-xl hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
            >
              Reset Flower Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}