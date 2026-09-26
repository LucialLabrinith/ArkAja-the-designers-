import { Project } from '../types';

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'lumiere',
    name: 'LUMIÈRE',
    category: 'BEAUTY',
    subcategory: 'Skin • Hair • Beauty Luxury Editorial',
    tagline: 'Your glow. Elevated.',
    label: 'CONCEPT PROJECT',
    creativeDirection: 'Luminous clinical minimalism, warm ivory tones, dewy textures, and high-conversion promotional offer layouts tailored for luxury salons & medical spas.',
    description: 'A comprehensive editorial social visual suite crafted for a luxury aesthetic and skincare salon. The system balances high-credibility clinical aesthetics with warm sensorial treatment moments and persuasive package promotion.',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512290900672-1f02e9b093e3?auto=format&fit=crop&w=1200&q=85'
    ],
    deliverables: [
      'Hero Editorial Advertisement (Post 1)',
      'Editorial Offer "The Glow Edit" (Post 2)',
      'Transformation Hook Vertical Reel Cover (Post 3)',
      'High-conversion package pricing card'
    ],
    visualHighlights: ['Hero Editorial Advertisement', 'The Glow Edit Offer', 'Transformation Hook Reel'],
    coverItemIndex: 0,
    items: [
      {
        id: 'lumiere-1',
        title: 'Hero Editorial: Your Glow. Elevated.',
        type: 'Editorial Advertisement',
        imageSrc: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
        headline: 'YOUR GLOW. ELEVATED.',
        subtext: 'Signature Hydrafacial • Deep cleanse • Hydrate • Renew',
        accentNote: 'BOOK YOUR GLOW',
        aspectRatio: 'portrait',
        themeBg: '#1C1917',
        themeTextColor: '#F7F5EF',
        themeAccent: '#D4B98C',
        caption: 'High-fashion editorial brand advertisement highlighting dewy, luminous skin paired with confident typography and strong booking call to action.',
        badge: 'POST 1 • HERO EDITORIAL AD',
        graphicStyle: 'lumiere_hero_ad'
      },
      {
        id: 'lumiere-2',
        title: 'The Glow Edit (₹2,499 Offer)',
        type: 'Editorial Offer Campaign',
        imageSrc: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
        headline: 'THE GLOW EDIT',
        subtext: 'Hydrafacial + LED Therapy + Face Massage',
        priceTag: '₹3,499  ₹2,499',
        accentNote: 'Limited appointments available',
        aspectRatio: 'portrait',
        themeBg: '#FAF7F2',
        themeTextColor: '#1C1917',
        themeAccent: '#846834',
        caption: 'Split editorial promotional poster pairing model radiance with product serum packaging, clear price anchoring, and high-conversion incentive.',
        badge: 'POST 2 • EDITORIAL OFFER',
        graphicStyle: 'lumiere_glow_offer'
      },
      {
        id: 'lumiere-3',
        title: 'Reel Hook: POV You Finally Booked The Facial',
        type: 'Vertical Reel Cover',
        imageSrc: 'https://images.unsplash.com/photo-1512290900672-1f02e9b093e3?auto=format&fit=crop&w=1200&q=85',
        headline: "POV: YOU FINALLY BOOKED THE FACIAL YOU'VE BEEN POSTPONING.",
        subtext: 'LUMIÈRE BEAUTY | CONCEPT PROJECT BY ARKAJA STUDIO',
        aspectRatio: 'portrait',
        themeBg: '#09090B',
        themeTextColor: '#F7F5EF',
        themeAccent: '#E2CCA6',
        caption: 'High-retention 9:16 vertical split reel cover designed to stop thumbs in feed with relatable emotional trigger and visual contrast.',
        badge: 'POST 3 • REEL COVER HOOK',
        graphicStyle: 'lumiere_reel_hook'
      }
    ]
  },
  {
    id: 'noir-and-bean',
    name: 'NOIR & BEAN',
    category: 'HOSPITALITY',
    subcategory: 'Coffee • Brunch • Slow Mornings',
    tagline: 'Your 4PM deserves this.',
    label: 'CONCEPT PROJECT',
    creativeDirection: 'Rich crema tones, rustic café stone textures, warm afternoon sunlight, and appetite-inducing appetite triggers built to convert followers into footfall.',
    description: 'Designed to establish an artisanal specialty coffee bar as an essential daily ritual and weekend destination. The creative suite features afternoon craving anchors, brunch club promos, and high-energy motion covers.',
    coverImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85'
    ],
    deliverables: [
      'Hero Afternoon Product Shot (Post 1)',
      'Saturday Brunch Club Promo (Post 2)',
      'Seasonal beverage launch microcopy',
      'Weekend reservation anchor'
    ],
    visualHighlights: ['Afternoon Craving Trigger', 'Saturday Brunch Club Promo', 'Vanilla Cloud Latte'],
    coverItemIndex: 0,
    items: [
      {
        id: 'noir-1',
        title: 'Afternoon Craving: Your 4PM Deserves This',
        type: 'Afternoon Product Shot',
        imageSrc: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
        headline: 'YOUR 4PM DESERVES THIS.',
        subtext: 'Vanilla Cloud Latte | Available this week',
        aspectRatio: 'portrait',
        themeBg: '#181310',
        themeTextColor: '#F7F5EF',
        themeAccent: '#DDB382',
        caption: 'Warm golden-hour café setting capturing iced latte condensation and creamy foam texture to trigger immediate afternoon foot traffic.',
        badge: 'POST 1 • HERO PRODUCT SHOT',
        graphicStyle: 'noir_afternoon_latte'
      },
      {
        id: 'noir-2',
        title: 'Saturday Brunch Club Promo (₹499)',
        type: 'Promotional Offer Creative',
        imageSrc: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85',
        headline: 'SATURDAY BRUNCH CLUB',
        subtext: 'Coffee + Croissant + Eggs ₹499',
        priceTag: '₹499',
        accentNote: 'Saturdays • 9AM–1PM | Reserve your table',
        aspectRatio: 'portrait',
        themeBg: '#1C1917',
        themeTextColor: '#FDFBF7',
        themeAccent: '#E2BD8A',
        caption: 'Generous weekend spread featuring artisan pastry, poached eggs, and latte art on stone tabletop with unmistakable promotional value anchor.',
        badge: 'POST 2 • BRUNCH PROMO',
        graphicStyle: 'noir_brunch_club'
      }
    ]
  },
  {
    id: 'elan',
    name: 'ÉLAN',
    category: 'FASHION',
    subcategory: 'Contemporary Womenswear Editorial',
    tagline: 'The 9–5 look but make it expensive.',
    label: 'CONCEPT PROJECT',
    creativeDirection: 'Understated Parisian and Milanese luxury, monochromatic palettes, architectural stone textures, and authoritative editorial typography.',
    description: 'A multi-part campaign suite built for a contemporary womenswear label. Focuses on elevating everyday office tailoring into covetable, high-fashion wardrobe staples through educational carousels and stop-motion style reveals.',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    deliverables: [
      'The Autumn Edit Campaign (Post 1)',
      '3 Ways To Style One Blazer (Post 2)',
      'The 9–5 Look But Make It Expensive (Post 3)',
      'Collection storytelling & retail CTAs'
    ],
    visualHighlights: ['The Autumn Edit Campaign', '3 Ways To Style One Blazer', 'The 9–5 Look Reel Cover'],
    coverItemIndex: 0,
    items: [
      {
        id: 'elan-1',
        title: 'The Autumn Edit Campaign Drop',
        type: 'Campaign Launch Creative',
        imageSrc: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        headline: 'THE AUTUMN EDIT',
        subtext: 'COLLECTION 02 / 2026',
        accentNote: 'SHOP THE COLLECTION →',
        aspectRatio: 'portrait',
        themeBg: '#18181B',
        themeTextColor: '#FFFFFF',
        themeAccent: '#EAE5DC',
        caption: 'European street scene featuring charcoal tailored wool overcoat against warm sandstone facade, paired with luxury editorial restraint.',
        badge: 'POST 1 • COLLECTION DROP',
        graphicStyle: 'elan_autumn_drop'
      },
      {
        id: 'elan-2',
        title: '3 Ways To Style One Blazer',
        type: 'Carousel Guide Visual',
        imageSrc: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
        headline: '3 WAYS TO STYLE ONE BLAZER',
        subtext: '01 Office • 02 Dinner • 03 Weekend',
        aspectRatio: 'portrait',
        themeBg: '#F3EFEA',
        themeTextColor: '#141312',
        themeAccent: '#4A4540',
        caption: 'Clean, actionable fashion educational carousel cover demonstrating blazer versatility for modern working professionals.',
        badge: 'POST 2 • STYLING CAROUSEL',
        graphicStyle: 'elan_blazer_guide'
      },
      {
        id: 'elan-3',
        title: 'The 9–5 Look But Make It Expensive',
        type: 'OOTD Fashion Reel Cover',
        imageSrc: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
        headline: 'THE 9–5 LOOK BUT MAKE IT EXPENSIVE.',
        subtext: 'Modern Suiting & Architectural Tailoring',
        aspectRatio: 'portrait',
        themeBg: '#09090B',
        themeTextColor: '#FFFFFF',
        themeAccent: '#D4B98C',
        caption: 'High-contrast fashion vertical reel framed against corporate architectural plaza with bold, punchy aspirational aesthetic.',
        badge: 'POST 3 • POWER SUITING REEL',
        graphicStyle: 'elan_expensive_reel'
      }
    ]
  },
  {
    id: 'saree-edit',
    name: 'SAREE COLLECTIONS',
    category: 'FASHION',
    subcategory: 'Heritage Handloom Silk & Royal Weaves',
    tagline: 'Live Royal, Wear Royal.',
    label: 'CONCEPT PROJECT',
    creativeDirection: 'Warm parchment editorial tones, stamp-framed archival photography, pure silk zari macro details, and timeless royal typography honoring Indian handloom heritage.',
    description: 'An editorial brand campaign suite celebrating Indian sarees through two landmark executions: Kankatala "Live Royal, Wear Royal" dual-framed editorial and The Birla Sarees "The Trademark of India" vintage stamp tribute.',
    coverImage: '/images/saree_left.png',
    images: [
      '/images/saree_left.png',
      '/images/saree_right.png'
    ],
    deliverables: [
      'Kankatala: "Live Royal, Wear Royal." (Post 1)',
      'The Birla Sarees: "The Trademark of India" (Post 2)',
      'Heritage weave launch visuals',
      'Sustainable handloom storytelling'
    ],
    visualHighlights: ['Live Royal, Wear Royal.', 'The Birla Sarees Vintage Stamp', 'Pure Silk Zari Brocade'],
    coverItemIndex: 0,
    items: [
      {
        id: 'saree-1',
        title: 'Kankatala: "Live Royal, Wear Royal."',
        type: 'Campaign Poster',
        imageSrc: '/images/saree_left.png',
        headline: 'SAREE COLLECTIONS',
        subtext: 'Live Royal, Wear Royal.',
        accentNote: 'KANKATALA • QUEENS OF SAREES',
        aspectRatio: 'portrait',
        themeBg: '#FAF7F2',
        themeTextColor: '#141312',
        themeAccent: '#1E3A8A',
        caption: 'Editorial campaign poster featuring dual-framed photography: genuine gold zari handloom brocade paired with contemporary royal peacock silk draping.',
        badge: 'POST 1 • ROYAL CAMPAIGN',
        graphicStyle: 'saree_royal_banarasi'
      },
      {
        id: 'saree-2',
        title: 'The Birla Sarees: "The Clothes of V. P."',
        type: 'Vintage Handloom Tribute',
        imageSrc: '/images/saree_right.png',
        headline: 'The Clothes of V. P.',
        subtext: 'INDIAN SAREES • THE TRADEMARK OF INDIA',
        accentNote: 'THE BIRLA SAREES',
        aspectRatio: 'portrait',
        themeBg: '#EDE5D8',
        themeTextColor: '#1C1917',
        themeAccent: '#8A2B3A',
        caption: 'Vintage-inspired stamp-framed tribute celebrating iconic handloom sarees with ornate Kalamkari borders and dual regal silk styling.',
        badge: 'POST 2 • VINTAGE TRIBUTE',
        graphicStyle: 'saree_birla'
      }
    ]
  },
  {
    id: 'muse-beauty-london',
    name: 'MUSE BEAUTY LONDON',
    category: 'BEAUTY',
    subcategory: 'Curated International Skincare Grid',
    tagline: 'Curated skincare for a luminous glow.',
    label: 'CONCEPT PROJECT',
    creativeDirection: 'British minimalism, understated serif typography, clean travertine stone surfaces, amber glass bottles, and cohesive feed curation.',
    description: 'A curated 9-grid international brand identity and social system for a British minimalist skincare label. Highlights botanical purity, ritualistic morning routines, and quiet prestige.',
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85'
    ],
    deliverables: [
      'Curated International Brand Grid',
      '9-panel cohesive Instagram layout',
      'Apothecary packaging brand visuals',
      'Botanical ingredient highlight system'
    ],
    visualHighlights: ['International 9-Grid Social System', 'British Botanical Purity', 'Apothecary Amber Visuals'],
    coverItemIndex: 0,
    items: [
      {
        id: 'muse-1',
        title: 'Curated International Brand Grid',
        type: 'Curated 9-Grid System',
        imageSrc: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
        headline: 'MUSE BEAUTY LONDON',
        subtext: 'Curated Skincare for a Luminous Glow. British Elegance. Minimalist Luxury.',
        accentNote: 'MUSE // London • @musebeautyldn',
        aspectRatio: 'square',
        themeBg: '#FAF8F5',
        themeTextColor: '#141312',
        themeAccent: '#8A7352',
        caption: 'A cohesive 9-panel editorial brand grid showcasing glass skin portraits, dropper vials, and tactile apothecary product textures.',
        badge: 'INTERNATIONAL BRAND GRID',
        graphicStyle: 'muse_beauty_grid'
      }
    ]
  }
];
