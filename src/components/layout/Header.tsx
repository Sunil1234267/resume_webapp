import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navLinks } from "@/lib/data";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, Sparkles, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Glassmorphic Telemetry Dock */}
        <div className="w-full flex items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#0D0E17]/95 backdrop-blur-2xl border border-[#FF8000]/35 shadow-2xl shadow-black/80">
          
          {/* Logo Brand with Name in a SINGLE LINE */}
          <NavLink to="/" className="group flex-shrink-0" aria-label="Sunil Khatri Home">
            <Logo size="sm" showText={true} showSubtitle={true} subtitleClassName="hidden md:inline-block" />
          </NavLink>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink key={link.href} to={link.href}>
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? "text-[#FF8000] font-bold"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5 opacity-70" />}
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-pill"
                          className="absolute inset-0 bg-[#FF8000]/15 border border-[#FF8000]/50 rounded-full -z-10 shadow-sm shadow-[#FF8000]/30"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                    </motion.div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* AI Copilot Quick Pill */}
            <NavLink to="/chatbot" className="hidden sm:inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full text-xs font-mono border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] gap-1.5 transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>AI Copilot</span>
              </Button>
            </NavLink>

            {/* Quick Contact CTA */}
            <Link to="/contact" className="hidden md:inline-flex">
              <Button
                size="sm"
                className="h-8 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] hover:from-[#FF8000] hover:to-[#FFAA00] text-black shadow-md shadow-[#FF8000]/30 gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Connect</span>
              </Button>
            </Link>

            <ModeToggle />

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden max-w-6xl mx-auto mt-2 pointer-events-auto"
          >
            <div className="glass-panel rounded-2xl p-4 border border-[#FF8000]/35 shadow-2xl space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-mono font-medium transition-colors ${
                          isActive
                            ? "bg-[#FF8000]/20 text-[#FF8000] border border-[#FF8000]/50 font-bold"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      {Icon && <Icon className="w-4 h-4 text-[#FF8000]" />}
                      <span>{link.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <Link to="/chatbot" onClick={toggleMenu}>
                  <Button
                    variant="outline"
                    className="w-full justify-center text-xs font-mono border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10 gap-2 h-9 rounded-xl"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Launch AI Copilot
                  </Button>
                </Link>
                <Link to="/contact" onClick={toggleMenu}>
                  <Button
                    className="w-full justify-center text-xs font-mono font-bold bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] text-black h-9 rounded-xl shadow-md shadow-[#FF8000]/30"
                  >
                    Transmit Message
                  </Button>
                </Link>

                {/* Mobile Social Quick Bar */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <a
                    href="https://linkedin.com/in/sunilk15"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-[#00E5FF] transition-colors flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                  </a>
                  <span className="text-slate-600">•</span>
                  <a
                    href="https://github.com/Sunil1234267"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-[#FF8000] transition-colors flex items-center gap-1"
                  >
                    <span>GitHub</span>
                  </a>
                  <span className="text-slate-600">•</span>
                  <a
                    href="mailto:sunilkhatri15499@gmail.com"
                    className="text-xs font-mono text-slate-400 hover:text-[#FF8000] transition-colors"
                  >
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
