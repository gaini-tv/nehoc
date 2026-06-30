import SEO from '../components/SEO';
import { business, legal, pagesSeo } from '../config/site';
import './Legal.css';

export default function PolitiqueConfidentialite() {
  return (
    <article className="legal-page">
      <SEO seo={pagesSeo.politiqueConfidentialite} />
      <div className="container">
        <span className="section-label">Protection des données</span>
        <h1 className="legal-page__title">Politique de confidentialité</h1>
        <p className="legal-page__updated">Dernière mise à jour : juin 2026</p>

        <div className="legal-content">
          <h2>1. Responsable du traitement</h2>
          <p>
            <strong>{business.legalName}</strong><br />
            {business.address.display}<br />
            Email : <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>

          <h2>2. Données collectées</h2>
          <p>Dans le cadre de l'utilisation du site, nous pouvons collecter :</p>
          <ul>
            <li>
              <strong>Formulaire de contact :</strong> nom, adresse email, numéro de téléphone
              (facultatif), type de projet et message.
            </li>
            <li>
              <strong>Données de navigation :</strong> ce site n'utilise pas d'outil
              d'analyse d'audience (Google Analytics, etc.).
            </li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact et de devis</li>
            <li>Vous recontacter dans le cadre de votre projet</li>
            <li>Assurer le bon fonctionnement technique du site</li>
          </ul>

          <h2>4. Base légale</h2>
          <p>
            Le traitement de vos données repose sur votre <strong>consentement</strong>{' '}
            (case cochée lors de l'envoi du formulaire) et sur notre{' '}
            <strong>intérêt légitime</strong> à répondre aux demandes commerciales.
          </p>

          <h2>5. Durée de conservation</h2>
          <p>
            Les données du formulaire de contact sont conservées pendant{' '}
            <strong>3 ans</strong> à compter du dernier échange, sauf obligation
            légale de conservation plus longue.
          </p>

          <h2>6. Destinataires des données</h2>
          <p>
            Vos données sont destinées exclusivement à {business.legalName}.
            Elles ne sont ni vendues, ni louées, ni cédées à des tiers à des fins
            commerciales.
          </p>

          <h2>7. Sous-traitants et transferts</h2>
          <p>Les services tiers suivants peuvent traiter certaines données :</p>
          <ul>
            <li>
              <strong>{legal.host.name}</strong> — hébergement du site ({legal.host.url})
            </li>
            <li>
              <strong>Google Fonts</strong> — chargement des polices typographiques
              (transfert possible vers les États-Unis, encadré par les clauses
              contractuelles types de la Commission européenne)
            </li>
            <li>
              <strong>Unsplash</strong> — images d'illustration chargées depuis
              leur CDN
            </li>
          </ul>

          <h2>8. Cookies</h2>
          <p>
            Lors de votre visite, des cookies peuvent être déposés sur votre
            terminal. Vous pouvez à tout moment accepter, refuser ou personnaliser
            vos préférences via le bandeau cookies ou le lien « Gérer les cookies »
            en bas de page.
          </p>
          <p>Les catégories de cookies utilisées :</p>
          <ul>
            <li>
              <strong>Cookies essentiels</strong> — nécessaires au fonctionnement
              du site (mémorisation de vos choix cookies). Toujours actifs.
            </li>
            <li>
              <strong>Cookies de mesure d'audience</strong> — permettent d'analyser
              la fréquentation du site. Déposés uniquement avec votre consentement.
            </li>
            <li>
              <strong>Cookies marketing</strong> — utilisés pour la publicité
              ciblée. Déposés uniquement avec votre consentement.
            </li>
          </ul>
          <p>
            Vos préférences sont enregistrées localement dans votre navigateur
            pendant 6 mois. Vous pouvez les modifier à tout moment. Pour en savoir
            plus sur vos droits, consultez la section « Vos droits (RGPD) » ci-dessous.
          </p>

          <h2>9. Vos droits (RGPD)</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (« droit à l'oubli »)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d'opposition</li>
            <li>Droit à la portabilité</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à{' '}
            <a href={`mailto:${business.email}`}>{business.email}</a>.
            Vous pouvez également introduire une réclamation auprès de la{' '}
            <a href="https://www.cnil.fr" rel="noopener noreferrer" target="_blank">
              CNIL
            </a>.
          </p>

          <h2>10. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données contre tout accès non autorisé,
            perte ou divulgation.
          </p>

          <h2>11. Modifications</h2>
          <p>
            Cette politique peut être mise à jour. La date de dernière modification
            est indiquée en haut de page. Nous vous invitons à la consulter
            régulièrement.
          </p>
        </div>
      </div>
    </article>
  );
}
