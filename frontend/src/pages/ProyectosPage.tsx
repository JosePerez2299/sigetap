import Proyectos from "../features/proyectos/Proyectos";
import Unidades from "../features/proyectos/Unidades";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../store/RootState";
const ProyectosPage = () => {
  const loading= useSelector((state: RootState) => state.loading.count > 0);

  
  return (
    <>
      
      <Proyectos />
      <Divider sx={{ my: 2 }} />
      <Unidades />
    </>
  );
};

export default ProyectosPage;
