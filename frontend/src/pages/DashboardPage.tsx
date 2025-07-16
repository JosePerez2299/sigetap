import { useEffect } from "react";
import { proyectosServices } from "../services/proyectosServices";
import { useState } from "react";
import type { ProyectoType } from "../types/generalTypes";

const DashboardPage = () => {

  const [proyectos, setProyectos] = useState<ProyectoType[]>([]);
  const [loading, setLoading] = useState(false);
  const getProyectos = async () => {
    try {
      setLoading(true);
      const response: ProyectoType[] = await proyectosServices.getAll();
      setProyectos(response);
      setLoading(false);
    } catch (error) { 
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProyectos();
  }, []);
  return (
    <div>
      {loading ? (
        <div>Cargando proyectos...</div>
      ) : (
        <div>Proyectos: {JSON.stringify(proyectos)}</div>
      )}
    </div>
  );


};

export default DashboardPage;
