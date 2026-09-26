import { PricingPlan } from '../types';

export interface CustomParcelItemOption {
  id: string;
  name: string;
  category: 'EDITORIAL' | 'MOTION' | 'PROMO' | 'BRANDING';
  description: string;
  priceINR: number;
  priceUSD: number;
  priceGBP: number;
  defaultSelected?: boolean;
}

export const CUSTOM_PARCEL_OPTIONS: CustomParcelItemOption[] = [
  {
    id: 'hero_poster',
    name: 'Hero Editorial Campaign Poster',
    category: 'EDITORIAL',
    description: 'High-fashion campaign billboard & primary feed hero artwork with bespoke art direction',
    priceINR: 1999,
    priceUSD: 39,
    priceGBP: 30,
    defaultSelected: true
  },
  {
    id: 'reel_cover',
    name: 'High-Retention 9:16 Vertical Reel Cover',
    category: 'MOTION',
    description: 'Thumb-stopping editorial hook cover with high-contrast typography designed for reels/shorts',
    priceINR: 1499,
    priceUSD: 29,
    priceGBP: 24,
    defaultSelected: true
  },
  {
    id: 'promo_offer',
    name: 'Promotional Offer / Launch Creative',
    category: 'PROMO',
    description: 'High-conversion campaign poster with clear price anchoring, package incentives & CTA',
    priceINR: 1799,
    priceUSD: 35,
    priceGBP: 28,
    defaultSelected: true
  },
  {
    id: 'styling_carousel',
    name: 'Styling / Educational Carousel (per slide)',
    category: 'EDITORIAL',
    description: 'Clean carousel slide demonstrating product versatility, how-to-style, or menu curation',
    priceINR: 999,
    priceUSD: 19,
    priceGBP: 15
  },
  {
    id: 'brand_9grid',
    name: 'Curated 9-Grid Cohesive Brand Grid System',
    category: 'BRANDING',
    description: 'Comprehensive 9-panel Instagram aesthetic layout connecting tone, textures & products',
    priceINR: 5999,
    priceUSD: 119,
    priceGBP: 95
  },
  {
    id: 'packaging_visual',
    name: 'Product Packaging & Tactile Detail Shot',
    category: 'EDITORIAL',
    description: 'Sensorial bottle, silk drape, or beverage tabletop visual with tactile lighting',
    priceINR: 1699,
    priceUSD: 32,
    priceGBP: 26
  },
  {
    id: 'brand_typography',
    name: 'Custom Typography & Hierarchy Styling',
    category: 'BRANDING',
    description: 'Font pairings, microcopy hierarchy, and aesthetic title treatment guidelines',
    priceINR: 2499,
    priceUSD: 49,
    priceGBP: 39
  },
  {
    id: 'rush_delivery',
    name: '24-Hour Expedited Delivery',
    category: 'MOTION',
    description: 'Priority overnight turnaround with dedicated immediate production slot',
    priceINR: 2999,
    priceUSD: 59,
    priceGBP: 48
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'STARTER',
    name: 'STARTER PARCEL',
    priceINR: 2499,
    priceUSD: 49,
    priceGBP: 39,
    deliverables: [
      '4 high-impact social posts',
      '2 editorial story frames',
      '1 promotional creative with offer',
      '1 short-form visual asset'
    ],
    features: [
      'Curated art direction & color grading',
      'Exported in high-resolution ready for publish',
      'Standard 3–4 business days delivery',
      '1 round of revision'
    ],
    turnaround: '3–4 Days Delivery',
    isPopular: false
  },
  {
    id: 'SIGNATURE',
    name: 'SIGNATURE PARCEL',
    priceINR: 4999,
    priceUSD: 99,
    priceGBP: 79,
    deliverables: [
      '8 editorial posts / carousels',
      '4 engaging stories & teasers',
      '2 high-converting promotional creatives',
      'Tailored copy & caption direction'
    ],
    features: [
      'Consistent visual direction & brand aesthetic',
      'Priority 48-hour delivery option',
      'Story + feed matched asset sizing',
      '2 rounds of revisions',
      'Dedicated creative review'
    ],
    turnaround: '48-Hour Priority Delivery',
    isPopular: true
  },
  {
    id: 'CUSTOM',
    name: 'CUSTOM PARCEL',
    priceINR: 0,
    priceUSD: 0,
    priceGBP: 0,
    deliverables: [
      'Select individual deliverables with custom pricing',
      'Choose exact quantity of reels, posts & carousels',
      'Build your own bespoke scope of work',
      'Transparent itemized pricing for your budget'
    ],
    features: [
      'Complete modular customization',
      'Direct enquiry submitted to studio director',
      'Pay only for the deliverables you need',
      'No upfront purchase required to enquire',
      'Expedited launch sprint'
    ],
    turnaround: 'Modular Custom Sprint',
    isPopular: false
  }
];
