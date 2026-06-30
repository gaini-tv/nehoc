export type CookieCategory = 'necessary' | 'analytics' | 'marketing';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const COOKIE_CONSENT_KEY = 'nehoc-cookie-consent';

export const cookieCategories: {
  id: CookieCategory;
  label: string;
  description: string;
  required: boolean;
}[] = [
  {
    id: 'necessary',
    label: 'Cookies essentiels',
    description:
      'Indispensables au fonctionnement du site (mémorisation de vos préférences cookies, sécurité). Ils ne peuvent pas être désactivés.',
    required: true,
  },
  {
    id: 'analytics',
    label: 'Cookies de mesure d\'audience',
    description:
      'Nous permettent de comprendre comment le site est utilisé (pages visitées, durée de visite) afin d\'améliorer l\'expérience.',
    required: false,
  },
  {
    id: 'marketing',
    label: 'Cookies marketing',
    description:
      'Utilisés pour proposer des contenus ou publicités adaptés à vos centres d\'intérêt sur d\'autres sites.',
    required: false,
  },
];

export const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: '',
};

export function parseStoredConsent(raw: string | null): CookiePreferences | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CookiePreferences;
    if (typeof parsed.necessary !== 'boolean') return null;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      timestamp: parsed.timestamp ?? '',
    };
  } catch {
    return null;
  }
}
