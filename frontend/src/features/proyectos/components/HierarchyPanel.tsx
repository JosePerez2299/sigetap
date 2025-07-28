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
    <div className="border border-base-300 shadow-lg card">
      <div className="card-body">
        <div className="text-lg font-bold ">
          <h2>Jerarquía Organizacional</h2>
        </div>
        <Tree
          className="bg-base-200"
          data={data}
          onNodeSelect={onNodeSelect}
          selectedNodeId={selectedNodeId}
        />
      </div>
    </div>
  );
};

export default HierarchyPanel;
