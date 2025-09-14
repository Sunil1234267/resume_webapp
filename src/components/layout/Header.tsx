import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "@/lib/data";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const mobileMenuVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const navItemVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <NavLink key={link.href} to={link.href} onClick={isMobile ? toggleMenu : undefined}>
        {({ isActive }) => (
          <motion.div
            variants={navItemVariants}
            whileHover="hover"
            whileTap="tap"
            className={`relative px-3 py-2 text-sm font-medium ${isMobile ? "text-lg" : ""}`}
          >
            <span
              className={`transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </span>
            {isActive && (
              <motion.div
                layoutId={isMobile ? "active-mobile-indicator" : "active-desktop-indicator"}
                className="absolute inset-0 bg-accent rounded-md -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>
        )}
      </NavLink>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <NavLink to="/" className="mr-6 flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">Sunil Khatri</span>
        </NavLink>

        <nav className="hidden md:flex items-center space-x-1">{renderNavLinks()}</nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="md:hidden border-t"
          >
            <nav className="flex flex-col items-center space-y-2 p-4">{renderNavLinks(true)}</nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
