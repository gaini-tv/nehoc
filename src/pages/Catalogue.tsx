import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import WindowTextReveal from '../components/WindowTextReveal';
import ContactCTA from '../components/ContactCTA';
import { products, categories } from '../data/products';
import { colorPalettes } from '../data/color-palettes';
import { categoryBannerImages, categoryImages, images } from '../data/images';
import { pagesSeo, absoluteUrl } from '../config/site';
import { useScrollTo } from '../hooks/useScrollTo';
import './Catalogue.css';

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const isValidCategory = categories.some((c) => c.id === categoryFromUrl && c.id !== 'all');
  const [activeCategory, setActiveCategory] = useState<string>(
    isValidCategory && categoryFromUrl ? categoryFromUrl : 'all',
  );
  const [activePalette, setActivePalette] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const filtersRef = useRef<HTMLElement>(null);
  const { scrollToTop } = useScrollTo();

  const filtered = products.filter((p) => p.category === activeCategory);

  const catalogueCategories = useMemo(
    () =>
      categories
        .filter((cat) => cat.id !== 'all')
        .map((cat) => ({
          ...cat,
          image: categoryImages[cat.id],
          count:
            cat.id === 'couleurs-poignees'
              ? colorPalettes.length
              : products.filter((p) => p.category === cat.id).length,
        })),
    [],
  );

  const selectedPalette = useMemo(
    () => colorPalettes.find((p) => p.id === activePalette) ?? null,
    [activePalette],
  );

  const bumpScrollToTop = useCallback(() => {
    // Double rAF : attend le rendu React + recalcul layout (bannière, grille…)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToTop();
      });
    });
  }, [scrollToTop]);

  const selectCategory = (id: string) => {
    setActiveCategory(id);
    setActivePalette(null);
    setCategoryMenuOpen(false);
    setSearchParams(id === 'all' ? {} : { category: id }, { replace: true });
    bumpScrollToTop();
  };

  useEffect(() => {
    if (!categoryFromUrl) {
      if (activeCategory !== 'all') {
        setActiveCategory('all');
        setActivePalette(null);
        bumpScrollToTop();
      }
      return;
    }
    if (isValidCategory && categoryFromUrl !== activeCategory) {
      setActiveCategory(categoryFromUrl);
      setActivePalette(null);
      bumpScrollToTop();
    }
  }, [categoryFromUrl, isValidCategory, activeCategory, bumpScrollToTop]);

  const skipPaletteScrollRef = useRef(true);
  useEffect(() => {
    if (skipPaletteScrollRef.current) {
      skipPaletteScrollRef.current = false;
      return;
    }
    bumpScrollToTop();
  }, [activePalette, bumpScrollToTop]);

  useEffect(() => {
    if (!categoryMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCategoryMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setCategoryMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [categoryMenuOpen]);

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
    activeCategory !== 'all' ? categoryBannerImages[activeCategory] : images.facade;

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
              Fenêtres, portes-fenêtres, baies coulissantes, portes d'entrée,
              façades, portails, vérandas, volets et bien plus — tous coloris,
              toutes finitions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="catalogue-filters" ref={filtersRef}>
        <div className="container">
          <div className="catalogue-filters__bar">
            <button
              type="button"
              className={`catalogue-filters__all ${activeCategory === 'all' ? 'catalogue-filters__all--active' : ''}`}
              onClick={() => selectCategory('all')}
              aria-pressed={activeCategory === 'all'}
            >
              Tout
            </button>

            {activeCategory !== 'all' && (
              <span className="catalogue-filters__current">
                {activeCategory === 'couleurs-poignees' && selectedPalette
                  ? `${activeCategoryLabel} — ${selectedPalette.title}`
                  : activeCategoryLabel}
              </span>
            )}

            <button
              type="button"
              className={`catalogue-filters__burger ${categoryMenuOpen ? 'catalogue-filters__burger--open' : ''}`}
              onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
              aria-label={categoryMenuOpen ? 'Fermer les catégories' : 'Ouvrir les catégories'}
              aria-expanded={categoryMenuOpen}
              aria-controls="catalogue-category-menu"
            >
              <span />
              <span />
            </button>
          </div>

          <AnimatePresence>
            {categoryMenuOpen && (
              <motion.nav
                id="catalogue-category-menu"
                className="catalogue-filters__panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                aria-label="Catégories du catalogue"
              >
                <ul className="catalogue-filters__list">
                  {catalogueCategories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className={`catalogue-filter ${activeCategory === cat.id ? 'catalogue-filter--active' : ''}`}
                        onClick={() => selectCategory(cat.id)}
                        aria-pressed={activeCategory === cat.id}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
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
          {activeCategory === 'couleurs-poignees' && activePalette && selectedPalette && (
            <h2 className="color-palette-title">{selectedPalette.title}</h2>
          )}

          {activeCategory === 'couleurs-poignees' && activePalette && (
            <button
              type="button"
              className="color-palette-back"
              onClick={() => setActivePalette(null)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Toutes les palettes
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={
                activeCategory === 'couleurs-poignees'
                  ? `couleurs-${activePalette ?? 'list'}`
                  : activeCategory
              }
              className={
                activeCategory === 'couleurs-poignees' && activePalette
                  ? 'color-swatch-grid'
                  : 'catalogue-grid'
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeCategory === 'all' ? (
                catalogueCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className="category-card"
                    onClick={() => selectCategory(cat.id)}
                    onMouseEnter={() => setHoveredId(cat.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="category-card__image">
                      <motion.img
                        src={cat.image}
                        alt={cat.label}
                        loading="lazy"
                        animate={{ scale: hoveredId === cat.id ? 1.08 : 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <div className="category-card__overlay">
                        <span className="category-card__count">
                          {cat.id === 'couleurs-poignees'
                            ? `${cat.count} palette${cat.count > 1 ? 's' : ''}`
                            : `${cat.count} produit${cat.count > 1 ? 's' : ''}`}
                        </span>
                      </div>
                    </div>
                    <div className="category-card__content">
                      <h3>{cat.label}</h3>
                      <span className="category-card__link">
                        {cat.id === 'couleurs-poignees' ? 'Voir les palettes' : 'Voir les produits'}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                    </div>
                  </button>
                ))
              ) : activeCategory === 'couleurs-poignees' ? (
                !activePalette ? (
                  colorPalettes.map((palette) => (
                    <button
                      key={palette.id}
                      type="button"
                      className="category-card"
                      onClick={() => setActivePalette(palette.id)}
                      onMouseEnter={() => setHoveredId(palette.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <div className="category-card__image">
                        {palette.coverImage && (
                          <motion.img
                            src={palette.coverImage}
                            alt={palette.title}
                            loading="lazy"
                            animate={{ scale: hoveredId === palette.id ? 1.08 : 1 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                        <div className="category-card__overlay">
                          <span className="category-card__count">
                            {palette.swatches.length > 0
                              ? `${palette.swatches.length} couleur${palette.swatches.length > 1 ? 's' : ''}`
                              : 'Découvrir'}
                          </span>
                        </div>
                      </div>
                      <div className="category-card__content">
                        <h3>{palette.title}</h3>
                        <span className="category-card__link">
                          Voir la palette
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </span>
                      </div>
                    </button>
                  ))
                ) : selectedPalette?.info ? (
                  <article className="color-palette-info">
                    {selectedPalette.coverImage && (
                      <div className="color-palette-info__image">
                        <img src={selectedPalette.coverImage} alt={selectedPalette.title} loading="lazy" />
                      </div>
                    )}
                    <div className="color-palette-info__content">
                      <h3>{selectedPalette.title}</h3>
                      <p>{selectedPalette.info}</p>
                      <Link to="/contact" className="btn btn-primary">Demander un devis</Link>
                    </div>
                  </article>
                ) : (
                  selectedPalette?.swatches.map((swatch) => (
                    <figure key={swatch.id} className="color-swatch">
                      <div className="color-swatch__image">
                        <img src={swatch.image} alt={swatch.name} loading="lazy" />
                      </div>
                      <figcaption className="color-swatch__label">{swatch.name}</figcaption>
                    </figure>
                  ))
                )
              ) : (
                filtered.map((product) => (
                  <article
                    key={product.id}
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
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {activeCategory === 'couleurs-poignees' &&
            activePalette &&
            selectedPalette &&
            !selectedPalette.info &&
            selectedPalette.swatches.length > 0 && (
              <p className="color-palette-disclaimer">
                * Ces couleurs sont données à titre indicatif et peuvent présenter certaines
                différences en raison des variations chromatiques de calibration de l'écran.
              </p>
            )}
        </div>
      </section>

      <ContactCTA
        title="Un projet en tête ?"
        description="Fenêtres, baies coulissantes, portes d'entrée, façades, portails ou vérandas — contactez-nous pour un conseil personnalisé et un devis gratuit."
        showCatalogue={false}
      />
    </div>
  );
}
