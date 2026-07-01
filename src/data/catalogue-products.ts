import { categoryImages } from './images';
import { productImages } from './product-images';

export type CategoryId =
  | 'fenetres'
  | 'portes-fenetres'
  | 'portes'
  | 'baies-coulissantes'
  | 'portes-entree'
  | 'pvc'
  | 'facades'
  | 'portails-clotures'
  | 'carports-pergolas'
  | 'verandas'
  | 'verrieres'
  | 'volets-brise-soleil'
  | 'garde-corps'
  | 'bardages'
  | 'division-espaces'
  | 'protection-incendie'
  | 'panneaux-injectes'
  | 'couleurs-poignees';

export interface Product {
  id: string;
  title: string;
  category: CategoryId;
  description: string;
  image: string;
  features: string[];
}

type CatalogueEntry = [slug: string, title: string, features?: string[]];

export const categoryMeta: Record<CategoryId, { description: string; defaultFeatures: string[] }> = {
  fenetres: {
    description: 'Fenêtre en aluminium sur mesure. Performance thermique, étanchéité et finitions haut de gamme.',
    defaultFeatures: ['Aluminium', 'Sur mesure', 'Haute performance'],
  },
  'portes-fenetres': {
    description: 'Porte-fenêtre et porte battante en aluminium. Ouverture généreuse et luminosité maximale.',
    defaultFeatures: ['Battante', 'Aluminium', 'Sur mesure'],
  },
  portes: {
    description: 'Porte en aluminium pour accès intérieurs et extérieurs. Sécurité, design et personnalisation.',
    defaultFeatures: ['Aluminium', 'Sécurité', 'Sur mesure'],
  },
  'baies-coulissantes': {
    description: 'Système coulissant en aluminium pour grandes ouvertures vitrées. Fluidité et étanchéité.',
    defaultFeatures: ['Coulissant', 'Grandes dimensions', 'Sur mesure'],
  },
  'portes-entree': {
    description: 'Porte d\'entrée en aluminium. Sécurité, isolation et design pour votre habitat.',
    defaultFeatures: ['Entrée', 'Sécurité', 'Sur mesure'],
  },
  pvc: {
    description: 'Menuiserie PVC performante. Excellente isolation et entretien minimal.',
    defaultFeatures: ['PVC', 'Isolation', 'Sur mesure'],
  },
  facades: {
    description: 'Façade légère en aluminium et verre. Architecture contemporaine et performance.',
    defaultFeatures: ['Façade légère', 'Alu & verre', 'Sur mesure'],
  },
  'portails-clotures': {
    description: 'Portail ou clôture en aluminium sur mesure. Motorisation et design personnalisé.',
    defaultFeatures: ['Extérieur', 'Aluminium', 'Sur mesure'],
  },
  'carports-pergolas': {
    description: 'Carport ou pergola en aluminium. Confort extérieur et protection durable.',
    defaultFeatures: ['Extérieur', 'Aluminium', 'Sur mesure'],
  },
  verandas: {
    description: 'Véranda en aluminium pour agrandir votre espace de vie en lumière.',
    defaultFeatures: ['Extension', 'Luminosité', 'Sur mesure'],
  },
  verrieres: {
    description: 'Verrière en aluminium pour structurer et éclairer vos espaces intérieurs.',
    defaultFeatures: ['Intérieur', 'Luminosité', 'Sur mesure'],
  },
  'volets-brise-soleil': {
    description: 'Protection solaire en aluminium. Confort thermique et gestion de la lumière.',
    defaultFeatures: ['Protection solaire', 'Aluminium', 'Sur mesure'],
  },
  'garde-corps': {
    description: 'Garde-corps en aluminium et verre. Sécurité et transparence pour vos extérieurs.',
    defaultFeatures: ['Alu & verre', 'Normes NF', 'Sur mesure'],
  },
  bardages: {
    description: 'Bardage aluminium pour habillage et protection de façade.',
    defaultFeatures: ['Façade', 'Protection', 'Tous coloris'],
  },
  'division-espaces': {
    description: 'Cloison vitrée intérieure en aluminium. Modularité, lumière et acoustique.',
    defaultFeatures: ['Cloison vitrée', 'Modularité', 'Sur mesure'],
  },
  'protection-incendie': {
    description: 'Menuiserie coupe-feu et étanche aux fumées. Conformité réglementaire.',
    defaultFeatures: ['Coupe-feu', 'Sécurité', 'Conformité'],
  },
  'panneaux-injectes': {
    description: 'Panneau injecté pour portes et menuiseries. Isolation et rigidité renforcées.',
    defaultFeatures: ['Isolation', 'Rigidité', 'Sur mesure'],
  },
  'couleurs-poignees': {
    description: 'Finitions, coloris et accessoires pour personnaliser vos menuiseries.',
    defaultFeatures: ['Personnalisation', 'Design', 'Toutes gammes'],
  },
};

function buildProducts(
  category: CategoryId,
  entries: CatalogueEntry[],
  image?: string,
): Product[] {
  const meta = categoryMeta[category];
  const img = image ?? categoryImages[category];

  return entries.map(([slug, title, features]) => ({
    id: slug,
    title,
    category,
    description: `${title} — ${meta.description}`,
    image: productImages[slug] ?? img,
    features: features ?? meta.defaultFeatures,
  }));
}

const fenetres = buildProducts('fenetres', [
  ['fen-ov70', 'Fenêtre aluminium OV 70 – châssis apparent', ['Châssis apparent', 'Profil OV 70']],
  ['fen-oc70', 'Fenêtre aluminium OC 70 – châssis dissimulé', ['Châssis dissimulé', 'Profil OC 70']],
  ['fen-cor60', 'COR 60'],
  ['fen-cor70-ind', 'COR 70 Industriel'],
  ['fen-cor80-ind', 'COR 80 Industriel'],
  ['fen-cor80-ind-ph', 'COR 80 Industriel Passivhaus', ['Passivhaus', 'Haute isolation']],
  ['fen-cor80-oc', 'COR 80 Ouvrant Caché'],
  ['fen-cor70-oc', 'COR 70 Ouvrant Caché'],
  ['fen-cor70-oc-hi', 'COR 70 OC HI'],
  ['fen-cor75-perf', 'COR 75 Performance'],
  ['fen-cor80-perf', 'COR 80 Performance'],
  ['fen-alu-steel', 'ALU-Steel', ['Effet acier', 'Design']],
  ['fen-cor70-oc-semi', 'COR 70 OC Semi-visible'],
  ['fen-cor-urban-c16', 'COR Urban C16'],
  ['fen-cor-urban-st', 'COR Urban ST'],
  ['fen-cor84', 'COR 84'],
  ['fen-cor75', 'COR 75'],
  ['fen-cor2300', 'COR 2300'],
  ['fen-renov-plus', 'Fenêtre Renov+', ['Rénovation', 'Pose rapide']],
  ['fen-residentiel-design', 'Résidentiel Design'],
  ['fen-fixe-4300', 'Élément Fixe 4300'],
  ['fen-solead-32', 'SOLEA(D) 32'],
  ['fen-maximum', 'Fenêtre Maximum'],
  ['fen-horizon', 'HORIZON'],
  ['fen-premisse', 'PREMISSE'],
  ['fen-cor60-oc', 'COR 60 Ouvrant Caché'],
]);

const portesFenetres = buildProducts('portes-fenetres', [
  ['pf-cor3000', 'COR 3000'],
  ['pf-cor2000', 'COR 2000'],
  ['pf-cor2300', 'COR 2300'],
  ['pf-cor70-c16-st', 'COR 70 C16 ST'],
  ['pf-cor70-evo', 'COR 70 Evolution'],
  ['pf-cor70-oc-c16-st', 'COR 70 Ouvrant Caché C16 ST'],
  ['pf-cor3500-c16', 'COR 3500 C16 battant'],
  ['pf-cor3500', 'COR 3500 battant'],
  ['pf-cor-urban-c16', 'COR Urban C16'],
  ['pf-cor-galicia', 'COR Galicia Premium C16'],
  ['pf-casement', 'Casement'],
  ['pf-cor75-perf', 'COR 75 Performance'],
  ['pf-cor80-ind-ph', 'COR 80 Industriel Passivhaus'],
  ['pf-cor80-ind', 'COR 80 Industriel'],
  ['pf-cor70-ind', 'COR 70 Industriel'],
  ['pf-cor80-oc', 'COR 80 Ouvrant Caché'],
  ['pf-cor70-oc', 'COR 70 Ouvrant Caché'],
  ['pf-cor70-oc-pf', 'COR 70 OC'],
  ['pf-cor70-oc-semi', 'COR 70 OC Semi-visible'],
  ['pf-cor60-battant', 'COR 60 battant'],
  ['pf-cor60-oc', 'COR 60 Ouvrant Caché'],
  ['pf-alu-steel', 'Alu-Steel'],
]);

const portes = buildProducts('portes', [
  ['porte-mill-plus-80', 'Porte Millennium Plus 80'],
  ['porte-mill-plus-70', 'Porte Millennium Plus 70'],
  ['porte-mill-plus-pivot', 'Porte Millennium Plus Pivot', ['Pivot', 'Design']],
  ['porte-panneau', 'Porte à Panneau'],
  ['porte-mill-2000', 'Porte Millennium 2000'],
  ['porte-coul-auto', 'Porte Coulissante Automatique', ['Automatique', 'Coulissant']],
  ['porte-repliable-plus', 'Porte Repliable Plus', ['Repliable']],
  ['porte-systeme-repliable', 'Système Repliable', ['Repliable', 'Modulaire']],
]);

const baiesCoulissantes = buildProducts('baies-coulissantes', [
  ['bc-cor-vision-plus', 'Cor Vision Plus Coulissant', ['Minimaliste', 'Panoramique']],
  ['bc-cor-vision-evo', 'Cor Vision Evolution Coulissant'],
  ['bc-cor-vision', 'Cor-Vision Coulissant'],
  ['bc-4600-plus', '4600 Plus Coulissant à Levage', ['Levage & glissement']],
  ['bc-4700', '4700 Coulissant'],
  ['bc-4900-hi', '4900 Coulissant HI', ['Haute isolation']],
  ['bc-4200', '4200 Coulissant'],
  ['bc-5000', '5000 Coulissant'],
  ['bc-med-coul', 'Porte-fenêtre Méditerranéenne Coulissante'],
  ['bc-2000', '2000 Coulissant'],
  ['bc-6200', 'Système 6200 Coulissant'],
  ['bc-6500-plus', 'Système 6500 Plus Coulissant'],
  ['bc-6500', 'Système 6500 Coulissant'],
  ['bc-c70cd', 'Système coulissant aluminium C70 CD'],
  ['bc-cvision', 'Système coulissant minimaliste C VISION'],
  ['bc-4600', 'Système levage et glissement aluminium 4600'],
  ['bc-c70c', 'Système coulissant aluminium C70 C'],
  ['bc-artline-xl', 'Baie coulissante ARTLINE XL', ['Grande dimension']],
  ['bc-lumeal', 'Baie coulissante minimale LUMÉAL', ['Minimaliste']],
  ['bc-soleal', 'Baie coulissante SOLEAL'],
  ['bc-ambial', 'Porte repliable AMBIAL', ['Repliable']],
  ['bc-esbeltal', 'Baie coulissante à levage ESBELTAL'],
  ['bc-tigal', 'Baie coulissante TIGAL'],
]);

const portesEntree = buildProducts('portes-entree', [
  ['pe-technique', 'Porte d\'entrée aluminium « Technique »', ['Usage intensif', 'Haute sécurité']],
  ['pe-residentiel', 'Porte d\'entrée aluminium « Résidentiel »', ['Alu & verre', 'Design résidentiel']],
]);

const pvc = buildProducts('pvc', [
  ['pvc-a84-ph-hi', 'A 84 Passivhaus HI', ['Passivhaus', 'Triple vitrage']],
  ['pvc-a84-ph-10', 'A 84 Passivhaus 1.0', ['Passivhaus']],
  ['pvc-a84-battant', 'A 84 Battant'],
  ['pvc-a84-oc-ph', 'A 84 Ouvrant Caché Passivhaus'],
  ['pvc-a84-oc', 'A 84 Ouvrant Caché'],
  ['pvc-a78-frappe', 'A 78 À frappe'],
  ['pvc-a70-battant', 'A 70 Battant'],
  ['pvc-alcover', 'Alcover'],
  ['pvc-serie', 'Série PVC'],
  ['pvc-optima-82', 'Série PVC Optima 82'],
]);

const facades = buildProducts('facades', [
  ['fac-cor52', 'COR 52 pour murs rideaux', ['Mur rideau']],
  ['fac-cor-gt72', 'COR GT 72'],
  ['fac-cor60-c16', 'COR 60 C16'],
  ['fac-cor-gt72s1', 'COR GT 72S1'],
  ['fac-vitree', 'Façade vitrée'],
]);

const portailsClotures = buildProducts('portails-clotures', [
  ['portail-sur-mesure', 'Portails sur mesure', ['Coulissant & battant', 'Motorisation']],
  ['cloture-palissade', 'Clôtures et palissades'],
]);

const carportsPergolas = buildProducts('carports-pergolas', [
  ['pergola-suneal', 'Pergola SUNEAL', ['Bioclimatique', 'Lames orientables']],
  ['carport-alu', 'Carports aluminium'],
]);

const verandas = buildProducts('verandas', [
  ['veranda-tourmaline', 'Véranda TOURMALINE'],
  ['veranda-jade', 'Véranda JADE'],
]);

const verrieres = buildProducts('verrieres', [
  ['verriere-interieure', 'Verrières intérieures'],
]);

const voletsBriseSoleil = buildProducts('volets-brise-soleil', [
  ['ps-lames', 'Protection Solaire : Lames'],
  ['ps-jalousies-deco', 'Jalousies – Lames Décoratives'],
  ['ps-tamis', 'Système Tamis'],
  ['ps-majorquine', 'Système Majorquine'],
  ['ps-jalousie', 'Jalousie'],
  ['bs-suneal', 'Brise-soleil SUNEAL', ['Orientable', 'Extérieur']],
  ['volet-noteal-battant', 'Volets battants NOTEAL'],
  ['volet-noteal-coulissant', 'Volets coulissants et Panneaux d\'occultation NOTEAL'],
]);

const gardeCorps = buildProducts('garde-corps', [
  ['gc-gypse', 'Garde-corps GYPSE', ['Alu & verre', 'Design']],
]);

const bardages = buildProducts('bardages', [
  ['bardage-alu', 'Bardages aluminium'],
]);

const divisionEspaces = buildProducts('division-espaces', [
  ['aluscreen-parois', 'ALUSCREEN PAROIS'],
  ['aluscreen-cv-central', 'ALUSCREEN CLAIRE VOIE CENTRALE'],
  ['aluscreen-cv-lateral', 'ALUSCREEN CLAIRE VOIE LATÉRALE'],
]);

const protectionIncendie = buildProducts('protection-incendie', [
  ['pi-mill-fr', 'Porte Millennium FR', ['Coupe-feu']],
  ['pi-exutoire', 'Exutoire de fumées', ['Évacuation fumées']],
]);

const panneauxInjectes = buildProducts('panneaux-injectes', [
  ['panneau-injecte', 'Panneaux injectés'],
]);

const couleursPoignees: Product[] = [];

export const catalogueProducts: Product[] = [
  ...fenetres,
  ...portesFenetres,
  ...portes,
  ...baiesCoulissantes,
  ...portesEntree,
  ...pvc,
  ...facades,
  ...portailsClotures,
  ...carportsPergolas,
  ...verandas,
  ...verrieres,
  ...voletsBriseSoleil,
  ...gardeCorps,
  ...bardages,
  ...divisionEspaces,
  ...protectionIncendie,
  ...panneauxInjectes,
  ...couleursPoignees,
];
