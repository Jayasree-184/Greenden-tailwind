import { useState, useMemo } from 'react';

export function useProductFilter(products) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
  };
}
