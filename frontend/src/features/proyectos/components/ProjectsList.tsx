import type { ProyectoType } from "../../../types/generalTypes";
import type { ColumnProps } from "../../../components/Table";
import Table from "../../../components/Table";
import type { EstadoProyectoType } from "../../../types/generalTypes";
import { formatDate } from "../../../utils/formatDate";
import getEstadoColor from "../../../utils/getProyectStateColor";
import { Building2, Calendar, User } from "lucide-react";
import ProjectCard from "./ProjectCard";
const ProjectsList = ({
  projects,
  isLoading,
  error,
}: {
  projects?: Array<ProyectoType>;
  isLoading: boolean;
  error: Error | null;
}) => {
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
      render: (_, record: ProyectoType) => {
        const badgeColors = {
          Planificado: "badge-info",
          Ejecucion: "badge-warning",
          Pausado: "badge-error",
          Finalizado: "badge-success",
        };

        const colorClass =
          badgeColors[record.estado as EstadoProyectoType] || "badge-neutral";

        return (
          <div className={`badge ${colorClass} badge-sm font-medium`}>
            {record.estado}
          </div>
        );
      },
    },
    { key: "unidad_responsable", title: "Unidad responsable" },
  ];

  return (
    <div className="relative min-h-[400px]">
      {/* Loading Skeleton */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
          isLoading
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header skeleton */}
        <div className="h-16 skeleton mb-4 rounded-lg"></div>

        {/* Table skeleton */}
        <div className="space-y-3">
          {/* Table header skeleton */}
          <div className="h-12 skeleton rounded-lg"></div>

          {/* Table rows skeleton */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-16 skeleton rounded-lg"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full mx-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Error al cargar proyectos
                </h3>
                <p className="text-sm text-red-600 mt-1">{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && projects && projects.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No hay proyectos
            </h3>
            <p className="text-gray-500">
              No se encontraron proyectos que coincidan con los filtros
              aplicados.
            </p>
          </div>
        </div>
      )}

      {/* Content (Table) */}
      <ul className="list bg-base-100  space-y-2">


        {projects?.map((proyecto) => (
          <ProjectCard key={proyecto.id} proyecto={proyecto} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
