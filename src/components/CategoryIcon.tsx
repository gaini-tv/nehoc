import type { CategoryId } from '../data/catalogue-products';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export default function CategoryIcon({ id }: { id: CategoryId }) {
  switch (id) {
    case 'fenetres':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="6" y="8" width="20" height="18" rx="1" />
          <path {...stroke} d="M16 8v18M6 17h20" />
        </svg>
      );
    case 'portes-fenetres':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="5" y="7" width="22" height="20" rx="1" />
          <path {...stroke} d="M16 7v20M5 16h22" />
          <circle {...stroke} cx="20" cy="16" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'portes':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="9" y="5" width="14" height="24" rx="1" />
          <circle {...stroke} cx="19" cy="17" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'baies-coulissantes':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="4" y="9" width="24" height="16" rx="1" />
          <path {...stroke} d="M12 9v16M20 9v16" />
          <path {...stroke} d="M22 17h4M6 17H2" />
        </svg>
      );
    case 'portes-entree':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M8 5h16v24H8z" />
          <path {...stroke} d="M8 5l16 12-16 12" />
          <circle {...stroke} cx="18" cy="17" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'pvc':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="7" y="8" width="18" height="18" rx="1" />
          <path {...stroke} d="M7 14h18M7 20h18M13 8v18M19 8v18" />
        </svg>
      );
    case 'facades':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M6 26V12l10-6 10 6v14" />
          <rect {...stroke} x="12" y="16" width="8" height="10" />
          <path {...stroke} d="M10 12h12" />
        </svg>
      );
    case 'portails-clotures':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M5 24V12l6-4 6 4v12M17 24V12l6-4 6 4v12" />
          <path {...stroke} d="M5 24h24" />
        </svg>
      );
    case 'carports-pergolas':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M4 14l12-6 12 6" />
          <path {...stroke} d="M8 14v10M24 14v10M16 8v16" />
        </svg>
      );
    case 'verandas':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M4 18h24" />
          <path {...stroke} d="M6 18V10l10-5 10 5v8" />
          <rect {...stroke} x="10" y="18" width="12" height="8" />
        </svg>
      );
    case 'verrieres':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M6 8h20v16H6z" />
          <path {...stroke} d="M6 14h20M16 8v16" />
        </svg>
      );
    case 'volets-brise-soleil':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="6" y="8" width="20" height="18" rx="1" />
          <path {...stroke} d="M8 12h16M8 16h16M8 20h16M8 24h16" />
        </svg>
      );
    case 'garde-corps':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M6 22h20M8 22V12M24 22V12" />
          <path {...stroke} d="M8 12h16M10 12v10M16 12v10M22 12v10" />
        </svg>
      );
    case 'bardages':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="6" y="6" width="20" height="20" rx="1" />
          <path {...stroke} d="M6 12h20M6 18h20M14 6v20M20 6v20" />
        </svg>
      );
    case 'division-espaces':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M6 8h20v16H6z" />
          <path {...stroke} d="M16 8v16" />
          <path {...stroke} d="M18 16h6" />
        </svg>
      );
    case 'protection-incendie':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...stroke} d="M16 6c-4 4-6 7-6 11a6 6 0 1 0 12 0c0-4-2-7-6-11z" />
          <path {...stroke} d="M16 14v6" />
        </svg>
      );
    case 'panneaux-injectes':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="5" y="9" width="22" height="14" rx="1" />
          <path {...stroke} d="M9 13h14M9 17h10M9 21h6" />
        </svg>
      );
    case 'couleurs-poignees':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle {...stroke} cx="11" cy="14" r="5" />
          <circle {...stroke} cx="21" cy="18" r="5" />
          <path {...stroke} d="M22 20h6v3h-6z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect {...stroke} x="8" y="8" width="16" height="16" rx="2" />
        </svg>
      );
  }
}
