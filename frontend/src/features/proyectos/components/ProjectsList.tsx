import type { ProyectoType } from "../../../types/generalTypes";
import type { ColumnProps } from "../../../components/Table";
import Table from "../../../components/Table";
import type { EstadoProyectoType } from "../../../types/generalTypes";

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
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {projects && projects.length === 0 && <p>No proyectos encontrados</p>}
      {projects && projects.length > 0 && (
        <Table columns={columns} data={projects} />
      )}
    </>
  );
};

export default ProjectsList;
