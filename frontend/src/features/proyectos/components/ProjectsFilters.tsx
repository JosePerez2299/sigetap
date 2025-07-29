import React, { useEffect, useState } from "react";
import { Funnel, FunnelX, Search, X } from "lucide-react";
import type { ProjectsFiltersProps } from "../types/Projects";
import type { EstadoProyectoType } from "../../../types/generalTypes";
import { useDebounce } from "use-debounce";

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({
  filters,
  showFilters,
  setShowFilters,
  onFilterChange,
}) => {
  // Opciones para el select de estado
  const FILTER_OPTIONS: (EstadoProyectoType | "Todos")[] = [
    "Todos",
    "Planificado",
    "Ejecucion",
    "Pausado",
    "Finalizado",
  ];

  // Estado local para el valor del input
  const [inputValue, setInputValue] = useState(filters?.searchTerm || "");

  // Valor debounced con 500ms de retraso - CORRECCIÓN AQUÍ
  const [debouncedValue, setDebouncedValue] = useDebounce(inputValue, 500);

  const isActiveFilters = filters?.filterBy !== undefined || inputValue !== "";
  // Funcion para manejar el cambio del input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearFilters = () => {
    onFilterChange?.({
      filterBy: undefined,
    });
    clearSearchFilters();
  };

  // Funcion para limpiar los filtros
  const clearSearchFilters = () => {
    setInputValue("");
    setDebouncedValue("");
  };

  // Cuando cambie el valor debounced, notificamos al parent
  useEffect(() => {
    onFilterChange?.({ searchTerm: debouncedValue });
  }, [debouncedValue]);

  return (
    <div>
      {/* Header de filtros */}
      <div className="flex items-end justify-between gap-2 mb-4">
        {/* Buscador */}
        <div className="flex-1 join">
          <div className="w-full join-item">
            <label className="label">
              <span className="label-text">Buscar</span>
            </label>
            <label className="input w-full">
              <Search className="w-4 h-4" />
              <input
                type="search"
                placeholder="Buscar por nombre de proyecto o lider"
                value={inputValue}
                onChange={handleInputChange}
              />
            </label>
          </div>

          {/* Filtros por estado del proyecto*/}
          <div className="join-item min-w-fit">
            <label className="label">
              <span className="label-text">Estado</span>
            </label>
            <select
              className="select"
              value={
                filters?.filterBy !== undefined ? filters?.filterBy : "Todos"
              }
              onChange={(e) =>
                onFilterChange?.({
                  filterBy:
                    e.target.value === "Todos"
                      ? undefined
                      : (e.target.value as EstadoProyectoType),
                })
              }
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Boton de filtros */}
        <div
          className="tooltip"
          data-tip={showFilters ? "Ocultar filtros" : "Mostrar filtros"}
        >
          <button
            className={`btn btn-square ${showFilters ? "btn-active " : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? (
              <FunnelX className="text-error" size={18} />
            ) : (
              <Funnel size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div
        className={`mt-4 bg-base-300 rounded-box overflow-hidden transition-all duration-300 ease-in-out ${
          showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Fecha de inicio</span>
            </label>
            <input type="date" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Fecha de fin</span>
            </label>
            <input type="date" className="input input-bordered" />
          </div>
        </div>
      </div>

      {/* filtros activos */}
      {isActiveFilters && (
        <div className="mt-4" >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold mb-2">Filtros activos</h2>
            <button
              onClick={clearFilters}
              className="btn btn-outline btn-xs gap-2"
            >
              Limpiar filtros
            </button>
          </div>
          <div className="flex items-center gap-2">
            {filters?.filterBy !== undefined && (
              <button
                onClick={() => onFilterChange?.({ filterBy: undefined })}
                className="btn btn-outline btn-secondary btn-sm gap-2"
              >
                {filters?.filterBy} <X size={16} />
              </button>
            )}
            {inputValue !== "" && (
              <button
                onClick={clearSearchFilters}
                className="btn btn-outline btn-primary btn-sm gap-2"
              >
                {inputValue} <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsFilters;
