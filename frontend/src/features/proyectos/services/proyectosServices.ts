import { privateApi } from "../../../api/privateApi";
import { urls } from "../../../api/urls";
import {
  type ProyectoType,
  type ProyectoTypeResponse,
} from "../types/Projects";
import { throwServiceError } from "../../../utils/handleErrorMessage";
import { type FiltersState } from "../../../features/proyectos/types/Projects";

const getAll = async (filters: FiltersState): Promise<ProyectoTypeResponse> => {
  const { page, pageSize, sortBy, filterBy, searchTerm, unidadId } = filters;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await privateApi.get(urls.proyectos, {
      params: {
        page,
        page_size: pageSize,
        ordering: sortBy,
        estado: filterBy,
        search: searchTerm,
        unidad_responsable: unidadId,
      },
    });

    return response.data;
  } catch (error) {
    throw throwServiceError(error);
  }
};

const getOne = async (id: number): Promise<ProyectoType> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await privateApi.get(`${urls.proyectos}${id}/`);
    return response.data;
  } catch (error) {
    throw throwServiceError(error);
  }
};

export const proyectosServices = {
  getAll,
  getOne,
};
