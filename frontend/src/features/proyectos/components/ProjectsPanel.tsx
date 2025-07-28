import React from "react";
import type { ProjectsPanelProps } from "../types/Projects";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsFilters from "./ProjectsFilters";

const ProjectsPanel: React.FC<ProjectsPanelProps> = ({ unidad }) => {
  const [showFilters, setShowFilters] = React.useState(true);

  return (
    <>
      <div className="card border border-base-300 shadow-lg mb-4">
        <div className="card-body">
          <ProjectsHeader
            unidad={unidad}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          ></ProjectsHeader>

         <ProjectsFilters showFilters={showFilters} setShowFilters={setShowFilters} />
        </div>
      </div>


      {JSON.stringify(unidad?.nombre)}
    </>
  );
};

export default ProjectsPanel;
