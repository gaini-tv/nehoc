import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  SITE_LOCALE,
  business,
  defaultOgImage,
  absoluteUrl,
  type PageSeo,
} from '../config/site';
import { catalogueCategories } from '../data/products';

interface SEOProps {
  seo: PageSeo;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${absoluteUrl('/')}#organization`,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo-black.png'),
    image: defaultOgImage,
    email: business.email,
    telephone: business.phone,
    priceRange: business.priceRange,
    founder: {
      '@type': 'Organization',
      name: 'Les quatre frères fondateurs de NEHOC',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.display,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
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
    areaServed: business.areaServed.map((name) => ({
      '@type': 'Place',
      name,
    })),
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
      itemListElement: catalogueCategories.map((category) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: category.label,
          description: category.description,
        },
      })),
    },
    sameAs: business.sameAs,
    knowsAbout: catalogueCategories.map((category) => category.label),
  };
}

function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description: business.description,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
  };
}

function buildBreadcrumbSchema(seo: PageSeo) {
  if (seo.path === '/') return null;

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
        name: seo.title.split('|')[0].trim(),
        item: absoluteUrl(seo.path),
      },
    ],
  };
}

export default function SEO({ seo, jsonLd }: SEOProps) {
  const url = absoluteUrl(seo.path);
  const schemas = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildBreadcrumbSchema(seo),
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
  ].filter(Boolean);

  return (
    <Helmet>
      <html lang="fr" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={seo.ogType || 'website'} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:image" content={defaultOgImage} />
      <meta property="og:image:secure_url" content={defaultOgImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — Menuiseries aluminium & PVC`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={defaultOgImage} />

      {/* Géolocalisation */}
      <meta name="geo.region" content="FR-13" />
      <meta name="geo.placename" content={business.address.city} />
      <meta name="geo.position" content={`${business.geo.latitude};${business.geo.longitude}`} />
      <meta name="ICBM" content={`${business.geo.latitude}, ${business.geo.longitude}`} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
}
