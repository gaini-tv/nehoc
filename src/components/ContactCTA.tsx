import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import WindowTextReveal from './WindowTextReveal';
import { business } from '../config/site';
import './ContactCTA.css';

interface ContactCTAProps {
  title?: React.ReactNode;
  description?: string;
  variant?: 'default' | 'compact';
  showCatalogue?: boolean;
  className?: string;
}

export default function ContactCTA({
  title,
  description = 'Notre équipe vous conseille sur les coloris, matières et configurations adaptés à votre projet. Devis gratuit sous 48h.',
  variant = 'default',
  showCatalogue = true,
  className = '',
}: ContactCTAProps) {
  const isCompact = variant === 'compact';

  return (
    <section
      className={`contact-cta contact-cta--${variant} ${className}`.trim()}
      aria-label="Nous contacter"
    >
      <div className="container">
        <div className="contact-cta__inner">
          {isCompact ? (
            <h2 className="contact-cta__title contact-cta__title--compact">
              {title ?? 'Une question sur votre projet ?'}
            </h2>
          ) : (
            <WindowTextReveal className="contact-cta__title" as="h2" delay={0.1}>
              {title ?? (
                <>
                  Prêt à ouvrir
                  <br />
                  <em>votre projet ?</em>
                </>
              )}
            </WindowTextReveal>
          )}

          <ScrollReveal delay={isCompact ? 0 : 0.3}>
            <p className="contact-cta__text">{description}</p>
            <div className="contact-cta__actions">
              <Link to="/contact" className="btn btn-primary">
                Demander un devis
              </Link>
              <a href={`tel:${business.phone}`} className="btn btn-outline">
                {business.phoneDisplay}
              </a>
              {showCatalogue && (
                <Link to="/catalogue" className="btn btn-outline">
                  Voir le catalogue
                </Link>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
