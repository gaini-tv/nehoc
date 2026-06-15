import { Link } from 'react-router-dom';
import { business } from '../config/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" itemScope itemType="https://schema.org/HomeAndConstructionBusiness">
      <meta itemProp="name" content={business.name} />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__logo">NEHOC</span>
            <p className="footer__tagline">
              Une nouvelle façon de voir les menuiseries.
              Qualité, conseil et luminosité pour chaque espace.
            </p>
          </div>

          <div className="footer__col">
            <h4>Navigation</h4>
            <Link to="/">Accueil</Link>
            <Link to="/a-propos">À propos</Link>
            <Link to="/catalogue">Catalogue</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <h4>Expertises</h4>
            <span>Fenêtres aluminium</span>
            <span>Fenêtres PVC</span>
            <span>Serrurerie & Métallerie</span>
            <span>Garde-corps alu & verre</span>
            <span>Ouvrants motorisés</span>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <a href={`mailto:${business.email}`} itemProp="email">{business.email}</a>
            <span itemProp="areaServed">Marseille &amp; PACA</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} NEHOC. Tous droits réservés.</span>
          <span className="footer__crafted">Façonné avec précision</span>
        </div>
      </div>
    </footer>
  );
}
