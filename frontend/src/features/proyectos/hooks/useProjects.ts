import { useQuery } from "@tanstack/react-query";
import { proyectosServices } from "../services/proyectosServices";
import { type FiltersState } from "../types/Projects";

export const useProjects = (filtersParams?: FiltersState) => {
  const query = useQuery({
    queryKey: ["projects", filtersParams],
    queryFn: () => proyectosServices.getAll(filtersParams!),
    enabled: !!filtersParams?.unidadId,
  });

  return {
    ...query,
    filtersParams,
    // Si no hay filtersParams, sobrescribe el estado
    data: !filtersParams ? null : query.data,
    isLoading: !filtersParams ? false : query.isLoading,
    error: !filtersParams ? null : query.error,
  };
};