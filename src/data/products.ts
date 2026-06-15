import { images } from './images';

export interface Product {
  id: string;
  title: string;
  category: 'aluminium' | 'pvc' | 'serrurerie' | 'garde-corps' | 'ouvrants';
  description: string;
  image: string;
  features: string[];
}

export const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'aluminium', label: 'Aluminium' },
  { id: 'pvc', label: 'PVC' },
  { id: 'serrurerie', label: 'Serrurerie' },
  { id: 'garde-corps', label: 'Garde-corps' },
  { id: 'ouvrants', label: 'Ouvrants' },
] as const;

export const products: Product[] = [
  {
    id: '1',
    title: 'Fenêtres aluminium haut de gamme',
    category: 'aluminium',
    description: 'Menuiseries aluminium d\'exception à prix compétitifs. Performance thermique, design épuré et durabilité pour sublimer chaque façade.',
    image: images.fenetreAlu,
    features: ['Haut de gamme', 'Prix compétitifs', 'Tous coloris'],
  },
  {
    id: '2',
    title: 'Fenêtres PVC',
    category: 'pvc',
    description: 'Fenêtres PVC performantes et accessibles. Excellente isolation, entretien minimal et large choix de finitions pour tous les projets.',
    image: images.fenetrePvc,
    features: ['Isolation renforcée', 'Entretien facile', 'Sur mesure'],
  },
  {
    id: '3',
    title: 'Porte d\'entrée alu & verre',
    category: 'serrurerie',
    description: 'Portes d\'entrée alliant aluminium et verre pour une luminosité maximale. Sécurité, design et personnalisation au service de votre habitat.',
    image: images.porteEntree,
    features: ['Alu & verre', 'Haute sécurité', 'Design sur mesure'],
  },
  {
    id: '4',
    title: 'Porte de garage',
    category: 'serrurerie',
    description: 'Portes de garage sectionnelles, basculantes ou enroulables. Motorisation silencieuse et finitions coordonnées à votre menuiserie.',
    image: images.porteGarage,
    features: ['Motorisation', 'Isolation thermique', 'Finitions assorties'],
  },
  {
    id: '5',
    title: 'Garde-corps alu & verre',
    category: 'garde-corps',
    description: 'Garde-corps en aluminium et verre pour balcons, terrasses et escaliers. Transparence et sécurité sans compromis sur l\'esthétique.',
    image: images.gardeCorps,
    features: ['Alu & verre', 'Normes NF', 'Sur mesure'],
  },
  {
    id: '6',
    title: 'Fenêtres ouvrantes motorisées',
    category: 'ouvrants',
    description: 'Ouvrants motorisés, à galandage ou encastrés. Tous coloris et toutes finitions pour une ouverture sur mesure, en toute simplicité.',
    image: images.ouvrant,
    features: ['Motorisé', 'Galandage & encastré', 'Toutes finitions'],
  },
];
