import roseImg from '../assets/images/bestseller-rose.jpg';
import lilyImg from '../assets/images/bestseller-lily.jpg';
import tulipImg from '../assets/images/bestseller-tulip.jpg';
import snakeplantImg from '../assets/images/bestseller-snakeplant.jpg';

export const bestSellers = [
  {
    id: 'bs-1',
    name: 'Heritage Crimson Garden Rose',
    price: 20,
    category: 'Roses',
    image: roseImg,
    subtitle: 'Fragrant Velvet Rose Blooms',
    description:
      'Our most requested floral variety. Lush garden roses with deep crimson velvety petals and a lingering sweet perfume.',
    rating: 4.9,
    reviewsCount: 84,
    inStock: 18,
    freshness: 'Hand-Cut Daily • 7+ Days Fresh',
    perfectFor: ['Anniversaries', 'Romantic Evenings', 'Luxury Gifts'],
  },
  {
    id: 'bs-2',
    name: 'Majestic White Casablanca Lily',
    price: 30,
    category: 'Lilies',
    image: lilyImg,
    subtitle: 'Pure Sculptural Star Blooms',
    description:
      'Prized for its giant snow-white petals and heavenly aroma, the Casablanca Lily serves as an ethereal centerpiece.',
    rating: 4.9,
    reviewsCount: 65,
    inStock: 12,
    freshness: 'Fresh Budded • Opens Gracefully',
    perfectFor: ['Weddings', 'Celebrations', 'Fine Living'],
  },
  {
    id: 'bs-3',
    name: 'Royal Sunset Dutch Tulips',
    price: 40,
    category: 'Tulips',
    image: tulipImg,
    subtitle: 'Radiant Holland Spring Tulips',
    description:
      'Lush, vibrant tulips grown in premium soil for maximum longevity and brilliant spring-season color.',
    rating: 5.0,
    reviewsCount: 91,
    inStock: 14,
    freshness: 'Dutch Import • Phototropic Growth',
    perfectFor: ['Dinner Parties', 'Hostess Gifts', 'Spring Joy'],
  },
  {
    id: 'bs-4',
    name: 'Architectural Laurentii Snake Plant',
    price: 50,
    category: 'All Flowers',
    image: snakeplantImg,
    subtitle: 'NASA Certified Evergreen Companion',
    description:
      'The ultimate architectural foliage plant to complement fresh flower arrangements with vibrant green contrast.',
    rating: 4.9,
    reviewsCount: 110,
    inStock: 20,
    freshness: 'Living Plant • Evergreen Permanence',
    perfectFor: ['Bedrooms', 'Home Decor', 'Long-lasting Greenery'],
  },
];