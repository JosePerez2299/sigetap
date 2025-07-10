import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/RootState';

const PublicRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => true);

  // Si está logueado, redirige al dashboard (o home)
  return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;