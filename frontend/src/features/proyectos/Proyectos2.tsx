import React from "react";
import { useUser } from "../../hooks/getUser";
import HierarchyPanel from "./components/HierarchyPanel";
import { useHierarchy } from "./hooks/useHierarchy";
import ProjectsPanel from "./components/ProjectsPanel";
import { Building } from "lucide-react";

const TreeExample: React.FC = () => {
  const { user, isLoading: isLoadingUser, error: errorUser } = useUser();

  const {
    data,
    isLoading,
    error,
    selectedNode,
    selectedNodeId,
    handleNodeSelect,
    clearSelection,
  } = useHierarchy(user?.unidad?.codigo);

  const isLoadingAll = isLoadingUser || isLoading;
  const errorAll = errorUser || error;

  if (isLoadingAll) {
    return (
      <div className="min-h-screen bg-base-200 p-6 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (errorAll) {
    return (
      <div className="min-h-screen bg-base-200 p-6 flex items-center justify-center">
        <div className="alert alert-error">
          <span>Error: {errorAll?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="navbar bg-base-100 border border-base-300 rounded-box mb-6 shadow-sm">
        <div className="flex-1 px-4 py-3">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-semibold text-base-content flex items-center gap-3">
              <svg
                className="w-6 h-6 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Gestión de Proyectos
            </h1>
            <p className="text-sm text-base-content/70">
              Visualiza y administra tus proyectos
            </p>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-3">
        {/* Panel del árbol */}
        <HierarchyPanel
          data={data}
          isLoading={isLoading}
          error={error}
          selectedNodeId={selectedNodeId}
          onNodeSelect={handleNodeSelect}
        />

        {/* Panel de detalles */}
        <div className="lg:col-span-2">
          <ProjectsPanel unidad={selectedNode}></ProjectsPanel>
        </div>
      </div>
    </div>
  );
};

export default TreeExample;
