import { privateApi } from "../api/privateApi";
import { urls } from "../api/urls";
import {
  type ProyectoTypeResponse,
} from "../types/generalTypes";
import { handleErrorMessage } from "../utils/handleErrorMessage";
import { type FiltersState } from "../features/proyectos/types/Projects";

const getAll = async (filters: FiltersState): Promise<ProyectoTypeResponse> => {
  const { page, pageSize, sortBy, filterBy, searchTerm, unidadId } = filters;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await privateApi.get(urls.proyectos, {
      params: {
        page,
        page_size: pageSize,
        ordering: sortBy,
        estado: filterBy === "todos" ? "" : filterBy,
        search: searchTerm,
        unidad_responsable: unidadId,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};

export const proyectosServices = {
  getAll,
};
