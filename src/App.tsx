import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Loader from "./components/layout/Loader";

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Other = lazy(() => import("./pages/Other"));
const Contact = lazy(() => import("./pages/Contact"));
const Chatbot = lazy(() => import("./pages/Chatbot"));

// Scroll to top immediately on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<Loader />}><About /></Suspense>} />
          <Route path="experience" element={<Suspense fallback={<Loader />}><Experience /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<Loader />}><Projects /></Suspense>} />
          <Route path="other" element={<Suspense fallback={<Loader />}><Other /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<Loader />}><Contact /></Suspense>} />
          <Route path="chatbot" element={<Suspense fallback={<Loader />}><Chatbot /></Suspense>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
