import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import {
  LoginPage,
  NotFound404,
  Dashboard,
  ProyectosPage,
  AuditoryPage,
  StatsPage,
} from "../pages/index";
import HomePage from "../pages/HomePage";
import Logout from "../pages/Logout";
import ROUTES from "./Routes";
import ProyectDetailLayout from "../layouts/ProyectDetailLayout";
import BoardPanel from "../features/proyectos/components/BoardPanel";
import GanttPanel from "../features/proyectos/components/GanttPanel";
import CalendarPanel from "../features/proyectos/components/CalendarPanel";
import FilesPanel from "../features/proyectos/components/FilesPanel";

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas públicas */}
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        {/* Rutas privadas */}
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROYECTOS} element={<ProyectosPage />} />
            <Route path={ROUTES.AUDITORY} element={<AuditoryPage />} />
            <Route path={ROUTES.STATS} element={<StatsPage />} />
            <Route path={ROUTES.LOGOUT} element={<Logout />} />

            {/* Detalle de proyecto con rutas hijas */}
            <Route
              path={`${ROUTES.PROYECTOS}/:id`}
              element={<ProyectDetailLayout />}
            >
              <Route index element={<Navigate to="tableros" replace />} />
              <Route path="tableros" element={<BoardPanel />} />
              <Route path="gantt" element={<GanttPanel />} />
              <Route path="calendar" element={<CalendarPanel />} />
              <Route path="files" element={<FilesPanel />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </AnimatePresence>  
  );
};

export default AppRoutes;
