import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ROUTES from "../../../routes/Routes";
import { AnimatePresence } from "framer-motion";
const MainLayout: React.FC = () => {
  const location = useLocation();

  const animatedRoutes = Object.values(ROUTES);

  const isAnimatedRoute = (pathname: string) => {
    const projectMatch = pathname.match(
      new RegExp(
        `^(${ROUTES.PROYECTOS}/[^/]+)/(tableros|gantt|calendar|files)$`
      )
    );
    const route = projectMatch ? projectMatch[1] : pathname;

    return animatedRoutes.includes(route);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      {isAnimatedRoute(location.pathname) ? (
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      ) : (
        <main className="flex-1">
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default MainLayout;
