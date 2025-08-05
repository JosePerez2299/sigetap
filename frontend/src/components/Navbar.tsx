import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Bell,
  Home,
  FolderOpen,
  Users,
  TrendingUp,
  User,
  Settings,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ROUTES from "../routes/Routes";
import { useSelector } from "react-redux";
import type { RootState } from "../store/RootState";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navLinks = [
    { label: "Inicio", icon: Home, to: ROUTES.DASHBOARD },
    { label: "Proyectos", icon: FolderOpen, to: ROUTES.PROYECTOS },
    { label: "Auditoría", icon: Users, to: ROUTES.AUDITORY },
    { label: "Estadísticas", icon: TrendingUp, to: ROUTES.STATS },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };
  const linkVariants: Variants = {
    hover: {
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { y: 0 },
  };
  const dropdownVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.2,
      },
    },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } },
  };
  const bellVariants: Variants = {
    hover: { rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } },
  };
  const badgeVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
    },
  };

  return (
    <div className="navbar justify-between bg-base-200 border-b border-base-content/20 text-base-content shadow-sm px-4 gap-4">
      {/* Logo */}
      <motion.div whileHover="hover" whileTap="tap" variants={logoVariants}>
        <Link to={ROUTES.DASHBOARD} className="btn btn-ghost text-xl">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
            SIGETAP
          </span>
        </Link>
      </motion.div>

      {/* Enlaces */}
      <ul className="menu menu-md menu-horizontal gap-1">
        {navLinks.map((link) => {
          const IconComponent = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <li key={link.to} className="relative">
              <motion.div
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to={link.to}
                  className={`flex items-center gap-2 z-10 ${
                    isActive ? "text-primary-content" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent size={18} />
                  </motion.div>
                  {link.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-lg z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            </li>
          );
        })}
      </ul>

      {/* Notificaciones y Perfil */}
      <div className="flex-none flex items-center gap-4">
        {/* Notificaciones */}
        <div ref={notificationRef} className="relative">
          <motion.button
            className="btn btn-ghost btn-circle"
            variants={bellVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsNotificationOpen((o) => !o)}
          >
            <div className="indicator">
              <Bell size={20} />
              <motion.span
                className="badge badge-xs badge-secondary indicator-item"
                variants={badgeVariants}
                animate="animate"
              >
                8
              </motion.span>
            </div>
          </motion.button>
          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-52 bg-base-100 shadow-lg border border-base-300 rounded-lg z-10"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-4">
                  <span className="block text-lg font-bold">
                    8 Notificaciones
                  </span>
                  <span className="block text-sm text-info">
                    Nuevas actualizaciones
                  </span>
                  <motion.button
                    className="btn btn-primary btn-sm w-full mt-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={16} className="mr-1" /> Ver todas
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Perfil */}
        <div ref={profileRef} className="relative">
          <motion.button
            className="btn btn-ghost btn-circle avatar"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProfileOpen((o) => !o)}
          >
            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
              <span className="text-sm font-bold">
                {user?.first_name?.charAt(0) ||
                  user?.username?.charAt(0) ||
                  "U"}
              </span>
            </div>
          </motion.button>
          <AnimatePresence>
            {isProfileOpen && (
              <motion.ul
                className="absolute right-0 mt-2 w-52 bg-base-100 shadow-lg border border-base-300 rounded-lg z-10 py-2"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <li>
                  <motion.a
                    className="flex items-center px-4 py-2 justify-between hover:bg-base-200"
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-center gap-2">
                      <User size={16} /> <span>Perfil</span>
                    </div>
                    <span className="badge badge-sm badge-secondary">
                      Nuevo
                    </span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    className="flex items-center px-4 py-2 hover:bg-base-200"
                    whileHover={{ x: 2 }}
                  >
                    <Settings size={16} /> <span>Configuración</span>
                  </motion.a>
                </li>
                <li className="divider my-1" />
                <li>
                  <Link to={ROUTES.LOGOUT}>
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 text-error hover:bg-base-200"
                      whileHover={{ x: 2 }}
                    >
                      <LogOut size={16} /> <span>Cerrar sesión</span>
                    </motion.div>
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
