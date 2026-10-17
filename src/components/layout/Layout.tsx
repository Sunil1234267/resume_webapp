import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { AtmosphericBackground } from "./AtmosphericBackground";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden text-foreground">
      {/* 1. Atmospheric Ambient Background (constant, non-reloading) */}
      <AtmosphericBackground />

      {/* 2. Fixed Header (pinned firmly to top on scroll, content passes underneath) */}
      <Header />

      {/* 3. Foreground Content Stack (padded so content cleanly glides under fixed header) */}
      <div className="relative z-10 flex flex-col min-h-screen pt-24 sm:pt-28">
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
