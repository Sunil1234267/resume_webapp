import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { AtmosphericBackground } from "./AtmosphericBackground";

const Layout = () => {

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden text-foreground">
      {/* 1. Atmospheric Ambient Background (constant, non-reloading) */}
      <AtmosphericBackground />

      {/* 2. Fixed Header (pinned firmly to top on scroll, content passes underneath) */}
      <Header />

      {/* 3. Foreground Content Stack (padded so content cleanly glides under fixed header) */}
      <div className="relative z-10 flex flex-col min-h-screen pt-24 sm:pt-28">
        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
