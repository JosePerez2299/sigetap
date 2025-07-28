
// Tipos TypeScript
export interface TreeNodeData {
  id: number;
  nombre: string;
  codigo: string;
  hijos: TreeNodeData[];
}

export interface TreeProps {
  data: TreeNodeData[];
  onNodeSelect?: (node: TreeNodeData) => void;
  selectedNodeId?: number | null;
  className?: string;
}

export interface TreeNodeProps {
  node: TreeNodeData;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: (nodeId: number) => void;
  onSelect: (node: TreeNodeData) => void;
  expandedNodes: Set<number>;
  selectedNodeId: number | null;
}
