import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="contenu"
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
