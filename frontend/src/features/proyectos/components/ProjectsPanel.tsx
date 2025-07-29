import React, { useEffect } from "react";
import type { ProjectsPanelProps } from "../types/Projects";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsFilters from "./ProjectsFilters";
import { useProjects } from "../hooks/useProjects";
import ProjectsList from "./ProjectsList";
const ProjectsPanel: React.FC<ProjectsPanelProps> = ({ unidad }) => {
  const { data: projects, isLoading, error, filters } = useProjects(unidad.id);

  useEffect(() => {
    filters.handleFilterChange({ unidadId: unidad.id });
  }, [unidad.id]);

  return (
    <>
      <div className="card border border-base-300 shadow-lg mb-4">
        <div className="card-body">
          <ProjectsHeader
            unidad={unidad}
            showFilters={filters.showFilters}
            setShowFilters={filters.setShowFilters}
          ></ProjectsHeader>

          <ProjectsFilters
            showFilters={filters.showFilters}
            setShowFilters={filters.setShowFilters}
            filters={filters.filters}
            onFilterChange={filters.handleFilterChange}
          />
        </div>
      </div>
      <div className="card border border-base-300 shadow-lg w-full">
        <div className="card-body">
          <ProjectsList
            projects={projects?.data}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsPanel;
