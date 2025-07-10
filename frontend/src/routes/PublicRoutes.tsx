import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/RootState";
import ROUTES from "./Routes";

const PublicRoute = () => {
  
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  console.log(isAuthenticated);
  // Si está autenticado, redirige al dashboard (o home)
  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};

export default PublicRoute;
