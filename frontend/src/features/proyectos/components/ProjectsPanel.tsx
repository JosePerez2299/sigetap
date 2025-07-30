import React, { useEffect } from "react";
import type { ProjectsPanelProps } from "../types/Projects";
import ProjectsHeader from "./ProjectsHeader";
import { useProjects } from "../hooks/useProjects";
import ProjectsList from "./ProjectsList";
import Pagination from "../../../components/Pagination";

const ProjectsPanel: React.FC<ProjectsPanelProps> = ({
  filters,
  handleFilterChange,
}) => {
  const { data: projects, isLoading, error } = useProjects(filters);

  return (
    <>
      <div className="card border border-base-300 shadow-lg mb-4">
        <div className="card-body">
          <ProjectsHeader unidad={filters.unidadId}></ProjectsHeader>
        </div>
      </div>
      <div className="card border border-base-300 shadow-lg w-full">
        <div className="card-body">
          <ProjectsList
            projects={projects?.data}
            isLoading={isLoading}
            error={error}
          />
          <Pagination
            page={filters.page || 1}
            pageSize={filters.pageSize || 10}
            totalItems={projects?.count || 0}
            setPage={(page) => handleFilterChange({ page })}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsPanel;
