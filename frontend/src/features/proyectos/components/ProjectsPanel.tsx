import type { ProjectsPanelProps } from "../types/Projects";
import ProjectsHeader from "./ProjectsHeader";
import { useProjects } from "../hooks/useProjects";
import ProjectsList from "./ProjectsList";
import Pagination from "../../../components/Pagination";

const ProjectsPanel: React.FC<ProjectsPanelProps> = ({
  unidad,
  filters,
  handleFilterChange,
}) => {
  const { data, isLoading, error } = useProjects(filters);

  return (
    <>
      <div className="card border border-base-300 bg-gradient-to-r from-base-100 via-base-100 to-primary/25 shadow-lg mb-4">
        <div className="card-body">
          <ProjectsHeader unidad={unidad}></ProjectsHeader>
        </div>
      </div>
      <div className="card border border-base-300  shadow-lg w-full">
        <div className="card-body">
          <ProjectsList
            projects={data?.data || []}
            count={data?.count || 0}
            currentPage={filters.page || 1}
            pageSize={filters.pageSize || 10}
            isLoading={isLoading}
            error={error}
          />
          <Pagination
            page={filters.page || 1}
            pageSize={filters.pageSize || 10}
            totalItems={data?.count || 0}
            setPage={(page) => handleFilterChange({ page })}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsPanel;
