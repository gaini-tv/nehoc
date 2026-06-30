import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cookieCategories } from '../config/cookies';
import { useCookieConsent } from '../context/CookieConsentContext';
import './CookieNotice.css';

export default function CookieNotice() {
  const {
    preferences,
    showBanner,
    showSettings,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
  } = useCookieConsent();

  const [draft, setDraft] = useState({
    analytics: preferences.analytics,
    marketing: preferences.marketing,
  });

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSettings) {
      setDraft({
        analytics: preferences.analytics,
        marketing: preferences.marketing,
      });
    }
  }, [showSettings, preferences.analytics, preferences.marketing]);

  useEffect(() => {
    if (!showSettings) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSettings();
    };

    document.addEventListener('keydown', handleKeyDown);
    panelRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSettings, closeSettings]);

  if (!showBanner && !showSettings) return null;

  const handleSave = () => {
    savePreferences(draft);
  };

  return (
    <>
      {showSettings && (
        <div
          className="cookie-overlay"
          onClick={closeSettings}
          aria-hidden="true"
        />
      )}

      {showBanner && (
        <aside
          className="cookie-notice"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
        >
          <div className="cookie-notice__inner container">
            <div className="cookie-notice__content">
              <p id="cookie-banner-title" className="cookie-notice__title">
                Gestion des cookies
              </p>
              <p id="cookie-banner-desc" className="cookie-notice__text">
                Nous utilisons des cookies pour assurer le bon fonctionnement du site
                et, avec votre accord, pour mesurer l'audience et personnaliser
                votre expérience.{' '}
                <Link to="/politique-de-confidentialite">En savoir plus</Link>
              </p>
            </div>
            <div className="cookie-notice__actions">
              <button
                type="button"
                className="btn btn-outline cookie-notice__btn"
                onClick={rejectAll}
              >
                Tout refuser
              </button>
              <button
                type="button"
                className="btn btn-outline cookie-notice__btn"
                onClick={openSettings}
              >
                Personnaliser
              </button>
              <button
                type="button"
                className="btn btn-primary cookie-notice__btn"
                onClick={acceptAll}
              >
                Tout accepter
              </button>
            </div>
          </div>
        </aside>
      )}

      {showSettings && (
        <div
          ref={panelRef}
          className="cookie-settings"
          role="dialog"
          aria-labelledby="cookie-settings-title"
          aria-modal="true"
          tabIndex={-1}
        >
          <div className="cookie-settings__header">
            <p id="cookie-settings-title" className="cookie-settings__title">
              Préférences cookies
            </p>
            <button
              type="button"
              className="cookie-settings__close"
              onClick={closeSettings}
              aria-label="Fermer les préférences cookies"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <p className="cookie-settings__intro">
            Choisissez les cookies que vous autorisez. Les cookies essentiels sont
            toujours actifs car nécessaires au fonctionnement du site.
          </p>

          <ul className="cookie-settings__list">
            {cookieCategories.map((category) => {
              const isRequired = category.required;
              const checked = isRequired
                ? true
                : draft[category.id as 'analytics' | 'marketing'];

              return (
                <li key={category.id} className="cookie-settings__item">
                  <div className="cookie-settings__item-header">
                    <label
                      className={`cookie-settings__label${isRequired ? ' cookie-settings__label--disabled' : ''}`}
                      htmlFor={`cookie-${category.id}`}
                    >
                      <input
                        id={`cookie-${category.id}`}
                        type="checkbox"
                        checked={checked}
                        disabled={isRequired}
                        onChange={(e) => {
                          if (isRequired) return;
                          setDraft((prev) => ({
                            ...prev,
                            [category.id]: e.target.checked,
                          }));
                        }}
                      />
                      <span>{category.label}</span>
                      {isRequired && (
                        <span className="cookie-settings__badge">Toujours actif</span>
                      )}
                    </label>
                  </div>
                  <p className="cookie-settings__description">{category.description}</p>
                </li>
              );
            })}
          </ul>

          <div className="cookie-settings__actions">
            <button
              type="button"
              className="btn btn-outline cookie-settings__btn"
              onClick={rejectAll}
            >
              Tout refuser
            </button>
            <button
              type="button"
              className="btn btn-primary cookie-settings__btn"
              onClick={handleSave}
            >
              Enregistrer mes choix
            </button>
          </div>
        </div>
      )}
    </>
  );
}
