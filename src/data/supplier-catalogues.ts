export interface SupplierCatalogue {
  id: string;
  brand: string;
  title: string;
  description: string;
  /** Lien direct vers un PDF officiel */
  pdfUrl?: string;
  /** Page catalogue en ligne si pas de PDF public */
  onlineUrl?: string;
  fileLabel?: string;
}

export const supplierCatalogues: SupplierCatalogue[] = [
  {
    id: 'technal',
    brand: 'Technal',
    title: 'Catalogue Grand Public 2026',
    description:
      'Fenêtres, portes, baies coulissantes, vérandas, garde-corps, volets et finitions — documentation officielle Technal.',
    pdfUrl:
      'https://downloads.ctfassets.net/o4m3rk0gh1ig/nvWxuX8qJvJRZmtzichzw/3ac76f2ad0fc1cdcb5578001cf6f994c/PB_TEC_Catalogue2026_Grand_Public_Fr-fr.pdf',
    fileLabel: 'Catalogue-Technal-2026.pdf',
  },
  {
    id: 'cortizo',
    brand: 'Cortizo',
    title: 'Catalogue architecture 2025',
    description:
      'Systèmes aluminium et PVC : fenêtres, portes, façades, garde-corps, protection solaire et division des espaces.',
    pdfUrl:
      'https://www.cortizo.com/fr/descargas/descargar/348/2025_CATALOGO_ARQUITECTURA_FR_WEB.pdf',
    fileLabel: 'Catalogue-Cortizo-Architecture-2025.pdf',
  },
  {
    id: 'acwin',
    brand: 'Acwin',
    title: 'Gamme produits aluminium',
    description:
      'Fenêtres OV 70 / OC 70, coulissants C Vision & C70, portes d\'entrée et façades vitrées. Catalogue consultable en ligne.',
    onlineUrl: 'https://www.acwin.com/fr/produtos/',
  },
];
