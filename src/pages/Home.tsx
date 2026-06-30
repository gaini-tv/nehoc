import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SEO from '../components/SEO';
import WindowHero from '../components/WindowHero';
import WindowTextReveal from '../components/WindowTextReveal';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { ParallaxImage } from '../components/ParallaxSection';
import { images } from '../data/images';
import { pagesSeo } from '../config/site';
import './Home.css';

const services = [
  {
    title: 'Fenêtres aluminium',
    description: 'Haut de gamme à prix compétitifs. Performance, design et durabilité pour chaque façade.',
    image: images.fenetreAlu,
  },
  {
    title: 'Fenêtres PVC',
    description: 'Isolation renforcée et entretien minimal. Un excellent rapport qualité-prix pour tous les projets.',
    image: images.fenetrePvc,
  },
  {
    title: 'Serrurerie & Métallerie',
    description: 'Portes d\'entrée alu et verre, portes de garage. Sécurité et esthétique réunies.',
    image: images.porteEntree,
  },
  {
    title: 'Garde-corps',
    description: 'Aluminium et verre pour balcons, terrasses et escaliers. Transparence et sécurité.',
    image: images.gardeCorps,
  },
  {
    title: 'Ouvrants motorisés',
    description: 'À galandage ou encastrés, tous coloris et toutes finitions. L\'ouverture sur mesure.',
    image: images.ouvrant,
  },
];

const stats = [
  { value: '4', label: 'Frères fondateurs' },
  { value: '100%', label: 'Sur mesure' },
  { value: '∞', label: 'Coloris & finitions', ariaLabel: 'Infini — Coloris et finitions' },
  { value: '★', label: 'Prix compétitifs', ariaLabel: 'Prix compétitifs' },
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

          <StaggerContainer className="home-services__grid" staggerDelay={0.15}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="service-card">
                  <div className="service-card__image">
                    <img src={service.image} alt={service.title} loading="lazy" />
                  </div>
                  <div className="service-card__content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link to="/catalogue" className="service-card__link">
                      Explorer le catalogue
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
              Fenêtres aluminium, PVC, portes d'entrée, garde-corps et ouvrants
              motorisés — chaque réalisation est pensée pour votre lumière.
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
              <StaggerItem key={stat.label}>
                <div className="stat-item">
                  <span className="stat-item__value" aria-label={stat.ariaLabel}>{stat.value}</span>
                  <span className="stat-item__label">{stat.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="home-cta__inner">
            <WindowTextReveal className="home-cta__title" as="h2" delay={0.1}>
              Prêt à ouvrir
              <br />
              <em>votre projet ?</em>
            </WindowTextReveal>
            <ScrollReveal delay={0.4}>
              <p className="home-cta__text">
                Notre équipe vous conseille sur les coloris, matières et
                configurations adaptés à votre projet. Devis gratuit sous 48h.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Demander un devis
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
