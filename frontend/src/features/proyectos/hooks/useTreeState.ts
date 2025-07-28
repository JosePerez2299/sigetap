import { useState, useCallback } from "react";
import type { TreeNodeData } from "../types/Tree";

// Hook personalizado para manejar el estado del árbol
export const useTreeState = (initialSelectedId?: number | null) => {
    const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<number | null>(initialSelectedId || null);
  
    const handleNodeSelect = useCallback((node: TreeNodeData) => {
      setSelectedNode(node);
      setSelectedNodeId(node.id);
    }, []);
  
    const clearSelection = useCallback(() => {
      setSelectedNode(null);
      setSelectedNodeId(null);
    }, []);
  
    return {
      selectedNode,
      selectedNodeId,
      handleNodeSelect,
      clearSelection
    };
  };