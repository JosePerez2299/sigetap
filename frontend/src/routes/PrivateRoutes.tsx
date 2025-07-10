
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/RootState';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => true); // Replace with actual authentication logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
