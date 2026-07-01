import { categoryImages } from './images';
import { catalogueProducts, categoryMeta, type CategoryId } from './catalogue-products';

export type { CategoryId, Product } from './catalogue-products';

export interface CatalogueCategory {
  id: CategoryId;
  label: string;
  description: string;
  image: string;
}

export const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'fenetres', label: 'Fenêtres' },
  { id: 'portes-fenetres', label: 'Portes-fenêtres' },
  { id: 'portes', label: 'Portes' },
  { id: 'baies-coulissantes', label: 'Baies coulissantes' },
  { id: 'portes-entree', label: 'Portes d\'entrée' },
  { id: 'pvc', label: 'PVC' },
  { id: 'facades', label: 'Façades' },
  { id: 'portails-clotures', label: 'Portails & clôtures' },
  { id: 'carports-pergolas', label: 'Carports & pergolas' },
  { id: 'verandas', label: 'Vérandas' },
  { id: 'verrieres', label: 'Verrières' },
  { id: 'volets-brise-soleil', label: 'Volets & brise-soleil' },
  { id: 'garde-corps', label: 'Garde-corps' },
  { id: 'bardages', label: 'Bardages' },
  { id: 'division-espaces', label: 'Division des espaces' },
  { id: 'protection-incendie', label: 'Protection incendie' },
  { id: 'panneaux-injectes', label: 'Panneaux injectés' },
  { id: 'couleurs-poignees', label: 'Couleurs & poignées' },
] as const;

export const catalogueCategories: CatalogueCategory[] = categories
  .filter((cat) => cat.id !== 'all')
  .map((cat) => ({
    id: cat.id as CategoryId,
    label: cat.label,
    description: categoryMeta[cat.id as CategoryId].description,
    image: categoryImages[cat.id],
  }));

export function catalogueCategoryPath(id: string) {
  return id === 'all' ? '/catalogue' : `/catalogue?category=${id}`;
}

export const products = catalogueProducts;
