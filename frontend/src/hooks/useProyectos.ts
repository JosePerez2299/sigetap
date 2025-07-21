import { useEffect, useState } from "react";
import type { ProyectoType } from "../types/generalTypes";
import { proyectosServices } from "../services/proyectosServices";
import { handleErrorMessage } from "../utils/handleErrorMessage";
export const useProyectos = () => {
  const [proyectos, setProyectos] = useState<ProyectoType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    planificado: 0,
    ejecucion: 0,
    pausado: 0,
    finalizado: 0,
  });
  const fetchProyectos = async () => {
    try {
      setLoading(true);
      const result = await proyectosServices.getAll(currentPage, pageSize);
      console.log("proyectos", result);
      setProyectos(result.proyectos);
      setTotalItems(result.totalItems);
      setPageSize(result.pageSize);
      setCurrentPage(result.currentPage);
      setEstadisticas(result.estadisticas);
    } catch (error) {
      console.log(error);
      setError(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProyectos();
  }, [currentPage]);
  return {
    proyectos,
    totalItems,
    pageSize,
    estadisticas,
    currentPage,
    loading,
    error,
    setCurrentPage,
  };
};
