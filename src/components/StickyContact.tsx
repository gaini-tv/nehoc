import { Link, useLocation } from 'react-router-dom';
import { business } from '../config/site';
import './StickyContact.css';

export default function StickyContact() {
  const { pathname } = useLocation();

  if (pathname === '/contact') return null;

  return (
    <aside className="sticky-contact" aria-label="Contact rapide">
      <a href={`tel:${business.phone}`} className="sticky-contact__item sticky-contact__item--phone">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span className="sticky-contact__label">Appeler</span>
      </a>
      <a href={`mailto:${business.email}`} className="sticky-contact__item sticky-contact__item--email">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="sticky-contact__label">Email</span>
      </a>
      <Link to="/contact" className="sticky-contact__item sticky-contact__item--cta">
        Devis gratuit
      </Link>
    </aside>
  );
}
