import { Link } from 'react-router-dom';
import { business } from '../config/site';
import { catalogueCategories, catalogueCategoryPath } from '../data/products';
import { useCookieConsent } from '../context/CookieConsentContext';
import Logo from './Logo';
import './Logo.css';
import './Footer.css';

export default function Footer() {
  const { openSettings } = useCookieConsent();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" aria-label="NEHOC — Retour à l'accueil">
              <Logo variant="black" className="logo--footer" />
            </Link>
            <p className="footer__tagline">
              Une nouvelle façon de voir les menuiseries.
              Qualité, conseil et luminosité pour chaque espace.
            </p>
          </div>

          <nav className="footer__col" aria-label="Navigation principale">
            <p className="footer__col-title">Navigation</p>
            <Link to="/">Accueil</Link>
            <Link to="/a-propos">À propos</Link>
            <Link to="/catalogue">Catalogue</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <nav className="footer__col footer__col--categories" aria-label="Catégories du catalogue">
            <p className="footer__col-title">Expertises</p>
            {catalogueCategories.map((category) => (
              <Link key={category.id} to={catalogueCategoryPath(category.id)}>
                {category.label}
              </Link>
            ))}
          </nav>

          <div className="footer__col">
            <p className="footer__col-title">Contact</p>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
            <span>{business.address.display}</span>
          </div>
        </div>

        <nav className="footer__legal" aria-label="Informations légales">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>
          <button type="button" className="footer__legal-btn" onClick={openSettings}>
            Gérer les cookies
          </button>
        </nav>

        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} NEHOC. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
}
