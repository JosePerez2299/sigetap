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
export const useProyectos = ({
  page,
  pageSize,
  sortBy,
  filterBy,
  searchTerm,
}: {
  page: number;
  pageSize: number;
  sortBy: string;
  filterBy: EstadoProyectoType | "todos";
  searchTerm: string;
}) => {
  const [filters, setFilters] = useState<Filters>({
    page: page,
    pageSize: pageSize,
    sortBy: sortBy,
    filterBy: filterBy,
    searchTerm: searchTerm,
    currentPage: page,
  });

  const [proyectos, setProyectos] = useState<ProyectoType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
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
      const result = await proyectosServices.getAll({
        page: filters.page,
        pageSize: filters.pageSize,
        sortBy: filters.sortBy,
        filterBy: filters.filterBy,
        searchTerm: filters.searchTerm,
      });
      setProyectos(result.data);
      setTotalItems(result.count);
    } catch (error) {
      console.log(error);
      setError(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProyectos();
  }, [
    filters.page,
    filters.pageSize,
    filters.sortBy,
    filters.filterBy,
    filters.searchTerm,
  ]);
  return {
    proyectos,
    totalItems,
    estadisticas,
    loading,
    error,
    filters,
    setFilters,
  };
};
