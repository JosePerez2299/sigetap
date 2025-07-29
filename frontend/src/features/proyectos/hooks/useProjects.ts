import { useQuery } from "@tanstack/react-query";
import { proyectosServices } from "../../../services/proyectosServices";
import { useFilters } from "./useFilters";
import { type FiltersState } from "../types/Projects";

export const useProjects = (unidadId: number) => {
  const initialFilters: FiltersState = {
    searchTerm: "",
    filterBy: undefined,
    sortBy: "nombre",
    page: 1,
    pageSize: 10,
    unidadId: unidadId,
  };
  const filters = useFilters(initialFilters);

  const query = useQuery({
    queryKey: [
      "projects",
      ...Object.values(filters.filters),
    ],
    queryFn: () => proyectosServices.getAll(filters.filters),
    enabled: !!unidadId,
  });

  return {
    ...query,
    filters,
  };
};
