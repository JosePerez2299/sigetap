import { useEffect, useState } from "react";
import type { EstadoProyectoType, ProyectoType } from "../types/generalTypes";
import { proyectosServices } from "../services/proyectosServices";
import { handleErrorMessage } from "../utils/handleErrorMessage";

interface Filters {
  page: number;
  pageSize: number;
  sortBy: string;
  filterBy: EstadoProyectoType | "todos";
  searchTerm: string;
  currentPage: number;
}

// Custom hook para proyectos filtrados
export const useProyectos = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    pageSize: 4,
    sortBy: "nombre",
    filterBy: "todos",
    searchTerm: "",
    currentPage: 1,
  });

  const [proyectos, setProyectos] = useState<ProyectoType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(4);
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
      const result = await proyectosServices.getAll(
        filters.page,
        filters.pageSize,
        filters.sortBy,
        filters.filterBy,
        filters.searchTerm
      );
      setProyectos(result.proyectos);
      setTotalItems(result.totalItems);
      setPageSize(result.pageSize);
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
  }, [filters]);
  return {
    proyectos,
    totalItems,
    pageSize,
    estadisticas,
    loading,
    error,
    filters,
    setFilters,
  };
};
