import { privateApi } from "../api/privateApi";
import { urls } from "../api/urls";
import type { ProyectoType } from "../types/generalTypes";

const getAll = async (): Promise<ProyectoType[]> => {
    const {data}: {data: ProyectoType[]} = await privateApi.get(urls.proyectos);
    return data;
};

export const proyectosServices = {
    getAll,
};
    