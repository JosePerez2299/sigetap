import { Funnel, FunnelX, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import type { FiltersState, ProjectsFiltersProps } from "../types/Projects";
import type { EstadoProyectoType } from "../../../types/generalTypes";

const ProjectsFilters2: React.FC<ProjectsFiltersProps> = ({
  showFilters,
  setShowFilters,
  filters,
  resetFilters,
  onFilterChange,
}) => {
  // Estado local para el valor del input
  const [inputValue, setInputValue] = useState(filters?.searchTerm || "");

  // Valor debounced con 500ms de retraso - CORRECCIÓN AQUÍ
  const [debouncedValue, setDebouncedValue] = useDebounce(inputValue, 500);

  const FILTER_OPTIONS: { label: string; value: EstadoProyectoType | "" }[] = [
    { label: "Todos", value: "" },
    { label: "Planificado", value: "Planificado" },
    { label: "Ejecucion", value: "Ejecucion" },
    { label: "Pausado", value: "Pausado" },
    { label: "Finalizado", value: "Finalizado" },
  ];

  useEffect(() => {
    if (debouncedValue !== filters.searchTerm) {
      onFilterChange?.({ searchTerm: debouncedValue, page: 1 });
    }
  }, [debouncedValue, filters.searchTerm]);

  useEffect(() => {
    setInputValue("");
  }, [filters.unidadId]);

  return (
    <div>
      {filters.unidadId !== 0 && (
        <div className="card w-full border border-base-300 shadow-lg mb-4">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h3 className="card-title">Panel de filtros</h3>
              {/* Boton de filtros */}
              <div
                className="tooltip"
                data-tip={showFilters ? "Ocultar filtros" : "Mostrar filtros"}
              >
                <button
                  className={`btn btn-circle btn-ghost  ${
                    showFilters ? "btn-active " : ""
                  }`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? (
                    <FunnelX className="text-error font-bold" size={18} />
                  ) : (
                    <Funnel size={18} />
                  )}
                </button>
              </div>
            </div>
            <div className="join">
              <input
                type="text"
                placeholder="Buscar"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="input input-bordered join-item w-2/3"
              />
              <select
                name=""
                id=""
                className="select select-bordered join-item w-1/3"
                value={filters.filterBy ? filters.filterBy : ""}
                onChange={(e) =>
                  onFilterChange?.({
                    filterBy: e.target.value as EstadoProyectoType,
                    page: 1,
                  })
                }
              >
                <option disabled defaultValue="" selected>
                  Estado
                </option>
                {FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Mostrar filtros */}

            <div
              className={`transition-all duration-200  grid grid-cols-2 bg-base-200 rounded-box text-xs ${
                showFilters ? "h-auto opacity-100" : " opacity-0 h-0"
              }`}
            >
              <div>
                <label className="label label-xs">Fecha inicio</label>
                <input type="date" className="input input-bordered" />
              </div>
              <div>
                <label className="label label-xs">Fecha fin</label>
                <input type="date" className="input input-bordered" />
              </div>
            </div>

            <div className="">
              <p className="text-sm text-base-content/70">Filtros aplicados</p>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="btn badge-outline badge badge-sm badge-secondary">
                  {" "}
                  Planificado
                  <XIcon size={16} />
                </button>
                <button className="btn badge-outline badge badge-sm badge-warning">
                  {" "}
                  Ejecución
                </button>
                <button className="btn badge-outline badge badge-sm badge-error">
                  {" "}
                  Pausado
                </button>
                <button className="btn badge-outline badge badge-sm badge-success">
                  {" "}
                  Finalizado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsFilters2;
