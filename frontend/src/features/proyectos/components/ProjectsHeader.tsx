import type React from "react";
import type { ProjectsHeaderProps } from "../types/Projects";
import { LucidePlus  as PlusIcon} from "lucide-react";
 
const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  unidad,
  filters,
  className,
}) => {
  const filterOptions = ["opcion 1", "opcion 2", "opcion 3"];
  return (
    <>
      <div className="card mb-2 w-full bg-base-100">
        <div className="card-body">
          {/* Header principal */}
          <div className="card-title">
            {unidad ? (
              <p>Proyectos de la unidad: {unidad?.nombre}</p>
            ) : (
              <h1>seleccione una </h1>
            )}
          </div>

          {/* filtrado */}
          {unidad && (
            <div>
              <form className="filter">
                {filterOptions.map((option) => (
                  <input
                    className="btn btn-square btn-sm"
                    type="radio"
                    name="frameworks"
                    aria-label={option}
                  />
                ))}

                <input
                  className="btn btn-square bg-error text-error-content btn-sm"
                  type="reset"
                  value="x"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsHeader;
