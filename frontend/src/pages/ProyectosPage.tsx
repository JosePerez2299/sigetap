import Proyectos2 from "../features/proyectos/Proyectos2";
import { useSelector } from "react-redux";
import type { RootState } from "../store/RootState";
const ProyectosPage = () => {
  const loading= useSelector((state: RootState) => state.loading.count > 0);

  
  return (
    <>
      
      <Proyectos2 />
    </>
  );
};

export default ProyectosPage;
