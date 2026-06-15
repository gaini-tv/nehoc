import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import WindowTextReveal from '../components/WindowTextReveal';
import ScrollReveal from '../components/ScrollReveal';
import { images } from '../data/images';
import { pagesSeo, business, absoluteUrl } from '../config/site';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    project: 'aluminium',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Contact</span>
            <WindowTextReveal className="contact-hero__title" as="h1" delay={0.2}>
              Parlons de
              <br />
              <em>votre projet</em>
            </WindowTextReveal>
            <p className="section-subtitle">
              Notre équipe vous répond sous 48h pour une première
              consultation gratuite et sans engagement.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-main__grid">
            <ScrollReveal direction="left">
              <div className="contact-info">
                <div className="contact-info__block">
                  <h3>Coordonnées</h3>
                  <p>{business.email}</p>
                </div>

                <div className="contact-info__block">
                  <h3>Adresse</h3>
                  <p>Marseille, 13006</p>
                </div>

                <div className="contact-info__block">
                  <h3>Horaires</h3>
                  <p>Lundi — Vendredi : 8h — 18h</p>
                  <p>Samedi : 9h — 12h</p>
                </div>

                <div className="contact-info__image">
                  <img
                    src={images.architecture}
                    alt="Architecture vitrée extérieure"
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
                    >
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">Nom complet</label>
                          <input
                            id="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Jean Dupont"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            type="email"
                            required
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
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="06 00 00 00 00"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="project">Type de projet</label>
                          <select
                            id="project"
                            value={form.project}
                            onChange={(e) => setForm({ ...form, project: e.target.value })}
                          >
                            <option value="aluminium">Fenêtres aluminium</option>
                            <option value="pvc">Fenêtres PVC</option>
                            <option value="serrurerie">Serrurerie & Métallerie</option>
                            <option value="garde-corps">Garde-corps</option>
                            <option value="ouvrants">Ouvrants motorisés</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Votre message</label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Décrivez votre projet, vos envies, votre espace..."
                        />
                      </div>

                      <button type="submit" className="btn btn-primary contact-form__submit">
                        Envoyer ma demande
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      className="contact-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="contact-success__icon">
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
