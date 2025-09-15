import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Other from "./pages/Other"; // Changed from Education
import Contact from "./pages/Contact";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/layout/PageWrapper";

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="experience" element={<PageWrapper><Experience /></PageWrapper>} />
          <Route path="skills" element={<PageWrapper><Skills /></PageWrapper>} />
          <Route path="projects" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="other" element={<PageWrapper><Other /></PageWrapper>} /> {/* Changed path and component */}
          <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
