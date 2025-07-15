import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/RootState";
import ROUTES from "./Routes";

const PublicRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // Si está autenticado, redirige al dashboard (o home)
  return user ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Outlet />;
};

export default PublicRoute;
