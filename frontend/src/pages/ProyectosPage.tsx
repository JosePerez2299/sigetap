import Proyectos from "../features/proyectos/Proyectos";
import { useSelector } from "react-redux";
import type { RootState } from "../store/RootState";
const ProyectosPage = () => {
  const loading= useSelector((state: RootState) => state.loading.count > 0);

  
  return (
    <>
      
      <Proyectos />
    </>
  );
};

export default ProyectosPage;
