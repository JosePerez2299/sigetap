import { privateApi } from "../api/privateApi";
import { urls } from "../api/urls";
import {
  ProyectoSchemaResponse,
  UnidadSchemaResponse,
  type ProyectoType,
  type ProyectoTypeResponse,
  type UnidadType,
  type UnidadTypeResponse,
} from "../types/generalTypes";
import { type EstadoProyectoType } from "../types/generalTypes";

const getAll = async ({
  page,
  pageSize,
  sortBy,
  filterBy,
  searchTerm,
}: {
  page: number;
  pageSize: number;
  sortBy: string;
  filterBy: EstadoProyectoType | "todos" | "";
  searchTerm: string;
}): Promise<ProyectoTypeResponse> => {
  console.log(
    "getAll",
    "page:",
    page,
    "pageSize:",
    pageSize,
    "sortBy:",
    sortBy,
    "filterBy:",
    filterBy,
    "searchTerm:",
    searchTerm
  );

  if (filterBy === "todos") {
    filterBy = "";
  }

  const response = await privateApi.get(urls.proyectos, {
    params: {
      page,
      page_size: pageSize,
      ordering: sortBy,
      estado: filterBy,
      search: searchTerm,
    },
  });

  console.log(response.data);

  return response.data;
  const lider = {
    id: 1,
    email: "lider1@example.com",
    username: "lider1",
    first_name: "Lider 1",
    last_name: "Lider 1",
    nom_unidad: "Unidad 1",
    nom_gerencia_general: "Gerencia General 1",
    nom_coordinacion: "Coordinacion 1",
    nom_departamento: "Departamento 1",
    p00: "P00 1",
  };
  let data: ProyectoType[] = [];
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  data = [
    {
      id: 1,
      nombre: "Proyecto 1",
      descripcion: "Descripción del proyecto 1",
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      estado: "Planificado",
      unidad_responsable: "Unidad 1",
      miembros_total: 5,
      lider: lider,
      codigo: "C001",
      tareas_completadas: 0,
      tareas_total: 0,
      tareas_pendientes: 0,
    },
    {
      id: 2,
      nombre: "Proyecto 2",
      descripcion: "Descripción del proyecto 2",
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      estado: "Planificado",
      unidad_responsable: "Unidad 2",
      miembros_total: 5,
      lider: lider,
      codigo: "C002",
      tareas_completadas: 0,
      tareas_total: 0,
      tareas_pendientes: 0,
    },
    {
      id: 3,
      nombre: "Proyecto 3",
      descripcion: "Descripción del proyecto 3",
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      estado: "Planificado",
      unidad_responsable: "Unidad 3",
      miembros_total: 5,
      lider: lider,
      codigo: "C003",
      tareas_completadas: 0,
      tareas_total: 0,
      tareas_pendientes: 0,
    },
    {
      id: 4,
      nombre: "Proyecto 4",
      descripcion: "Descripción del proyecto 4",
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      estado: "Planificado",
      unidad_responsable: "Unidad 4",
      miembros_total: 5,
      lider: lider,
      codigo: "C004",
      tareas_completadas: 0,
      tareas_total: 0,
      tareas_pendientes: 0,
    },
    {
      id: 5,
      nombre: "Proyecto 5",
      descripcion: "Descripción del proyecto 5",
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      estado: "Planificado",
      unidad_responsable: "Unidad 5",
      miembros_total: 5,
      lider: lider,
      codigo: "C005",
      tareas_completadas: 0,
      tareas_total: 0,
      tareas_pendientes: 0,
    },
  ];
  return ProyectoSchemaResponse.parse({
    estadisticas: {
      total: data.length,
      planificado: 5,
      ejecucion: 12,
      pausado: 2,
      finalizado: 5,
    },
    proyectos: data,
    totalItems: data.length,
    currentPage: page,
    pageSize: pageSize,
  });
};

const getAllUnidades = async (): Promise<UnidadTypeResponse> => {
  // const {data}: {data: UnidadType[]} = await privateApi.get(urls.unidades);
  let data: UnidadType[] = [];
  await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  data = [
    {
      id: 1,
      nombre: "Unidad 1",
      codigo: "C001",
      proyectos_total: 10,
      miembros_total: 5,
    },
    {
      id: 2,
      nombre: "Unidad 2",
      codigo: "C002",
      proyectos_total: 10,
      miembros_total: 5,
    },
    {
      id: 3,
      nombre: "Unidad 3",
      codigo: "C003",
      proyectos_total: 10,
      miembros_total: 5,
    },
  ];
  return UnidadSchemaResponse.parse({
    unidades: data,
    totalItems: data.length,
    currentPage: 1,
    pageSize: 4,
  });
};

export const proyectosServices = {
  getAll,
  getAllUnidades,
};
