import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col ">

      <Navbar />
      <motion.main 
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.1, 
          ease: "easeInOut" 
        }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default MainLayout;