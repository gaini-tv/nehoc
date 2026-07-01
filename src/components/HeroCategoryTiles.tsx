import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { catalogueCategories, catalogueCategoryPath } from '../data/products';
import CategoryIcon from './CategoryIcon';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './HeroCategoryTiles.css';

type TileProps = {
  id: (typeof catalogueCategories)[number]['id'];
  label: string;
  index: number;
  float?: boolean;
};

function CategoryTile({ id, label, index, float = true }: TileProps) {
  const reducedMotion = useReducedMotion();
  const delay = (index % 6) * 0.35;
  const duration = 4.5 + (index % 4) * 0.6;

  return (
    <Link
      to={catalogueCategoryPath(id)}
      className="hero-category-tile"
      title={label}
      aria-label={label}
    >
      <motion.span
        className="hero-category-tile__inner"
        animate={
          float && !reducedMotion
            ? { y: [0, -6, 0, 5, 0] }
            : undefined
        }
        transition={
          float && !reducedMotion
            ? { duration, repeat: Infinity, ease: 'easeInOut', delay }
            : undefined
        }
      >
        <span className="hero-category-tile__icon">
          <CategoryIcon id={id} />
        </span>
        <span className="hero-category-tile__label">{label}</span>
      </motion.span>
    </Link>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof catalogueCategories;
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div className="hero-category-marquee" data-reverse={reverse || undefined}>
      <div className="hero-category-marquee__track">
        {track.map((category, index) => (
          <CategoryTile
            key={`${category.id}-${index}`}
            id={category.id}
            label={category.label}
            index={index}
            float={index < items.length}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroCategoryTiles({ visible }: { visible: boolean }) {
  const half = Math.ceil(catalogueCategories.length / 2);
  const row1 = catalogueCategories.slice(0, half);
  const row2 = catalogueCategories.slice(half);

  return (
    <motion.div
      className="hero-category-tiles"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 40 }}
      transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!visible}
    >
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </motion.div>
  );
}
