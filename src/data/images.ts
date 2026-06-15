const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

/** Images vérifiées — extérieur & vitré uniquement */
export const images = {
  hero: u('1600585154340-be6161a56a0c', 1920),
  facade: u('1758448756207-54505680d130', 1920),
  vitrage: u('1600596542815-ffad4c1539a9'),
  baieVitree: u('1600585152915-d208bec867a1'),
  fenetreAlu: u('1721815693498-cc28507c0ba2'),
  fenetrePvc: u('1564013799919-ab600027ffc6'),
  porteEntree: u('1582268611958-ebfd161ef9cf'),
  porteGarage: u('1560518883-ce09059eeffa'),
  gardeCorps: u('1560448204-e02f11c3d0e2'),
  ouvrant: u('1513584684374-8bab748fbf90'),
  architecture: u('1777115470242-9b21d2c67729'),
  villa: u('1758448756207-54505680d130', 1920),
} as const;

/** Image par catégorie catalogue */
export const categoryImages: Record<string, string> = {
  aluminium: images.fenetreAlu,
  pvc: images.fenetrePvc,
  serrurerie: images.porteEntree,
  'garde-corps': images.gardeCorps,
  ouvrants: images.ouvrant,
};
