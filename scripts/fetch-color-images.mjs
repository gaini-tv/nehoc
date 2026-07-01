#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/catalogue/colors');
const OUT_FILE = path.join(ROOT, 'src/data/color-palettes.ts');

const PAGES = [
  {
    url: 'https://www.cortizo.com/fr/paginas/muestras_foliado',
    palettes: [
      {
        id: 'films-decoratifs',
        title: 'Films décoratifs',
        names: ['CHÊNE CLAIR', 'CHÊNE FONCÉ', 'CHÊNE RUSTIQUE', 'SAPIN', 'ACAJOU', 'SAPELE'],
      },
      {
        id: 'standard-2-faces',
        title: 'Couleurs standard 2 faces',
        names: ['BLANC', 'CHÊNE DORÉ', 'NOYER'],
      },
      {
        id: 'standard-1-face',
        title: 'Couleurs standard 1 face',
        names: ['CHÊNE DORÉ', 'NOYER'],
      },
      {
        id: 'couleurs-speciales',
        title: 'Couleurs spéciales',
        names: [
          'BLEU ACIER', 'MARRON CLAIR', 'MARRON MAT', 'VERT MAT', 'GRIS MAT', 'NOIR MAT',
          'PIN VEINÉ', 'NOYER WALNUSS', 'CHÊNE NEWCASTLE', 'ANTHRACITE MÉTALLISÉ', 'OCRE MÉTALLISÉ',
          'ALUMINIUM ARGENT', 'GRIS LISSE', 'GRIS ANTHRACITE', 'GRIS AGATE', 'BLANC FILMÉ',
          'BLANC CRÈME', 'GRIS CLAIR', 'GRIS ARGENT', 'BRONZE', 'OR', 'ROUGE VIN', 'VERT PIN',
          'VERT MOUSSE', 'BLEU BRILLANT', 'SHEFFIELD CLAIR', 'SHEFFIELD FONCÉ', 'CHÊNE MALTE',
        ],
      },
      {
        id: 'ultra-performance',
        title: 'Couleurs ultra performance',
        names: [
          'CHÊNE MALTE WOODEC', 'KITAMI FONCÉ', 'BLANC ULTRAMAT', 'QUARTZ ULTRAMAT',
          'MARRON ULTRAMAT', 'GRIS ANTHRACITE ULTRAMAT', 'NOIR ULTRAMAT',
        ],
      },
    ],
  },
  {
    url: 'https://www.cortizo.com/fr/paginas/lacados_texturados',
    palettes: [{ id: 'couleurs-texturees', title: 'Couleurs texturées' }],
  },
  {
    url: 'https://www.cortizo.com/fr/paginas/lacado_madera',
    palettes: [{ id: 'couleurs-ton-bois', title: 'Couleurs ton bois' }],
  },
  {
    url: 'https://www.cortizo.com/fr/paginas/muestrario_anodizado',
    palettes: [{ id: 'nuancier-anodises', title: 'Nuancier anodisés' }],
  },
  {
    url: 'https://www.cortizo.com/fr/paginas/carta_standard',
    palettes: [{ id: 'carta-standard', title: 'Carte standard laqué' }],
  },
];

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseSwatches(html) {
  const inlineMatch = html.match(/paginasinline\/([^/"']+)/);
  if (!inlineMatch) return { base: null, swatches: [] };

  const base = `https://www.cortizo.com/ficheros/paginasinline/${inlineMatch[1]}/`;
  const swatches = [];
  const re = /<div class="w-layout-cell cell-\d+"><img src="(images\/[^"]+)"[^>]*>\s*<p class="paragraph-50">([^<]+)<\/p>/g;

  for (const match of html.matchAll(re)) {
    swatches.push({
      name: match[2].trim(),
      remote: base + match[1],
      file: match[1],
    });
  }

  return { base, swatches };
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
}

async function main() {
  const byName = new Map();
  const paletteResults = [];

  for (const page of PAGES) {
    const res = await fetch(page.url);
    if (!res.ok) throw new Error(`Failed to fetch ${page.url}`);
    const html = await res.text();
    const { swatches } = parseSwatches(html);

    for (const swatch of swatches) {
      if (!byName.has(swatch.name)) byName.set(swatch.name, swatch);
    }

    for (const palette of page.palettes) {
      const selected = palette.names
        ? palette.names.map((name) => byName.get(name)).filter(Boolean)
        : swatches;

      const swatchEntries = [];

      for (const swatch of selected) {
        const ext = path.extname(swatch.file) || '.jpg';
        const fileSlug = slugify(swatch.name);
        const localPath = `/catalogue/colors/${palette.id}/${fileSlug}${ext}`;
        const dest = path.join(ROOT, 'public', localPath);

        try {
          await download(swatch.remote, dest);
        } catch (err) {
          console.warn(`Skip ${swatch.name}: ${err.message}`);
          continue;
        }

        swatchEntries.push({
          id: fileSlug,
          name: swatch.name,
          image: localPath,
        });
      }

      paletteResults.push({
        id: palette.id,
        title: palette.title,
        coverImage: swatchEntries[0]?.image ?? null,
        swatches: swatchEntries,
      });

      console.log(`${palette.title}: ${swatchEntries.length} images`);
    }
  }

  paletteResults.push({
    id: 'poignees',
    title: 'Poignées',
    coverImage: '/catalogue/fin-poignees.jpg',
    swatches: [],
    info: 'Large gamme de poignées design pour portes et fenêtres — contactez-nous pour découvrir les modèles disponibles.',
  });

  const ts = `// Auto-généré par scripts/fetch-color-images.mjs — ne pas modifier à la main
export interface ColorSwatch {
  id: string;
  name: string;
  image: string;
}

export interface ColorPalette {
  id: string;
  title: string;
  coverImage: string | null;
  swatches: ColorSwatch[];
  info?: string;
}

export const colorPalettes: ColorPalette[] = ${JSON.stringify(paletteResults, null, 2)};
`;

  await writeFile(OUT_FILE, ts);
  console.log(`\nÉcrit ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
