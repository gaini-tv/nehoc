export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.nehoc.fr';
export const SITE_NAME = 'NEHOC';
export const SITE_LOCALE = 'fr_FR';

export const business = {
  name: 'NEHOC',
  legalName: 'NEHOC Menuiseries',
  description:
    'NEHOC — Fenêtres aluminium haut de gamme à prix compétitifs, fenêtres PVC, serrurerie, portes d\'entrée alu & verre, garde-corps et ouvrants motorisés. Conseil expert pour la luminosité de vos espaces.',
  email: 'contact@nehoc.fr',
  phone: '+33400000000',
  phoneDisplay: '+33 4 00 00 00 00',
  address: {
    city: 'Marseille',
    postalCode: '13006',
    region: 'Provence-Alpes-Côte d\'Azur',
    country: 'FR',
    display: 'Marseille 13006',
  },
  geo: {
    latitude: 43.2867,
    longitude: 5.3842,
  },
  openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-12:00'],
  priceRange: '€€',
  areaServed: ['Marseille', 'PACA', 'Sud de la France'],
};

export const defaultOgImage =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=630&fit=crop&q=80&auto=format';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  ogType?: 'website' | 'article';
}

export const pagesSeo: Record<string, PageSeo> = {
  home: {
    title: 'NEHOC | Fenêtres Aluminium & PVC Haut de Gamme — Menuiseries d\'Exception',
    description:
      'Fenêtres aluminium haut de gamme à prix compétitifs, PVC, portes d\'entrée alu & verre, garde-corps et ouvrants motorisés. Quatre frères fondateurs, conseil expert pour la luminosité de votre habitat. Devis gratuit sous 48h.',
    path: '/',
    keywords: [
      'fenêtres aluminium',
      'fenêtres PVC',
      'menuiserie Marseille',
      'porte entrée alu verre',
      'garde-corps verre',
      'ouvrant motorisé',
      'fenêtre galandage',
      'menuiserie haut de gamme',
      'NEHOC',
    ],
  },
  about: {
    title: 'À Propos | NEHOC — 4 Frères Fondateurs, Passion Menuiserie & Lumière',
    description:
      'Découvrez NEHOC : quatre frères issus d\'une famille de promoteurs immobiliers, unis par la passion des matériaux et du design. Menuiseries de qualité et conseil sur mesure pour des espaces baignés de lumière.',
    path: '/a-propos',
    keywords: [
      'NEHOC fondateurs',
      'menuiserie qualité',
      'promoteur immobilier menuiserie',
      'conseil menuiserie',
      'luminosité habitat',
      'entreprise menuiserie PACA',
    ],
  },
  catalogue: {
    title: 'Catalogue | NEHOC — Fenêtres, Portes, Garde-Corps & Ouvrants Motorisés',
    description:
      'Catalogue NEHOC : fenêtres aluminium haut de gamme, PVC, portes d\'entrée alu & verre, portes de garage, garde-corps alu & verre, ouvrants motorisés à galandage ou encastrés. Tous coloris, toutes finitions.',
    path: '/catalogue',
    keywords: [
      'catalogue fenêtres',
      'fenêtre aluminium prix',
      'porte garage',
      'garde-corps aluminium verre',
      'fenêtre motorisée',
      'fenêtre encastrée',
      'menuiserie sur mesure',
    ],
  },
  contact: {
    title: 'Contact & Devis Gratuit | NEHOC — Menuiseries Marseille',
    description:
      'Contactez NEHOC pour un devis gratuit sous 48h. Fenêtres, portes, garde-corps et ouvrants motorisés. Showroom à Marseille. Conseil personnalisé sur coloris, matières et configurations.',
    path: '/contact',
    keywords: [
      'devis fenêtres gratuit',
      'contact NEHOC',
      'menuiserie Marseille devis',
      'showroom menuiserie',
      'installation fenêtres PACA',
    ],
  },
};

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}
