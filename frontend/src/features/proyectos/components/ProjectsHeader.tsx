import type React from "react";
import type { ProjectsHeaderProps } from "../types/Projects";
import { LucidePlus as PlusIcon } from "lucide-react";

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ unidad }) => {
  return (
    <>
      {/* Header principal */}
      <div className="flex items-center justify-between mb-4">
        <div className="card-title">
          {unidad ? (
            <div className="flex items-center gap-2">
              <div className="badge badge-md badge-primary badge-outline truncate">
                {unidad?.nombre}
              </div>
              <div className="badge badge-sm badge-secondary badge-outline">
                {/* Aquí podrías mostrar el número total de proyectos */}
                24 proyectos
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-medium text-base-content/70">
              Seleccione una unidad
            </h1>
          )}
        </div>

        {/* Botón agregar proyecto */}
        {unidad && (
          <button className="btn btn-primary btn-sm gap-2">
            <PlusIcon size={16} />
            Añadir
          </button>
        )}
      </div>
    </>
  );
};

export default ProjectsHeader;
