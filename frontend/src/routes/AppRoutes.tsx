import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import { LoginPage, NotFound404, Dashboard, About } from "../pages/index";
import HomePage from "../pages/HomePage";


const AppRoutes: React.FC = () => (
  <Routes>
    # Rutas publicas
    <Route path="/" element={<PublicRoute/>}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
      
    # Rutas privadas
    <Route path="/" element={<PrivateRoute />}>
      <Route element={<MainLayout />}>
      <Route path="/home" element={<HomePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound404 />} />
  </Routes>
);


export default AppRoutes;
