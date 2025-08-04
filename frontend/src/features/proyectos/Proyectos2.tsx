import React, { useEffect } from "react";
import { useUser } from "../../hooks/getUser";
import HierarchyPanel from "./components/HierarchyPanel";
import { useHierarchy } from "./hooks/useHierarchy";
import ProjectsPanel from "./components/ProjectsPanel";
import {
  Building,
  Building2,
  Filter,
  Folder,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { useFilters } from "./hooks/useFilters";
import ProjectsFilters from "./components/ProjectsFilters";

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

  const {
    filters,
    handleFilterChange,
    setShowFilters,
    showFilters,
    resetFilters,
  } = useFilters({
    searchTerm: "",
    filterBy: undefined,
    sortBy: "nombre",
    page: 1,
    pageSize: 5,
    unidadId: selectedNode?.id || 0,
  });

  const isLoadingAll = isLoadingUser || isLoading;
  const errorAll = errorUser || error;

  useEffect(() => {
    resetFilters();
  }, [selectedNodeId]);

  if (isLoadingAll) {
    return (
      <div className="container mx-auto min-h-screen  w-full ">
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
      <div className="container mx-auto min-h-screen bg-base-200 p-6 flex items-center justify-center">
        <div className="alert alert-error">
          <span>Error: {errorAll?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          {selectedNode && (
            <ProjectsFilters
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filters={filters}
              onFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />
          )}

          {/* Panel del árbol */}
          <HierarchyPanel
            data={data}
            isLoading={isLoading}
            error={error}
            selectedNodeId={selectedNodeId}
            onNodeSelect={handleNodeSelect}
          />
        </div>

        {/* Panel de detalles */}
        <div className="lg:col-span-2 max-h-[calc(100vh-100px)] ">
          {selectedNode && filters ? (
            <ProjectsPanel
              unidad={selectedNode}
              filters={filters}
              handleFilterChange={handleFilterChange}
            ></ProjectsPanel>
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
