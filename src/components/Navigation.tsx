import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navigation = () => {
  const location = useLocation();
  
  const getPageName = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/explorations") return "Explorations";
    return "Home";
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-foreground/10"
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center text-sm font-medium tracking-wide">
          <Link
            to="/"
            className="text-foreground/80 hover:text-foreground transition-colors duration-200"
          >
            Santiago Paredes
          </Link>
          <span className="text-foreground/40 mx-2">/</span>
          <span className="text-foreground/60">{getPageName()}</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
