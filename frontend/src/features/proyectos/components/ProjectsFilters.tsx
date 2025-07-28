import React from "react";
import { Funnel, FunnelX } from "lucide-react";
import type { ProjectsFiltersProps } from "../types/Projects";

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({
  filters,
  showFilters,
  setShowFilters,
}) => {
  return (
    <div>
      {/* Header de filtros */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {/* Buscador */}
        <div className="w-full">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Buscar"
          />
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
      {showFilters && (
        <div className="bg-base-300 rounded-box p-4">
          <div className="grid grid-cols-2 gap-2">
            <select className="select select-bordered">
              <option disabled selected>
                Filtar por
              </option>
              <option>Fecha de inicio</option>
              <option>Fecha de fin</option>
              <option>Lider</option>
            </select>
            <input type="date" className="input input-bordered" />
            <input type="date" className="input input-bordered" />
            <select className="select select-bordered">
              <option>Fecha de fin</option>
              <option>Lider</option>
            </select>
          </div>
        </div>
      )}

      {/* filtros activos */}
      {true && (
        <div className="mt-4">
          <h2 className="text-sm font-semibold mb-2">Filtros activos</h2>
          <div className="flex items-center gap-2">
            <span className="badge badge-outline">32 proyectos</span>
            <span className="badge badge-outline">Fecha de fin</span>
            <span className="badge badge-outline">Lider</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsFilters;
