import React from "react";
import type { ProjectsPanelProps } from "../types/Projects";
import ProjectsHeader from "./ProjectsHeader";

const ProjectsPanel: React.FC<ProjectsPanelProps> = ({ unidad }) => {
  return (
    <>
      <div className="card  p-4 ">
        <div className="card-title">
          <ProjectsHeader unidad={unidad}></ProjectsHeader>
        </div>
        {unidad && (
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="card-title">Titulo</div>
              <div>bodu</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsPanel;
