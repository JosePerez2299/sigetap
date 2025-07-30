import { useQuery } from "@tanstack/react-query";
import { proyectosServices } from "../../../services/proyectosServices";
import { type FiltersState } from "../types/Projects";

export const useProjects = (filtersParams?: FiltersState) => {
  if (!filtersParams) {
    return {
      data: null,
      isLoading: false,
      error: null,
      filtersParams,
    };
  }

  const query = useQuery({
    queryKey: ["projects", filtersParams],
    queryFn: () => proyectosServices.getAll(filtersParams),
    enabled: !!filtersParams.unidadId,
  });

  return {
    ...query,
    filtersParams,
  };
};
