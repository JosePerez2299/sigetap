import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";

import { proyectosServices } from "../../services/proyectosServices";
import Table, { type ColumnProps } from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useUser } from "../../hooks/getUser";
import type { ProyectoType, EstadoProyectoType } from "../../types/generalTypes";

/**
 * Opciones disponibles para filtrar proyectos por estado
 */
const FILTER_OPTIONS: (EstadoProyectoType | "todos")[] = [
  "todos",
  "Planificado", 
  "Ejecucion",
  "Pausado",
  "Finalizado"
];

/**
 * Opciones disponibles para ordenar los proyectos
 */
const SORT_OPTIONS = [
  { value: "nombre", label: "Nombre" },
  { value: "fecha_inicio", label: "Fecha de inicio" },
  { value: "fecha_fin", label: "Fecha de fin" }
];

/**
 * Configuración de paginación por defecto
 */
const DEFAULT_PAGE_SIZE = 4;
const DEFAULT_PAGE = 1;

/**
 * Interface para el estado de filtros
 */
interface FiltersState {
  searchTerm: string;
  filterBy: EstadoProyectoType | "todos";
  sortBy: string;
  page: number;
  pageSize: number;
  unidad: string;
}

/**
 * Componente principal para la gestión y visualización de proyectos
 * Incluye funcionalidades de búsqueda, filtrado, ordenamiento y paginación
 */
const Proyectos: React.FC = () => {

 const INITIAL_FILTERS: FiltersState = {
   searchTerm: "",
   filterBy: "todos",
   sortBy: "nombre",
   page: DEFAULT_PAGE,
   pageSize: DEFAULT_PAGE_SIZE,
   unidad: "",
 };
 
  // Hooks y estado
  const { user, isLoading: isLoadingUser } = useUser();

  
  // Estado unificado para todos los filtros
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);

  // Query para obtener los proyectos
  const { data, isLoading: isLoadingProyectos, isError: isErrorProyectos, error: errorProyectos } = useQuery({
    queryKey: ["proyectos", filters.page, filters.pageSize, filters.searchTerm, filters.filterBy, filters.sortBy],
    queryFn: () =>
      proyectosServices.getAll({
        page: filters.page,
        pageSize: filters.pageSize,
        searchTerm: filters.searchTerm,
        filterBy: filters.filterBy,
        sortBy: filters.sortBy,
        unidad: filters.unidad,
      }),
      enabled: !!user ,
  });


  const isLoading = isLoadingProyectos || isLoadingUser;
  const isError = isErrorProyectos;
  const error = errorProyectos;
  
  /**
   * Configuración de columnas para la tabla de proyectos
   */
  const columns: Array<ColumnProps<ProyectoType>> = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "nombre", 
      title: "Nombre",
    },
    {
      key: "estado",
      title: "Estado",
      render: (_, record) => {
        const badgeColors = {
          Planificado: "badge-info",
          Ejecucion: "badge-warning", 
          Pausado: "badge-error",
          Finalizado: "badge-success"
        };
        
        const colorClass = badgeColors[record.estado as EstadoProyectoType] || "badge-neutral";
        
        return (
          <div className={`badge ${colorClass} badge-sm font-medium`}>
            {record.estado}
          </div>
        );
      },
    },
    { key: "unidad_responsable", title: "Unidad responsable" },


  ];

  /**
   * Handler universal para todos los cambios de filtros
   */
  const handleFilterChange = (updates: Partial<FiltersState>) => {
    setFilters(prev => ({
      ...prev,
      ...updates,
      // Resetear página solo si no es un cambio de página
      page: updates.page !== undefined ? updates.page : DEFAULT_PAGE
    }));
  };

  /**
   * Formatea las opciones de filtro para mostrar
   */
  const getFilterDisplayName = (option: EstadoProyectoType | "todos"): string => {
    return option === "todos" ? "Todos los estados" : option;
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header con título */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-base-content">
          Gestión de Proyectos
        </h1>
        <p className="text-base-content/70 mt-2">
          Administra y visualiza todos tus proyectos
        </p>

        <div className="flex justify-end">
          <button className="btn btn-primary">Agregar Proyecto</button>
        </div>

        <div className="flex justify-end">
          {JSON.stringify(user)}
        </div>
      </div>

      {/* Panel de filtros y búsqueda mejorado */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            
            {/* Búsqueda */}
            <div className="form-control flex-1 min-w-0">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FontAwesomeIcon icon={faSearch} className="text-sm" />
                  Buscar proyectos
                </span>
              </label>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Buscar por nombre..."
                  className="input input-bordered w-full focus:input-primary"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
                />
              </div>
            </div>


            {/* Ordenamiento */}
            <div className="form-control min-w-48">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FontAwesomeIcon icon={faSort} className="text-sm" />
                  Ordenar por
                </span>
              </label>
              <select 
                className="select select-bordered w-full focus:select-accent"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

      

          {/* Filtros activos de manera compacta */}
          {(filters.searchTerm || filters.filterBy !== "todos") && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-base-300">
              <span className="text-sm text-base-content/70">Filtros activos:</span>
              
              {filters.searchTerm && (
                <div className="badge badge-primary gap-2">
                  <FontAwesomeIcon icon={faSearch} className="w-3 h-3" />
                  "{filters.searchTerm}"
                  <button 
                    onClick={() => handleFilterChange({ searchTerm: "" })} 
                    className="hover:text-primary-content/80"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              {filters.filterBy !== "todos" && (
                <div className="badge badge-secondary gap-2">
                  <FontAwesomeIcon icon={faFilter} className="w-3 h-3" />
                  {filters.filterBy}
                  <button 
                    onClick={() => handleFilterChange({ filterBy: "todos" })}
                    className="hover:text-secondary-content/80"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                  </button>
                </div>
              )}
              {/* Filtro por estado */}
            <div className="filter">
              <input className="btn filter-reset" type="radio" name="metaframeworks" aria-label="All"/>
              {FILTER_OPTIONS.map((option) => (
                <input className="btn" type="radio" name="metaframeworks" aria-label={option}/>
              ))}
            </div>
              <button 
                className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content"
                onClick={() => setFilters(INITIAL_FILTERS)}
                type="button"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* Estadísticas */}
          <div className="flex items-center justify-end mt-3">
            <div className="badge badge-neutral badge-lg">
              <FontAwesomeIcon icon={faSearch} className="w-3 h-3 mr-1" />
              {data?.count || 0} resultado{(data?.count || 0) !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          
          {/* Estado de carga */}
          {isLoading && (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton h-12 w-full"></div>
                ))}
              </div>
            </div>
          )}

          {/* Estado de error */}
          {isError && (
            <div className="p-6">
              <div className="alert alert-error">
                <FontAwesomeIcon icon={faXmark} />
                <span>Error al cargar los proyectos: {error?.message}</span>
              </div>
            </div>
          )}

          {/* Tabla de proyectos */}
          {data && (
            <>
              {data.count > 0 ? (
                <>
                  <div className="overflow-x-auto max-h-[60vh]">
                    <Table columns={columns} data={data.data} />
                  </div>
                  
                  {/* Paginación */}
                  <div className="p-4 border-t border-base-300 flex justify-center">
                    <Pagination
                      page={filters.page}
                      totalItems={data.count}
                      pageSize={filters.pageSize}
                      setPage={(page) => handleFilterChange({ page })}
                    />
                  </div>
                </>
              ) : (
                // Estado vacío mejorado
                <div className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-6xl text-base-content/20">📋</div>
                    <div>
                      <h3 className="text-lg font-semibold text-base-content">
                        No se encontraron proyectos
                      </h3>
                      <p className="text-base-content/70 mt-1">
                        {filters.searchTerm || filters.filterBy !== "todos" 
                          ? "Intenta ajustar los filtros de búsqueda"
                          : "Aún no tienes proyectos creados"
                        }
                      </p>
                    </div>
                    {(filters.searchTerm || filters.filterBy !== "todos") ? (
                      <div className="flex gap-2 mb-4">
                        <button 
                          className="btn btn-outline btn-sm btn-primary"
                          onClick={() => setFilters(INITIAL_FILTERS)}
                        >
                          <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                          Limpiar filtros
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proyectos;