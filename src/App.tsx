import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import PageWrapper from "./components/layout/PageWrapper";
import Loader from "./components/layout/Loader";

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Other = lazy(() => import("./pages/Other"));
const Contact = lazy(() => import("./pages/Contact"));
const Chatbot = lazy(() => import("./pages/Chatbot"));

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageWrapper><Suspense fallback={<Loader />}><Home /></Suspense></PageWrapper>} />
          <Route path="about" element={<PageWrapper><Suspense fallback={<Loader />}><About /></Suspense></PageWrapper>} />
          <Route path="experience" element={<PageWrapper><Suspense fallback={<Loader />}><Experience /></Suspense></PageWrapper>} />
          <Route path="projects" element={<PageWrapper><Suspense fallback={<Loader />}><Projects /></Suspense></PageWrapper>} />
          <Route path="other" element={<PageWrapper><Suspense fallback={<Loader />}><Other /></Suspense></PageWrapper>} />
          <Route path="contact" element={<PageWrapper><Suspense fallback={<Loader />}><Contact /></Suspense></PageWrapper>} />
          <Route path="chatbot" element={<PageWrapper><Suspense fallback={<Loader />}><Chatbot /></Suspense></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return <AnimatedRoutes />;
}

export default App;
