import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { images } from '../data/images';
import './WindowHero.css';

export default function WindowHero() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="window-hero">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="window-hero__intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="window-hero__intro-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              NEHOC
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left shutter */}
      <motion.div
        className="window-hero__shutter window-hero__shutter--left"
        initial={{ x: '0%' }}
        animate={{ x: isOpen ? '-100%' : '0%' }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        <div className="window-hero__shutter-inner">
          <div className="window-hero__shutter-frame" />
          <div className="window-hero__shutter-glass" />
        </div>
      </motion.div>

      {/* Right shutter */}
      <motion.div
        className="window-hero__shutter window-hero__shutter--right"
        initial={{ x: '0%' }}
        animate={{ x: isOpen ? '100%' : '0%' }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        <div className="window-hero__shutter-inner">
          <div className="window-hero__shutter-frame" />
          <div className="window-hero__shutter-glass" />
        </div>
      </motion.div>

      {/* Center divider line */}
      <motion.div
        className="window-hero__center-line"
        initial={{ scaleY: 1, opacity: 1 }}
        animate={{ scaleY: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      />

      {/* Revealed content */}
      <motion.div
        className="window-hero__content"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 1.05 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      >
        <div className="window-hero__bg">
          <img
            src={images.hero}
            alt="Façade vitrée extérieure NEHOC"
          />
          <div className="window-hero__overlay" />
        </div>

        <div className="window-hero__text container">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            Menuiseries aluminium &amp; PVC
          </motion.span>

          <motion.h1
            className="window-hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 40 }}
            transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Se sentir bien
            <br />
            <em>dans la lumière</em>
          </motion.h1>

          <motion.p
            className="window-hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 30 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            Fenêtres haut de gamme, serrurerie, garde-corps et ouvrants
            motorisés — qualité, conseil et luminosité pour chaque habitat.
          </motion.p>

          <motion.div
            className="window-hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <Link to="/catalogue" className="btn btn-primary">
              Découvrir nos créations
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Nous contacter
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="window-hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          <span>Défiler</span>
          <motion.div
            className="window-hero__scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Window frame border */}
      <motion.div
        className="window-hero__frame"
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  );
}
