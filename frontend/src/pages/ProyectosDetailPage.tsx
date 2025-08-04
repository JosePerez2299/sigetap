import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProyectoType } from "../types/generalTypes";
import { privateApi } from "../api/privateApi";
import { urls } from "../api/urls";

const ProyectosDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [proyecto, setProyecto] = useState<ProyectoType | null>(null);
  const fetchProyecto = async () => {
    try {
      const response = await privateApi.get(urls.proyectos + `${id}`);
      const data = await response.data;
      setProyecto(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!id) {
      navigate("/proyectos");
    }

    fetchProyecto();
  }, [id]);

  return (
    <div>
      <h1>Proyecto: {id}</h1>
      <p>{proyecto?.nombre}</p>
      <p>{proyecto?.codigo}</p>
      <p>{proyecto?.estado}</p>
    </div>
  );
};

export default ProyectosDetailPage;
