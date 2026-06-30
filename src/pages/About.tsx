import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SEO from '../components/SEO';
import WindowTextReveal from '../components/WindowTextReveal';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { ParallaxImage } from '../components/ParallaxSection';
import { images } from '../data/images';
import { pagesSeo } from '../config/site';
import './About.css';

const brothers = [
  { number: 'I', role: 'Vision & matériaux' },
  { number: 'II', role: 'Design & habitat' },
  { number: 'III', role: 'Conseil & expérience' },
  { number: 'IV', role: 'Qualité & luminosité' },
];

const values = [
  {
    title: 'Qualité',
    description: 'Des menuiseries haut de gamme sélectionnées avec exigence, pour une durabilité et une finition irréprochables sur chaque chantier.',
  },
  {
    title: 'Conseil',
    description: 'Un accompagnement fondé sur le retour d\'expérience : coloris, matières et configurations au service de la luminosité de vos espaces.',
  },
  {
    title: 'Luminosité',
    description: 'Chaque projet est pensé pour maximiser la lumière naturelle et créer des intérieurs où l\'on se sent bien, jour après jour.',
  },
  {
    title: 'Sur mesure',
    description: 'Tous coloris, toutes finitions, toutes configurations — motorisé, à galandage ou encastré — adaptés à votre habitat.',
  },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="about">
      <SEO seo={pagesSeo.about} />
      <section className="about-hero" ref={heroRef}>
        <motion.div className="about-hero__bg" style={{ scale: heroScale, y: heroY }}>
          <img
            src={images.hero}
            alt="Façade vitrée NEHOC"
          />
        </motion.div>
        <motion.div className="about-hero__overlay" style={{ opacity: heroOpacity }} />
        <div className="container about-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label" style={{ color: 'var(--cream-300)' }}>À propos</span>
            <WindowTextReveal
              className="about-hero__title"
              as="h1"
              variant="light"
              delay={0.4}
            >
              Quatre frères,
              <br />
              <em>une vision</em>
            </WindowTextReveal>
          </motion.div>
        </div>
      </section>

      <section className="about-intro">
        <div className="container">
          <div className="about-intro__grid">
            <ScrollReveal direction="left">
              <WindowTextReveal className="section-title" as="h2" delay={0.1}>
                Une histoire de
                <br />
                <em>passion & exigence</em>
              </WindowTextReveal>
              <div className="divider" />
              <p className="about-intro__text">
                Passionnés par les matériaux et le design des habitations,
                les quatre frères fondateurs de NEHOC ont mis leurs forces en
                commun pour donner lieu à ce qu'ils n'avaient jamais trouvé sur
                le marché.
              </p>
              <p className="about-intro__text">
                Une société fournissant des matériaux de menuiseries de qualité
                et un conseil fondé sur le retour d'expérience — les coloris et
                matières employés au service de la luminosité des espaces.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="about-intro__image">
                <ParallaxImage
                  src={images.baieVitree}
                  alt="Baie vitrée extérieure"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="about-brothers">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Les fondateurs</span>
          </ScrollReveal>
          <WindowTextReveal className="section-title" as="h2" delay={0.1}>
            Les 4 frères
          </WindowTextReveal>
          <ScrollReveal delay={0.3}>
            <p className="section-subtitle">
              Quatre parcours complémentaires, une même exigence : offrir ce que
              le marché ne proposait pas — qualité, conseil et lumière.
            </p>
          </ScrollReveal>

          <StaggerContainer className="about-brothers__grid" staggerDelay={0.1}>
            {brothers.map((brother) => (
              <StaggerItem key={brother.number}>
                <div className="brother-card">
                  <span className="brother-card__number">{brother.number}</span>
                  <p className="brother-card__role">{brother.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="about-manifesto">
        <div className="container">
          <WindowTextReveal
            className="about-manifesto__quote window-text-reveal--block"
            as="blockquote"
            delay={0.15}
          >
            <p>
              NEHOC, c'est une nouvelle façon de voir les menuiseries —
              comme une nouvelle façon de se sentir bien dans les espaces
              de lumière.
            </p>
            <footer>— Les fondateurs de NEHOC</footer>
          </WindowTextReveal>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Nos engagements</span>
          </ScrollReveal>
          <WindowTextReveal className="section-title" as="h2" delay={0.1}>
            Ce qui nous distingue
          </WindowTextReveal>

          <StaggerContainer className="about-values__grid" staggerDelay={0.12}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="value-card">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
