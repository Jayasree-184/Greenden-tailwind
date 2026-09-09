import roseImg from '../assets/images/products-rose.jpg';
import carnationImg from '../assets/images/products-carnation.jpg';
import lilyImg from '../assets/images/products-lily.jpg';
import hyacinthImg from '../assets/images/products-hyacinth.jpg';
import tulipImg from '../assets/images/products-tulip.jpg';
import orchidImg from '../assets/images/products-orchid.jpg';
import snakeplantImg from '../assets/images/products-snakeplant.jpg';
import sunflowerImg from '../assets/images/products-sunflower.jpg';
import { bestSellers } from './bestSellers';

export const categories = [
  'All Flowers',
  'Roses',
  'Tulips',
  'Lilies',
  'Orchids',
  'Sunflowers',
  'Carnations',
  'Hyacinths',
];

export const flowerCategoryList = [
  { name: 'All Flowers', image: roseImg, description: 'Complete Collection', slug: 'All Flowers' },
  { name: 'Roses', image: roseImg, description: 'Romantic & Classic', slug: 'Roses' },
  { name: 'Tulips', image: tulipImg, description: 'Vibrant Spring', slug: 'Tulips' },
  { name: 'Lilies', image: lilyImg, description: 'Pure & Fragrant', slug: 'Lilies' },
  { name: 'Orchids', image: orchidImg, description: 'Exotic Elegance', slug: 'Orchids' },
  { name: 'Sunflowers', image: sunflowerImg, description: 'Sunny & Cheerful', slug: 'Sunflowers' },
  { name: 'Carnations', image: carnationImg, description: 'Ruffled & Enduring', slug: 'Carnations' },
  { name: 'Hyacinths', image: hyacinthImg, description: 'Intense Aroma', slug: 'Hyacinths' },
];

export const products = [
  {
    id: 'prod-1',
    name: 'Red Velvet Garden Roses',
    flowerType: 'Roses',
    price: 20,
    category: 'Roses',
    image: roseImg,
    subtitle: 'Classic Hand-Picked Garden Rose Stem',
    description:
      'Our iconic garden roses feature velvety deep red petals with an intoxicating classic perfume. Hand-cut at peak bloom to guarantee a long-lasting, romantic centerpiece for home or gifting.',
    rating: 4.9,
    reviewsCount: 42,
    inStock: 18,
    freshness: 'Fresh Cut • 7+ Days Vase Life',
    fragrance: 'Intense Romantic Floral',
    perfectFor: ['Anniversaries', 'Romantic Gestures', 'Valentine’s Day', 'Centerpieces'],
    careGuide: {
      vaseLife: '7 - 10 Days',
      water: 'Change with fresh chilled water every 48 hours',
      sunlight: 'Keep away from direct heat and direct hot sun',
      trim: 'Trim 1/2 inch off stems at a 45-degree angle',
    },
    features: ['Hand-harvested daily', 'Deep velvet red petals', 'Artisanal paper wrapping', 'Floral nutrition sachet included'],
  },
  {
    id: 'prod-2',
    name: 'Blush Carnation Petals',
    flowerType: 'Carnations',
    price: 20,
    category: 'Carnations',
    image: carnationImg,
    subtitle: 'Ruffled Pastel Blooms with Spiced Scent',
    description:
      'Celebrated for their layered, ruffled silhouette and incredible endurance, these blush carnations radiate playful elegance. Known to stay vibrant and fresh for up to two full weeks in water.',
    rating: 4.7,
    reviewsCount: 28,
    inStock: 14,
    freshness: 'Long-Lasting • Up to 14 Days Vase Life',
    fragrance: 'Light Sweet Clove Aroma',
    perfectFor: ['Birthdays', 'Mother’s Day', 'Desk Bouquets', 'Sympathy & Care'],
    careGuide: {
      vaseLife: '12 - 16 Days',
      water: 'Clean room-temperature water',
      sunlight: 'Bright indirect daylight',
      trim: 'Cut stems between leaf nodes for optimal intake',
    },
    features: ['Exceptionally long vase life', 'Soft ruffled texture', 'Delicate spiced fragrance', 'Sturdy upright stems'],
  },
  {
    id: 'prod-3',
    name: 'Serene Casablanca White Lily',
    flowerType: 'Lilies',
    price: 30,
    category: 'Lilies',
    image: lilyImg,
    subtitle: 'Pure White Star-Shaped Floral Masterpiece',
    description:
      'Exquisite, sculptural, and divinely fragrant. The Casablanca Lily opens into majestic snow-white stars that perfume the entire room with an air of sophisticated luxury and peaceful tranquility.',
    rating: 4.9,
    reviewsCount: 54,
    inStock: 9,
    freshness: 'Budded Blooms • Opens Gracefully in Vase',
    fragrance: 'Rich Heavenly Botanical',
    perfectFor: ['Weddings', 'Celebrations of Life', 'Housewarmings', 'Luxury Gifts'],
    careGuide: {
      vaseLife: '8 - 12 Days',
      water: 'Full vase with lukewarm water',
      sunlight: 'Filtered bright ambient light',
      trim: 'Pinch off pollen anthers as blooms open to avoid staining',
    },
    features: ['Giant 6-inch blooms', 'Pristine pure white petals', 'Intense natural aroma', 'Symbol of peace & renewal'],
  },
  {
    id: 'prod-4',
    name: 'Royal Purple Hyacinth Clusters',
    flowerType: 'Hyacinths',
    price: 20,
    category: 'Hyacinths',
    image: hyacinthImg,
    subtitle: 'Dense Starry Floret Tower with Sweet Perfume',
    description:
      'Towering clusters of starry lavender-purple blossoms that herald the arrival of spring. Known as one of the most naturally fragrant flowers in the botanical world, filling your foyer with spring delight.',
    rating: 4.8,
    reviewsCount: 23,
    inStock: 16,
    freshness: 'Nursery Fresh • Strong Spring Bloom',
    fragrance: 'Powerful Sweet Honey & Jasmine',
    perfectFor: ['Spring Celebrations', 'Cheer Up Gifts', 'Bedside Tables', 'Easter'],
    careGuide: {
      vaseLife: '7 - 9 Days',
      water: 'Keep water shallow (2-3 inches) to avoid stem softening',
      sunlight: 'Cool room with gentle morning light',
      trim: 'Leave bulb base intact or trim minimally',
    },
    features: ['Over 40 individual florets per stem', 'Unmatched room fragrance', 'Rich amethyst violet hue', 'Arrives potted or vase-ready'],
  },
  {
    id: 'prod-5',
    name: 'Vibrant Holland Dutch Tulips',
    flowerType: 'Tulips',
    price: 40,
    category: 'Tulips',
    image: tulipImg,
    subtitle: 'Graceful Sculptural Stem with Satin Petals',
    description:
      'Hand-imported premium Dutch tulips that continue to gracefully grow toward the light even in the vase. Available in radiant sunset tones that add modern designer flair to any dining space.',
    rating: 5.0,
    reviewsCount: 68,
    inStock: 11,
    freshness: 'Fresh Cut • Stems Continue to Grow Elegantly',
    fragrance: 'Fresh Crisp Morning Dew',
    perfectFor: ['Dinner Parties', 'Hostess Gifts', 'Modern Interiors', 'Anniversaries'],
    careGuide: {
      vaseLife: '7 - 10 Days',
      water: 'Ice cold water keeps stems sturdy and tall',
      sunlight: 'Avoid warm heaters and direct sunlight',
      trim: 'Trim stems straight across every other day',
    },
    features: ['Satin finish petals', 'Dynamic phototropic stems', 'Clean modern silhouette', 'Sourced from Dutch growers'],
  },
  {
    id: 'prod-6',
    name: 'Imperial White Phalaenopsis Orchid',
    flowerType: 'Orchids',
    price: 20,
    category: 'Orchids',
    image: orchidImg,
    subtitle: 'Enduring Potted Butterfly Blossom Stem',
    description:
      'The crown jewel of indoor flowering plants. This potted Phalaenopsis orchid displays cascading butterfly-like flowers that remain in vibrant, sculptural bloom for up to three months.',
    rating: 4.9,
    reviewsCount: 37,
    inStock: 15,
    freshness: 'Live Potted Orchid • Blooms for Months',
    fragrance: 'Subtle Clean Orchid Scent',
    perfectFor: ['Corporate Gifts', 'Executive Desks', 'Spa Bathrooms', 'Milestones'],
    careGuide: {
      vaseLife: '60 - 90 Days in Bloom',
      water: '3 ice cubes or 1 shot of water once weekly',
      sunlight: 'Bright indirect light (never direct scorch)',
      trim: 'Leave stem intact after blooms fall for re-blooming',
    },
    features: ['Months of continuous blooming', 'Minimal weekly watering', 'Designer ceramic pot included', 'Timeless zen aesthetic'],
  },
  {
    id: 'prod-7',
    name: 'Botanical Architectural Snake Plant',
    flowerType: 'Sunflowers', // allows matching under versatile collections
    price: 30,
    category: 'All Flowers',
    image: snakeplantImg,
    subtitle: 'Striking Green Foliage Companion Specimen',
    description:
      'A sculptural green foliage accent designed to accompany floral bouquets. NASA-certified to purify indoor air 24 hours a day while requiring virtually zero maintenance.',
    rating: 5.0,
    reviewsCount: 92,
    inStock: 22,
    freshness: 'Evergreen Living Plant • Forever Fresh',
    fragrance: 'Clean Fresh Oxygen',
    perfectFor: ['Bedrooms', 'Home Offices', 'Low Light Spaces', 'Beginner Plant Parents'],
    careGuide: {
      vaseLife: 'Permanent living specimen',
      water: 'Water once every 2 to 3 weeks',
      sunlight: 'Thrives in any light from dim to bright',
      trim: 'No pruning necessary',
    },
    features: ['Top-rated air purifying plant', 'Produces nighttime oxygen', 'Indestructible hardy nature', 'Modern architectural lines'],
  },
  {
    id: 'prod-8',
    name: 'Radiant Meadow Dwarf Sunflowers',
    flowerType: 'Sunflowers',
    price: 20,
    category: 'Sunflowers',
    image: sunflowerImg,
    subtitle: 'Golden Golden-Hearted Sunshine Stems',
    description:
      'Bring the warmth of a golden summer field indoors. These miniature dwarf sunflowers showcase cheerful velvety golden petals surrounding rich chocolate seed centers.',
    rating: 4.8,
    reviewsCount: 39,
    inStock: 17,
    freshness: 'Fresh Cut • Opens Wide and Bright',
    fragrance: 'Earthy Warm Summer Sunshine',
    perfectFor: ['Graduations', 'Celebrations', 'Get Well Soon', 'Summer Decor'],
    careGuide: {
      vaseLife: '7 - 12 Days',
      water: 'High water volume; sunflowers drink generously',
      sunlight: 'Warm and bright room locations',
      trim: 'Remove leaves that sit below the water level',
    },
    features: ['Thick sturdy stalks', 'Pollen-free variety (no messy drops)', 'Golden ray petals', 'Instant mood booster'],
  },
];

export function getProductById(id) {
  const found = products.find((p) => p.id === id);
  if (found) return found;
  return bestSellers.find((p) => p.id === id);
}