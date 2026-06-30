import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const siteUrl = (process.env.VITE_SITE_URL || 'https://www.nehoc.fr').replace(/\/$/, '');
const distDir = join(process.cwd(), 'dist');
const today = new Date().toISOString().slice(0, 10);

const business = {
  name: 'NEHOC',
  legalName: 'NEHOC Menuiseries',
  description:
    "NEHOC - Fenêtres aluminium haut de gamme à prix compétitifs, fenêtres PVC, serrurerie, portes d'entrée alu & verre, garde-corps et ouvrants motorisés.",
  email: 'contact@nehoc.fr',
  phone: '+33400000000',
  phoneDisplay: '+33 4 00 00 00 00',
  city: 'Marseille',
  postalCode: '13006',
  region: "Provence-Alpes-Côte d'Azur",
  country: 'FR',
  addressDisplay: 'Marseille 13006',
  latitude: 43.2867,
  longitude: 5.3842,
  areaServed: ['Marseille', 'PACA', 'Sud de la France'],
};

const routes = [
  {
    path: '/',
    title: "NEHOC | Fenêtres Aluminium & PVC Haut de Gamme - Menuiseries d'Exception",
    description:
      "Fenêtres aluminium haut de gamme à prix compétitifs, PVC, portes d'entrée alu & verre, garde-corps et ouvrants motorisés. Quatre frères fondateurs, conseil expert et devis gratuit sous 48h.",
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/a-propos',
    title: 'À Propos | NEHOC - 4 Frères Fondateurs, Passion Menuiserie & Lumière',
    description:
      'Découvrez NEHOC : quatre frères fondateurs unis par la passion des matériaux et du design. Menuiseries de qualité et conseil sur mesure pour des espaces lumineux.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/catalogue',
    title: 'Catalogue | NEHOC - Fenêtres, Portes, Garde-Corps & Ouvrants Motorisés',
    description:
      "Catalogue NEHOC : fenêtres aluminium haut de gamme, PVC, portes d'entrée alu & verre, portes de garage, garde-corps alu & verre et ouvrants motorisés.",
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/contact',
    title: 'Contact & Devis Gratuit | NEHOC - Menuiseries Marseille',
    description:
      'Contactez NEHOC pour un devis gratuit sous 48h. Fenêtres, portes, garde-corps et ouvrants motorisés à Marseille et en région PACA.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales | NEHOC',
    description:
      'Mentions légales du site NEHOC : éditeur, hébergeur, propriété intellectuelle et responsabilité.',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/politique-de-confidentialite',
    title: 'Politique de confidentialité | NEHOC - RGPD',
    description:
      'Politique de confidentialité NEHOC : données collectées, finalités, durée de conservation, droits RGPD et gestion des cookies.',
    priority: '0.3',
    changefreq: 'yearly',
  },
];

const services = [
  'Fenêtres aluminium',
  'Fenêtres PVC',
  "Portes d'entrée aluminium et verre",
  'Portes de garage',
  'Garde-corps aluminium et verre',
  'Ouvrants motorisés',
];

function absoluteUrl(path) {
  return `${siteUrl}${path === '/' ? '' : path}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${absoluteUrl('/')}#organization`,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo-black.png'),
    image: absoluteUrl('/og-image.png'),
    email: business.email,
    telephone: business.phone,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.addressDisplay,
      addressLocality: business.city,
      postalCode: business.postalCode,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '12:00',
      },
    ],
    areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: business.phone,
      email: business.email,
      areaServed: 'FR',
      availableLanguage: ['fr-FR'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Menuiseries NEHOC',
      itemListElement: services.map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
        },
      })),
    },
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    name: 'NEHOC',
    url: absoluteUrl('/'),
    description: business.description,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
  };
}

function breadcrumbSchema(route) {
  if (route.path === '/') return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: route.title.split('|')[0].trim(),
        item: absoluteUrl(route.path),
      },
    ],
  };
}

function routeSchema(route) {
  const base = {
    '@context': 'https://schema.org',
    '@type': route.path === '/catalogue' ? 'CollectionPage' : route.path === '/contact' ? 'ContactPage' : 'WebPage',
    '@id': `${absoluteUrl(route.path)}#webpage`,
    name: route.title,
    description: route.description,
    url: absoluteUrl(route.path),
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    about: { '@id': `${absoluteUrl('/')}#organization` },
  };

  if (route.path === '/catalogue') {
    return {
      ...base,
      mainEntity: {
        '@type': 'ItemList',
        name: 'Catalogue menuiseries NEHOC',
        numberOfItems: services.length,
        itemListElement: services.map((name, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name,
            provider: { '@id': `${absoluteUrl('/')}#organization` },
            areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
          },
        })),
      },
    };
  }

  if (route.path === '/contact') {
    return {
      ...base,
      mainEntity: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: business.phone,
        email: business.email,
        areaServed: 'FR',
        availableLanguage: ['fr-FR'],
      },
    };
  }

  return base;
}

function seoHead(route) {
  const url = absoluteUrl(route.path);
  const image = absoluteUrl('/og-image.png');
  const schemas = [organizationSchema(), websiteSchema(), breadcrumbSchema(route), routeSchema(route)].filter(Boolean);

  return `<!-- SEO_START -->
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="NEHOC" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(image)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="NEHOC - Menuiseries aluminium &amp; PVC" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <meta name="geo.region" content="FR-13" />
    <meta name="geo.placename" content="${escapeHtml(business.city)}" />
    <meta name="geo.position" content="${business.latitude};${business.longitude}" />
    <meta name="ICBM" content="${business.latitude}, ${business.longitude}" />
    <script type="application/ld+json">${JSON.stringify(schemas)}</script>
    <!-- SEO_END -->`;
}

function applyRouteSeo(html, route) {
  return html.replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, seoHead(route));
}

function sitemap() {
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const template = await readFile(join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  const html = applyRouteSeo(template, route);
  const output = route.path === '/' ? join(distDir, 'index.html') : join(distDir, route.path, 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

await writeFile(join(distDir, 'sitemap.xml'), sitemap());

console.log(`SEO static HTML generated for ${routes.length} routes.`);
