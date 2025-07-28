import React from "react";
import { useUser } from "../../hooks/getUser";
import HierarchyPanel from "./components/HierarchyPanel";
import { useHierarchy } from "./hooks/useHierarchy";
import ProjectsPanel from "./components/ProjectsPanel";
import { Building, Building2, Folder, PlusIcon } from "lucide-react";

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
      <div className="min-h-screen  w-full ">
        <div className="w-full h-16 skeleton mb-2"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Panel del árbol */}
          <div className="col-span-1 min-h-100 skeleton"></div>
          {/* Panel de detalles */}
          <div className="lg:col-span-2 h-full skeleton"></div>
        </div>
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
      <div className="navbar bg-gradient-to-br from-base-100  via-base-200 to-primary/10 border border-base-300 rounded-box mb-6 shadow-sm">
        <div className="flex-1 px-4 py-3">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-semibold text-base-content flex items-center gap-3">
              <Building2 className="text-primary"/>
              Gestión de Proyectos
            </h1>
            <p className="text-sm text-base-content/70">
              Visualiza y administra tus proyectos
            </p>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
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
          {selectedNode ? (
            <ProjectsPanel unidad={selectedNode}></ProjectsPanel>
          ) : (
            <div className="card flex flex-col items-center justify-center h-full border border-base-300 rounded-box  shadow-lg bg-base-100 gap-4">
              <div className="text-center">
                <p className="text-xl font-semibold text-base-content ">
                  Selecciona una unidad
                </p>
                <p className="text-sm text-base-content/70">
                  Selecciona una unidad para ver sus proyectos
                </p>
              </div>
              <Folder className="text-base-content/70" size={64} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeExample;
