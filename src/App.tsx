import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/layout/PageWrapper";
import Loader from './components/layout/Loader';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Experience = lazy(() => import('./pages/Experience'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Other = lazy(() => import('./pages/Other'));
const Contact = lazy(() => import('./pages/Contact'));

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="experience" element={<PageWrapper><Experience /></PageWrapper>} />
            <Route path="skills" element={<PageWrapper><Skills /></PageWrapper>} />
            <Route path="projects" element={<PageWrapper><Projects /></PageWrapper>} />
            <Route path="other" element={<PageWrapper><Other /></PageWrapper>} />
            <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
