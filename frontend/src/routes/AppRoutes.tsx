import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/HomePage';
import About from '../pages/AboutPage';
import Dashboard from '../pages/DashboardPage';
import PrivateRoute from './PrivateRoutes';
import ROUTES from './Routes';

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Rutas privadas, debe estar autenticado */}
    <Route path={ROUTES.HOME} element={<PrivateRoute />}>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;