import type React from "react";
import type { ProjectsHeaderProps } from "../types/Projects";
import { Building2, LucidePlus as PlusIcon } from "lucide-react";

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ unidad }) => {
  return (
    <>
      {/* Header principal */}
      <div className="flex items-center justify-between">
        <div className="card-title">
          {unidad ? (
            <div>
              <h3 className="text-xl text-primary font-bold">
                {unidad.nombre}
              </h3>
              <p className="text-xs text-base-content/70 mt-1">
                <Building2 className="w-3 h-3 inline mr-1" /> {unidad.codigo}
              </p>

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
