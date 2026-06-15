import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import About from './pages/About';
import Catalogue from './pages/Catalogue';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="a-propos" element={<About />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
