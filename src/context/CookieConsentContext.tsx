import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  COOKIE_CONSENT_KEY,
  defaultPreferences,
  parseStoredConsent,
  type CookiePreferences,
} from '../config/cookies';

interface CookieConsentContextValue {
  preferences: CookiePreferences;
  hasChosen: boolean;
  showBanner: boolean;
  showSettings: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Pick<CookiePreferences, 'analytics' | 'marketing'>) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function persist(preferences: CookiePreferences) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasChosen, setHasChosen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = parseStoredConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
    if (stored) {
      setPreferences(stored);
      setHasChosen(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  const apply = useCallback((next: CookiePreferences) => {
    const withMeta: CookiePreferences = {
      ...next,
      necessary: true,
      timestamp: new Date().toISOString(),
    };
    setPreferences(withMeta);
    setHasChosen(true);
    setShowBanner(false);
    setShowSettings(false);
    persist(withMeta);
  }, []);

  const acceptAll = useCallback(() => {
    apply({ necessary: true, analytics: true, marketing: true, timestamp: '' });
  }, [apply]);

  const rejectAll = useCallback(() => {
    apply({ necessary: true, analytics: false, marketing: false, timestamp: '' });
  }, [apply]);

  const savePreferences = useCallback(
    (prefs: Pick<CookiePreferences, 'analytics' | 'marketing'>) => {
      apply({ necessary: true, ...prefs, timestamp: '' });
    },
    [apply],
  );

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowBanner(false);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    if (!hasChosen) setShowBanner(true);
  }, [hasChosen]);

  const value = useMemo(
    () => ({
      preferences,
      hasChosen,
      showBanner,
      showSettings,
      acceptAll,
      rejectAll,
      savePreferences,
      openSettings,
      closeSettings,
    }),
    [
      preferences,
      hasChosen,
      showBanner,
      showSettings,
      acceptAll,
      rejectAll,
      savePreferences,
      openSettings,
      closeSettings,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return ctx;
}
