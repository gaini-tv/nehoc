import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import WindowTextReveal from '../components/WindowTextReveal';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { products, categories } from '../data/products';
import { categoryImages, images } from '../data/images';
import { pagesSeo, absoluteUrl } from '../config/site';
import './Catalogue.css';

export default function Catalogue() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const catalogueSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catalogue menuiseries NEHOC',
    description: pagesSeo.catalogue.description,
    url: absoluteUrl('/catalogue'),
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.image,
        brand: { '@type': 'Brand', name: 'NEHOC' },
        category: categories.find((c) => c.id === product.category)?.label,
      },
    })),
  };

  const activeCategoryLabel = categories.find((c) => c.id === activeCategory)?.label;
  const categoryBannerImage =
    activeCategory !== 'all' ? categoryImages[activeCategory] : images.facade;

  return (
    <div className="catalogue">
      <SEO seo={pagesSeo.catalogue} jsonLd={catalogueSchema} />
      <section className="catalogue-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Catalogue</span>
            <WindowTextReveal className="catalogue-hero__title" as="h1" delay={0.2}>
              Nos menuiseries
            </WindowTextReveal>
            <p className="section-subtitle">
              Fenêtres aluminium haut de gamme, PVC, serrurerie, garde-corps
              et ouvrants motorisés — tous coloris, toutes finitions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="catalogue-filters">
        <div className="container">
          <div className="catalogue-filters__list">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`catalogue-filter ${activeCategory === cat.id ? 'catalogue-filter--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.span
                    className="catalogue-filter__bg"
                    layoutId="filter-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeCategory !== 'all' && (
          <motion.section
            key={activeCategory}
            className="catalogue-category-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="catalogue-category-banner__image">
              <img
                src={categoryBannerImage}
                alt={activeCategoryLabel ?? 'Catégorie'}
                loading="lazy"
              />
            </div>
            <div className="container catalogue-category-banner__text">
              <span className="section-label">{activeCategoryLabel}</span>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="catalogue-grid-section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <StaggerContainer className="catalogue-grid" staggerDelay={0.08}>
                {filtered.map((product) => (
                  <StaggerItem key={product.id}>
                    <article
                      className="product-card"
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <div className="product-card__image">
                        <motion.img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          animate={{ scale: hoveredId === product.id ? 1.08 : 1 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <div className="product-card__overlay">
                          <span className="product-card__category">
                            {categories.find((c) => c.id === product.category)?.label}
                          </span>
                        </div>
                      </div>
                      <div className="product-card__content">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <ul className="product-card__features">
                          {product.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="catalogue-cta">
        <div className="container">
          <ScrollReveal>
            <div className="catalogue-cta__inner">
              <h2>Un projet en tête ?</h2>
              <p>
                Fenêtres, portes, garde-corps ou ouvrants motorisés —
                contactez-nous pour un conseil personnalisé et un devis gratuit.
              </p>
              <Link to="/contact" className="btn btn-primary">Demander un devis</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
