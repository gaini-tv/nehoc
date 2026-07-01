import { Link } from 'react-router-dom';
import ContactCTA from '../components/ContactCTA';
import SEO from '../components/SEO';
import { business, legal, pagesSeo } from '../config/site';
import './Legal.css';

export default function MentionsLegales() {
  return (
    <article className="legal-page">
      <SEO seo={pagesSeo.mentionsLegales} />
      <div className="container">
        <span className="section-label">Informations légales</span>
        <h1 className="legal-page__title">Mentions légales</h1>
        <p className="legal-page__updated">Dernière mise à jour : juin 2026</p>

        <div className="legal-content">
          <h2>1. Éditeur du site</h2>
          <p>
            Le site <strong>{legal.siteUrl}</strong> est édité par :<br />
            <strong>{business.legalName}</strong><br />
            {business.address.display}<br />
            Email : <a href={`mailto:${business.email}`}>{business.email}</a><br />
            Téléphone : <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
            {legal.siret && (
              <>
                <br />
                SIRET : {legal.siret}
              </>
            )}
            {legal.rcs && (
              <>
                <br />
                RCS : {legal.rcs}
              </>
            )}
          </p>

          <h2>2. Directeur de la publication</h2>
          <p>{legal.director}</p>

          <h2>3. Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>{legal.host.name}</strong><br />
            {legal.host.address}<br />
            <a href={legal.host.url} rel="noopener noreferrer" target="_blank">
              {legal.host.url}
            </a>
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo, structure)
            est la propriété exclusive de {business.legalName}, sauf mention contraire.
            Toute reproduction, représentation ou diffusion, totale ou partielle,
            sans autorisation écrite préalable est interdite.
          </p>

          <h2>5. Données personnelles</h2>
          <p>
            Pour toute information relative au traitement de vos données personnelles,
            consultez notre{' '}
            <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Ce site utilise un bandeau de consentement vous permettant d'accepter,
            de refuser ou de personnaliser les cookies déposés (essentiels, mesure
            d'audience, marketing). Vous pouvez modifier vos choix à tout moment
            via le lien « Gérer les cookies » en bas de page. Pour plus de détails,
            consultez notre{' '}
            <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
          </p>

          <h2>7. Limitation de responsabilité</h2>
          <p>
            {business.legalName} s'efforce d'assurer l'exactitude des informations
            diffusées sur ce site. Toutefois, elle ne saurait être tenue responsable
            des omissions, inexactitudes ou carences dans la mise à jour,
            qu'elles soient de son fait ou du fait de tiers partenaires.
          </p>
        </div>
      </div>

      <ContactCTA
        variant="compact"
        description="Besoin d'un renseignement ou d'un devis ? Notre équipe est à votre écoute."
        showCatalogue
      />
    </article>
  );
}
