import React from "react";
import { useUser } from "../../hooks/getUser";
import HierarchyPanel from "./components/HierarchyPanel";
import { useHierarchy } from "./hooks/useHierarchy";

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
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="navbar bg-base-100 rounded-box shadow-sm mb-6">
          <div className="flex-1">
            <h1 className="text-xl font-bold">Unidad: {user?.unidad.codigo}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-4">Proyectos</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Buscar proyecto..."
                      className="input input-bordered w-full max-w-xs"
                    />
                    <button className="btn btn-primary">Buscar</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="select select-bordered w-full max-w-xs">
                      <option value="todos">Todos</option>
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                    <button className="btn btn-primary">Filtrar</button>
                  </div>
                </div>

                <div >
                  
                  <div> Mostrar Listado de proyectos de la unidad seleccionada</div>
                  <div>
                    <ul className="list-disc"> 
                      <li>{selectedNode?.nombre}</li>
                      <li>{selectedNode?.codigo}</li>
                    </ul>
                  </div>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeExample;
