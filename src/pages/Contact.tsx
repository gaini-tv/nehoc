import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import WindowTextReveal from '../components/WindowTextReveal';
import ScrollReveal from '../components/ScrollReveal';
import { images } from '../data/images';
import { pagesSeo, business, absoluteUrl } from '../config/site';
import { catalogueCategories } from '../data/products';
import { supplierCatalogues } from '../data/supplier-catalogues';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    project: catalogueCategories[0]?.id ?? 'fenetres',
    message: '',
  } as {
    name: string;
    email: string;
    phone: string;
    project: string;
    message: string;
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact NEHOC',
    description: pagesSeo.contact.description,
    url: absoluteUrl('/contact'),
    mainEntity: { '@id': `${absoluteUrl('/')}#organization` },
  };

  return (
    <div className="contact">
      <SEO seo={pagesSeo.contact} jsonLd={contactSchema} />
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Contact</span>
            <WindowTextReveal className="contact-hero__title" as="h1" delay={0.2}>
              <span id="contact-title">
                Parlons de
                <br />
                <em>votre projet</em>
              </span>
            </WindowTextReveal>
            <p className="section-subtitle">
              Notre équipe vous répond sous 48h pour une première
              consultation gratuite et sans engagement.
            </p>
            <div className="contact-hero__actions">
              <a href={`tel:${business.phone}`} className="btn btn-primary">
                {business.phoneDisplay}
              </a>
              <Link to="/catalogue" className="btn btn-outline">
                Voir le catalogue
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="contact-catalogues" aria-labelledby="catalogues-title">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Documentation</span>
            <h2 id="catalogues-title" className="contact-catalogues__title">
              Télécharger les catalogues
            </h2>
            <p className="contact-catalogues__intro">
              Brochures officielles de nos fournisseurs — formats PDF lorsque disponibles.
            </p>
          </ScrollReveal>

          <div className="contact-catalogues__grid">
            {supplierCatalogues.map((catalogue, index) => (
              <ScrollReveal key={catalogue.id} delay={0.08 * index}>
                <article className="catalogue-card">
                  <span className="catalogue-card__brand">{catalogue.brand}</span>
                  <h3 className="catalogue-card__title">{catalogue.title}</h3>
                  <p className="catalogue-card__text">{catalogue.description}</p>
                  {catalogue.pdfUrl ? (
                    <a
                      href={catalogue.pdfUrl}
                      className="catalogue-card__btn"
                      download={catalogue.fileLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path
                          d="M9 2v9M9 11l3.5-3.5M9 11 5.5 7.5M3 14h12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Télécharger le PDF
                    </a>
                  ) : (
                    <a
                      href={catalogue.onlineUrl}
                      className="catalogue-card__btn catalogue-card__btn--outline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path
                          d="M7 3H3v12h12V9M10 2h6v6M8 10l8-8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Voir le catalogue en ligne
                    </a>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-main" aria-label="Formulaire de contact">
        <div className="container">
          <div className="contact-main__grid">
            <ScrollReveal direction="left">
              <div className="contact-info">
                <div className="contact-info__block">
                  <h2 className="contact-info__heading">Coordonnées</h2>
                  <p>
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  </p>
                  <p>
                    <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
                  </p>
                </div>

                <div className="contact-info__block">
                  <h2 className="contact-info__heading">Adresse</h2>
                  <p>{business.address.display}</p>
                </div>

                <div className="contact-info__block">
                  <h2 className="contact-info__heading">Horaires</h2>
                  <p>Lundi — Vendredi : 8h — 18h</p>
                  <p>Samedi : 9h — 12h</p>
                </div>

                <div className="contact-info__image">
                  <img
                    src={images.architecture}
                    alt="Façade vitrée extérieure — réalisation menuiserie"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <div className="contact-form-wrapper">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      className="contact-form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      noValidate
                    >
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">Nom complet <span aria-hidden="true">*</span></label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Jean Dupont"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="jean@exemple.fr"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="phone">Téléphone</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="06 00 00 00 00"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="project">Type de projet</label>
                          <select
                            id="project"
                            name="project"
                            value={form.project}
                            onChange={(e) => setForm({ ...form, project: e.target.value })}
                          >
                            {catalogueCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.label}
                              </option>
                            ))}
                            <option value="autre">Autre / Plusieurs catégories</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Votre message <span aria-hidden="true">*</span></label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Décrivez votre projet, vos envies, votre espace..."
                        />
                      </div>

                      <div className="form-group form-group--consent">
                        <label className="consent-label">
                          <input
                            type="checkbox"
                            name="consent"
                            required
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                          />
                          <span>
                            J'accepte que mes données personnelles soient traitées
                            par NEHOC pour répondre à ma demande, conformément à la{' '}
                            <Link to="/politique-de-confidentialite">
                              politique de confidentialité
                            </Link>.
                            <span className="sr-only"> (obligatoire)</span>
                          </span>
                        </label>
                      </div>

                      <button type="submit" className="btn btn-primary contact-form__submit">
                        Envoyer ma demande
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      className="contact-success"
                      role="status"
                      aria-live="polite"
                      aria-atomic="true"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="contact-success__icon" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" />
                          <path d="M14 24l7 7 13-14" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>
                      <h2>Message envoyé</h2>
                      <p>
                        Merci pour votre confiance. Notre équipe vous contactera
                        très prochainement pour discuter de votre projet.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
