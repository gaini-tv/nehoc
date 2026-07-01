import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SEO from '../components/SEO';
import WindowHero from '../components/WindowHero';
import WindowTextReveal from '../components/WindowTextReveal';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { ParallaxImage } from '../components/ParallaxSection';
import ContactCTA from '../components/ContactCTA';
import { catalogueCategories, catalogueCategoryPath } from '../data/products';
import { images } from '../data/images';
import { pagesSeo } from '../config/site';
import './Home.css';

const stats = [
  {
    id: 'quality',
    label: 'Qualité irréprochable',
    ariaLabel: 'Qualité irréprochable',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M24 5 33 19 47 21 36 32l3 14-15-8-15 8 3-14L1 21l14-2L24 5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'advice',
    label: 'Conseil spécifique',
    ariaLabel: 'Conseil spécifique',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'price',
    label: 'Prix défiant toute concurrence',
    ariaLabel: 'Prix défiant toute concurrence',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M10 10h22l8 8v22H10V10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="21" cy="27" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 27h6M21 24v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Home() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ['start end', 'end start'],
  });

  const showcaseY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <div className="home">
      <SEO seo={pagesSeo.home} />
      <WindowHero />

      <section className="home-philosophy">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Notre vision</span>
          </ScrollReveal>
          <WindowTextReveal className="section-title" as="h2" delay={0.1}>
            La lumière au cœur
            <br />
            <em>de chaque projet</em>
          </WindowTextReveal>

          <div className="home-philosophy__grid">
            <ScrollReveal delay={0.2} direction="left">
              <p className="home-philosophy__text">
                NEHOC, c'est une nouvelle façon de voir les menuiseries.
                Quatre frères ont uni leurs expertises pour créer ce qu'ils
                n'avaient jamais trouvé sur le marché.
              </p>
              <div className="divider" />
              <p className="home-philosophy__text">
                Des matériaux de qualité, un conseil fondé sur le retour
                d'expérience, et une obsession : la luminosité des espaces
                où l'on se sent bien.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="right">
              <div className="home-philosophy__image">
                <ParallaxImage
                  src={images.vitrage}
                  alt="Façade vitrée extérieure"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="home-services">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Expertises</span>
          </ScrollReveal>
          <WindowTextReveal className="section-title" as="h2" delay={0.1}>
            Nos expertises
          </WindowTextReveal>

          <StaggerContainer className="home-services__grid" staggerDelay={0.08}>
            {catalogueCategories.map((category) => (
              <StaggerItem key={category.id}>
                <div className="service-card">
                  <div className="service-card__image">
                    <img src={category.image} alt={category.label} loading="lazy" />
                  </div>
                  <div className="service-card__content">
                    <h3>{category.label}</h3>
                    <p>{category.description}</p>
                    <Link to={catalogueCategoryPath(category.id)} className="service-card__link">
                      Voir la gamme
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="home-showcase" ref={showcaseRef}>
        <motion.div className="home-showcase__image" style={{ y: showcaseY }}>
          <img
            src={images.facade}
            alt="Façade vitrée NEHOC"
          />
        </motion.div>
        <div className="home-showcase__overlay" />
        <div className="container home-showcase__content">
          <ScrollReveal>
            <span className="section-label" style={{ color: 'var(--cream-300)' }}>
              Réalisations
            </span>
          </ScrollReveal>
          <WindowTextReveal
            className="home-showcase__title"
            as="h2"
            variant="light"
            delay={0.15}
          >
            Chaque projet,
            <br />
            une signature
          </WindowTextReveal>
          <ScrollReveal delay={0.3}>
            <p className="home-showcase__text">
              Fenêtres, portes, baies coulissantes, façades, vérandas, garde-corps
              et bien plus — chaque réalisation est pensée pour votre lumière.
            </p>
            <Link to="/catalogue" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Voir le catalogue
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="home-stats">
        <div className="container">
          <StaggerContainer className="home-stats__grid" staggerDelay={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.id}>
                <div className="stat-item">
                  <span className="stat-item__icon" aria-label={stat.ariaLabel}>
                    {stat.icon}
                  </span>
                  <span className="stat-item__label">{stat.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
