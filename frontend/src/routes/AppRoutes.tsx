import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import { LoginPage, NotFound404, Dashboard, ProyectosPage, AuditoryPage, StatsPage } from "../pages/index";
import HomePage from "../pages/HomePage";
import Logout from "../pages/Logout";
import ROUTES from "./Routes";


const AppRoutes: React.FC = () => (
  <Routes>
    {/* Rutas publicas */}
    <Route path="/" element={<PublicRoute/>}>
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
      </Route>
    </Route>
    <Route path="*" element={<NotFound404 />} />
  </Routes>
);


export default AppRoutes;
