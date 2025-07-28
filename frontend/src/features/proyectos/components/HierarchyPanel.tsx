import type { TreeNodeData } from "../types/Tree";
import Tree from "./Tree";

interface HierarchyPanelProps {
  data?: TreeNodeData[];
  isLoading: boolean;
  error?: Error | null;
  selectedNodeId: number | null;
  onNodeSelect: (node: TreeNodeData) => void;
}

const HierarchyPanel: React.FC<HierarchyPanelProps> = ({
  data,
  isLoading,
  error,
  selectedNodeId,
  onNodeSelect,
}) => {
  if (isLoading) return <div> Cargando jerarquía...</div>;
  if (error) return <div> Error: {error.message}</div>;
  if (!data) return <div> No hay jerarquía disponible</div>;

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Jerarquía Organizacional</h2>
        <Tree
          data={data}
          onNodeSelect={onNodeSelect}
          selectedNodeId={selectedNodeId}
        />
      </div>
    </div>
  );
};

export default HierarchyPanel;
