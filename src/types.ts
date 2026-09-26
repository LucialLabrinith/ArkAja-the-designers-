export type Category = 'ALL' | 'BEAUTY' | 'FASHION' | 'HOSPITALITY';

export interface ProjectVisualItem {
  id: string;
  title: string;
  type: string; // e.g. "Social Campaign Post", "Promotional Creative", "Story Frame", "Editorial Poster"
  imageSrc: string; // Explicit real uploaded image path
  headline?: string;
  subtext?: string;
  priceTag?: string;
  accentNote?: string;
  aspectRatio: 'portrait' | 'square' | 'landscape'; // portrait is 9:16 or 3:4, square is 1:1, landscape is 4:3
  themeBg: string;
  themeTextColor: string;
  themeAccent: string;
  caption: string;
  badge?: string;
  graphicStyle?: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'BEAUTY' | 'FASHION' | 'HOSPITALITY';
  subcategory: string;
  tagline: string;
  label: 'CONCEPT PROJECT';
  creativeDirection: string;
  description: string;
  deliverables: string[];
  visualHighlights: string[];
  coverItemIndex: number;
  coverImage: string; // Primary hero image
  images: string[]; // All real uploaded image paths for this project
  items: ProjectVisualItem[];
}

export interface ServiceBlock {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  note?: string;
}

export interface PricingPlan {
  id: 'STARTER' | 'SIGNATURE' | 'CUSTOM';
  name: string;
  priceINR: number;
  priceUSD: number;
  priceGBP: number;
  deliverables: string[];
  features: string[];
  turnaround: string;
  isPopular?: boolean;
}

export interface ProjectInquiryData {
  name: string;
  businessName: string;
  email: string;
  country: string;
  businessCategory: string;
  need: string;
  packageId: 'STARTER' | 'SIGNATURE' | 'CUSTOM';
  deadline: string;
  details: string;
}
