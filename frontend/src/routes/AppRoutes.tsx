import { Routes, Route, useLocation } from "react-router-dom";
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
import ProyectosDetailPage from "../pages/ProyectosDetailPage";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas publicas */}
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        {/* Rutas privadas */}
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROYECTOS} element={<ProyectosPage />}/>
            <Route path={ROUTES.AUDITORY} element={<AuditoryPage />} />
            <Route path={ROUTES.STATS} element={<StatsPage />} />
            <Route path={ROUTES.LOGOUT} element={<Logout />} />
            <Route
              path={ROUTES.PROYECTOS + "/:id"}
              element={<ProyectosDetailPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;