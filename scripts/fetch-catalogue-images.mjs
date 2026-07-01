#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/catalogue');
const OUT_FILE = path.join(ROOT, 'src/data/product-images.ts');
const CATALOGUE_FILE = path.join(ROOT, 'src/data/catalogue-products.ts');

const CORTIZO_PAGES = [
  'https://www.cortizo.com/fr/sistemas/desplegar/2/baies-coulissantes.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/3/fachadas-ligeras.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/6/portes-fenetres-et-portes-battantes.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/7/muros-cortina.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/9/cortizo-pvc.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/10/protection-solaire.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/27/portes.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/28/finitions.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/29/division-de-espaces-interieurs.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/30/bardages.html',
  'https://www.cortizo.com/fr/sistemas/desplegar/31/protection-contre-les-fumees-et-l-incendie.html',
];

/** Images Technal / fournisseurs — correspondance par id produit */
const MANUAL_OVERRIDES = {
  'bc-artline-xl': 'https://images.ctfassets.net/hd6763cyzwa4/5NNUTA1xLeq6j9rBBIv3Qy/2a4146dd4d40f3edb8b169e5f81be872/photo_technal_ARTLINE-FLUSH_ES_2_1214023.jpg',
  'bc-lumeal': 'https://images.ctfassets.net/hd6763cyzwa4/7uSWuVofQppgZGgTRfGXai/2e8c9e1c16f4286456f3d6e81fc756ee/06_C_LUMEAL_CARROUSSEL_TECHNAL_Stone_House_Menorca_Spain_05.jpg',
  'bc-soleal': 'https://images.ctfassets.net/hd6763cyzwa4/5eQ3MOgVoPVZuh2mQD2a3e/65037392afc9eb192f8cc75770608808/C_SOLEAL_WINDOW_CARROUSEL_Casa_Gesep_La_Garriga_Barcelona_Spain_06.jpg',
  'bc-ambial': 'https://images.ctfassets.net/hd6763cyzwa4/2pWvtgXVhamXxVtpBoJawg/66c3ca3b35f97dafd479b0862f5a6739/C_AMBIAL_ADAPTABILITY_TECHNAL_ALIGNED_3D-PORTE-AMBIAL-MAISON-5-vantaux-2.jpg',
  'bc-esbeltal': 'https://images.ctfassets.net/hd6763cyzwa4/6pl2mBJ5DlDkoFu7tfudcl/20309e311ccb4854cc188835b1e69aaa/AGP1462_4339-Panoweb.jpg',
  'bc-tigal': 'https://images.ctfassets.net/hd6763cyzwa4/4Zy6znwOVeXbl5PxBHNPlI/e110d5971c12f9026d258d0272eb6884/PH_TEC_Menu-Image-TIGAL_FR-fr.jpg',
  'pergola-suneal': 'https://images.ctfassets.net/hd6763cyzwa4/1P6NTn93W8Ui1xRoektOAg/a3996292ff79788e4f61d05a94d2ca29/Suneal_Carrousel_1.jpg',
  'veranda-tourmaline': 'https://images.ctfassets.net/hd6763cyzwa4/10oHy7hrXZGCGkYsO1ZJyv/4f7b142fedbfcbdcf58b0a81deb178e6/Tourmaline_Carrousel_1.jpg',
  'veranda-jade': 'https://images.ctfassets.net/hd6763cyzwa4/2JxkcJLb5GhBHHJR4vIAz7/4847198fa33fc74884d6b2f1f4d39350/Jade_Carrousel___9_.jpg',
  'gc-gypse': 'https://images.ctfassets.net/hd6763cyzwa4/1CrPvRzW57T9PYejqpQEuG/d2633cc7781b0ab1fff28156254e2e46/Gypse_Carrousel_2.JPG',
  'bs-suneal': 'https://images.ctfassets.net/hd6763cyzwa4/1P6NTn93W8Ui1xRoektOAg/a3996292ff79788e4f61d05a94d2ca29/Suneal_Carrousel_1.jpg',
  'volet-noteal-battant': 'https://images.ctfassets.net/hd6763cyzwa4/12WjiVSrXMG3rlGhmoxzTe/eb6e6b468be9abf6b29c76092922e076/Noteal_Volets_Carrousel_4.jpg',
  'volet-noteal-coulissant': 'https://images.ctfassets.net/hd6763cyzwa4/4halsPEI6NxenG52dwyXzA/cdd852922de877c5c7007d416c27c2db/Noteal_PO_Carrousel_2.jpg',
  'fin-couleurs': 'https://images.ctfassets.net/hd6763cyzwa4/2LyVX8FYBgv06zttn8Yz0K/1e839e7a52a5bfebb12d4457de240fb2/couleurs-france-product-menu-image.jpg',
  'fin-poignees': 'https://images.ctfassets.net/hd6763cyzwa4/0oUxExX8SGJ3sNq4xLCU9/0194b4605e872c57c87e0e4f9411b4df/PH_TEC_visuel-poignees_Fr-fr_06.jpg',
  // Division des espaces — Cortizo + Garden Gate
  'aluscreen-parois': 'https://www.cortizo.com/ficheros/sistemas/landing/29_162.jpg',
  'aluscreen-cv-central': 'https://gardengate.group/wp-content/uploads/2021/10/Divisorias.jpg',
  'aluscreen-cv-lateral': 'https://www.cortizo.com/ficheros/sistemas/landing/29_184.png',
  // Fenêtres — Acwin (OV70, OC70) + Cortizo pour le reste
  'fen-ov70': 'https://www.acwin.com/wp-content/uploads/2025/01/05adc50e-78af-4ad1-829c-07f30b1df986-VisuelangleOV70.png',
  'fen-oc70': 'https://www.acwin.com/wp-content/uploads/2025/01/54ce6ecc-5133-4f2a-8648-52237d52d73b-VisuelangleOC70.webp',
  'fen-cor84': 'https://www.cortizo.com/ficheros/sistemas/landing/6_187.jpg',
  'fen-renov-plus': 'https://www.cortizo.com/ficheros/sistemas/landing/6_164.jpg',
  'fen-residentiel-design': 'https://www.cortizo.com/ficheros/sistemas/landing/0_89.jpg',
  'fen-fixe-4300': 'https://www.cortizo.com/ficheros/sistemas/landing/6_3.jpg',
  'fen-solead-32': 'https://www.cortizo.com/ficheros/sistemas/landing/6_122.jpg',
  'fen-maximum': 'https://www.cortizo.com/ficheros/sistemas/landing/6_78.jpg',
  'fen-horizon': 'https://www.cortizo.com/ficheros/sistemas/landing/6_159.jpg',
  'fen-premisse': 'https://www.cortizo.com/ficheros/sistemas/landing/01_03.jpg',
  // Portes d'entrée
  'pe-technique': 'https://www.acwin.com/wp-content/uploads/2025/01/96fd6295-f39b-467d-a8df-faaa7d6cccb0-angleporte.png',
  'pe-residentiel': 'https://www.cortizo.com/ficheros/sistemas/landing/6_54.jpg',
  // PVC
  'pvc-serie': 'https://www.cortizo.com/ficheros/sistemas/landing/0_119.jpg',
  'pvc-optima-82': 'https://www.cortizo.com/ficheros/sistemas/landing/9_155.jpg',
  // Façades
  'fac-cor52': 'https://www.cortizo.com/ficheros/sistemas/landing/6_187.jpg',
  'fac-cor-gt72': 'https://www.cortizo.com/ficheros/sistemas/landing/6_78.jpg',
  'fac-cor-gt72s1': 'https://www.cortizo.com/ficheros/sistemas/landing/6_122.jpg',
  'fac-vitree': 'https://www.acwin.com/wp-content/uploads/2025/01/8de3fc67-1f5a-4951-962b-0d954c5065e6-Visuelfaadevitre1.png',
  // Baies coulissantes — Acwin
  'bc-4600': 'https://www.acwin.com/wp-content/uploads/2025/01/fa5ead86-d2a4-4b88-8d4d-1fe42f44db7d-Visuelangle4600.png',
  'bc-cvision': 'https://www.acwin.com/wp-content/uploads/2025/01/3f172bc5-6390-4abf-8a17-25650e297f68-VisuelangleminimalsiteVISION.webp',
  'bc-c70c': 'https://www.acwin.com/wp-content/uploads/2025/01/9d1fc77e-8e75-45c2-8a02-c2dd4a397e99-VisuelangleC70C.webp',
  'bc-c70cd': 'https://www.acwin.com/wp-content/uploads/2025/01/de41a2a3-199d-4580-a09d-f381ea93a088-VisuelangleC70CD.webp',
  // Extérieur — Garden Gate
  'portail-sur-mesure': 'https://gardengate.group/wp-content/uploads/2021/10/Portoes.jpg',
  'cloture-palissade': 'https://gardengate.group/wp-content/uploads/2021/10/Gradeamentos-e-Palicadas-min.jpg',
  'carport-alu': 'https://gardengate.group/wp-content/uploads/2021/10/carports-e-pergolas.jpg',
  'verriere-interieure': 'https://images.ctfassets.net/hd6763cyzwa4/1kOg9cObGucrYbfXirChPu/2abfd35acc49711d32fef371a75a7caa/porte_fenetre_double_vitrage.jpg',
  'bardage-alu': 'https://www.cortizo.com/ficheros/sistemas/landing/30_172.jpg',
  'panneau-injecte': 'https://gardengate.group/wp-content/uploads/2021/10/Paineis-injetados.jpg',
};

function normalizeTitle(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[«»"'`]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(title) {
  return normalizeTitle(title).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'NEHOC-catalogue/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseCortizo(html) {
  const items = [];
  const cellRe = /<div class="w-layout-cell cell-67">([\s\S]*?)<\/div>\s*(?=<div class="w-layout-cell|<\/div>\s*<\/div>\s*<\/div>)/g;
  let m;
  while ((m = cellRe.exec(html)) !== null) {
    const block = m[1];
    const imgMatch = block.match(/ficheros\/sistemas\/landing\/([^"?]+\.(?:jpg|png|webp|jpeg))/i);
    const titleMatch = block.match(/<strong[^>]*>([^<]+)<\/strong>/);
    if (!imgMatch || !titleMatch) continue;
    const title = titleMatch[1].trim();
    items.push({
      title,
      normalized: normalizeTitle(title),
      slug: slugify(title),
      imageUrl: `https://www.cortizo.com/ficheros/sistemas/landing/${imgMatch[1]}`,
    });
  }
  return items;
}

function parseProductsFromTs(source) {
  const products = [];
  const re = /\['([^']+)',\s*'((?:\\'|[^'])*)'(?:,\s*\[[^\]]*\])?\]/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    products.push({ id: m[1], title: m[2].replace(/\\'/g, "'") });
  }
  return products;
}

function findImage(product, scraped) {
  if (MANUAL_OVERRIDES[product.id]) return MANUAL_OVERRIDES[product.id];

  const norm = normalizeTitle(product.title);
  const slug = slugify(product.title);

  if (scraped.has(norm)) return scraped.get(norm).imageUrl;
  if (scraped.has(slug)) return scraped.get(slug).imageUrl;

  for (const [key, val] of scraped) {
    if (key === norm || key.includes(norm) || norm.includes(key)) return val.imageUrl;
    if (val.slug === slug) return val.imageUrl;
  }

  // Match partiel sur mots-clés (ex: "COR 70 Industriel")
  const tokens = norm.split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  let best = null;
  let bestScore = 0;
  for (const [, val] of scraped) {
    const score = tokens.filter((t) => val.normalized.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      best = val.imageUrl;
    }
  }
  if (bestScore >= 2) return best;

  return null;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, { headers: { 'User-Agent': 'NEHOC-catalogue/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

function extFromUrl(url) {
  const base = url.split('?')[0].toLowerCase();
  if (base.endsWith('.png')) return 'png';
  if (base.endsWith('.webp')) return 'webp';
  if (base.endsWith('.jpg') || base.endsWith('.jpeg')) return 'jpg';
  return 'jpg';
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const scraped = new Map();
  for (const url of CORTIZO_PAGES) {
    try {
      const html = await fetchText(url);
      for (const item of parseCortizo(html)) {
        scraped.set(item.normalized, item);
        scraped.set(item.slug, item);
      }
      console.log(`Cortizo: ${url.split('/').pop()}`);
    } catch (e) {
      console.warn(`Skip ${url}: ${e.message}`);
    }
  }

  const source = await readFile(CATALOGUE_FILE, 'utf8');
  const products = parseProductsFromTs(source);
  const imageMap = {};
  let ok = 0;
  let miss = 0;

  for (const product of products) {
    const imageUrl = findImage(product, scraped);
    if (!imageUrl) {
      console.warn(`✗ Pas d'image: ${product.title}`);
      miss++;
      continue;
    }

    const ext = extFromUrl(imageUrl);
    const filename = `${product.id}.${ext}`;
    const dest = path.join(OUT_DIR, filename);
    const publicPath = `/catalogue/${filename}`;

    try {
      await downloadImage(imageUrl, dest);
      imageMap[product.id] = publicPath;
      ok++;
      console.log(`✓ ${product.title}`);
    } catch (e) {
      console.warn(`✗ Download ${product.title}: ${e.message}`);
      miss++;
    }
  }

  const ts = `// Auto-généré — scripts/fetch-catalogue-images.mjs
export const productImages: Record<string, string> = ${JSON.stringify(imageMap, null, 2)};
`;
  await writeFile(OUT_FILE, ts);
  console.log(`\n${ok}/${products.length} images OK, ${miss} manquantes → ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
