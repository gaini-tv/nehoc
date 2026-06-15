import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode, type ElementType } from 'react';
import './WindowTextReveal.css';

interface WindowTextRevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  once?: boolean;
  variant?: 'light' | 'dark';
}

export default function WindowTextReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  once = true,
  variant = 'dark',
}: WindowTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.4 });

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <div
      ref={ref}
      className={`window-text-reveal window-text-reveal--${variant} ${className}`}
    >
      <motion.div
        className="window-text-reveal__content"
        initial={{ clipPath: 'inset(0 50% 0 50%)' }}
        animate={{
          clipPath: isInView ? 'inset(0 0% 0 0%)' : 'inset(0 50% 0 50%)',
        }}
        transition={{ duration: 1.2, delay, ease }}
      >
        <Tag>{children}</Tag>
      </motion.div>

      <motion.div
        className="window-text-reveal__shutter window-text-reveal__shutter--left"
        initial={{ x: '0%' }}
        animate={{ x: isInView ? '-102%' : '0%' }}
        transition={{ duration: 1.2, delay, ease }}
      >
        <span className="window-text-reveal__glass" />
      </motion.div>

      <motion.div
        className="window-text-reveal__shutter window-text-reveal__shutter--right"
        initial={{ x: '0%' }}
        animate={{ x: isInView ? '102%' : '0%' }}
        transition={{ duration: 1.2, delay, ease }}
      >
        <span className="window-text-reveal__glass" />
      </motion.div>

      <motion.span
        className="window-text-reveal__line"
        initial={{ scaleY: 1, opacity: 1 }}
        animate={{ scaleY: isInView ? 0 : 1, opacity: isInView ? 0 : 1 }}
        transition={{ duration: 0.8, delay, ease }}
      />

      <motion.span
        className="window-text-reveal__frame"
        initial={{ opacity: 1 }}
        animate={{ opacity: isInView ? 0 : 1 }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      />
    </div>
  );
}
