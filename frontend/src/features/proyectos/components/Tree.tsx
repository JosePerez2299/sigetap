import React, { useState, useCallback } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Search,
} from "lucide-react";
import type { TreeNodeProps, TreeProps , TreeNodeData } from "../types/Tree";

import TreeNode from "./TreeNode";


// Componente Tree principal
const Tree: React.FC<TreeProps> = ({
  data,
  onNodeSelect,
  selectedNodeId = null,
  className = "",
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // Función para alternar el estado expandido de un nodo
  const toggleNode = useCallback((nodeId: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Función para manejar la selección de nodos
  const handleNodeSelect = useCallback(
    (node: TreeNodeData) => {
      if (onNodeSelect) {
        onNodeSelect(node);
      }
    },
    [onNodeSelect]
  );

  // Función recursiva para filtrar nodos por término de búsqueda
  const filterNodes = useCallback(
    (nodes: TreeNodeData[], term: string): TreeNodeData[] => {
      if (!term.trim()) return nodes;

      const filtered: TreeNodeData[] = [];

      for (const node of nodes) {
        const matchesSearch =
          node.nombre.toLowerCase().includes(term.toLowerCase()) ||
          node.codigo.toLowerCase().includes(term.toLowerCase());

        const filteredChildren = filterNodes(node.hijos, term);

        if (matchesSearch || filteredChildren.length > 0) {
          filtered.push({
            ...node,
            hijos: filteredChildren,
          });
        }
      }

      return filtered;
    },
    []
  );

  // Función recursiva para expandir automáticamente nodos que contienen resultados de búsqueda
  const autoExpandSearchResults = useCallback(
    (nodes: TreeNodeData[], term: string) => {
      if (!term.trim()) return;

      const expandedIds = new Set<number>();

      const traverse = (nodeList: TreeNodeData[]) => {
        for (const node of nodeList) {
          const hasMatchInChildren = hasSearchMatch(node.hijos, term);
          if (hasMatchInChildren) {
            expandedIds.add(node.id);
          }
          traverse(node.hijos);
        }
      };

      traverse(nodes);
      setExpandedNodes((prev) => new Set([...prev, ...expandedIds]));
    },
    []
  );

  // Función auxiliar para verificar si hay coincidencias en los hijos
  const hasSearchMatch = (nodes: TreeNodeData[], term: string): boolean => {
    for (const node of nodes) {
      if (
        node.nombre.toLowerCase().includes(term.toLowerCase()) ||
        node.codigo.toLowerCase().includes(term.toLowerCase()) ||
        hasSearchMatch(node.hijos, term)
      ) {
        return true;
      }
    }
    return false;
  };

  // Filtrar datos basado en el término de búsqueda
  const filteredData = searchTerm ? filterNodes(data, searchTerm) : data;

  // Auto-expandir nodos cuando se busca
  React.useEffect(() => {
    if (searchTerm) {
      autoExpandSearchResults(data, searchTerm);
    }
  }, [searchTerm, data, autoExpandSearchResults]);

  // Función recursiva para renderizar nodos
  const renderNodes = useCallback(
    (nodes: TreeNodeData[], level = 0) => {
      return nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={level}
          isExpanded={expandedNodes.has(node.id)}
          isSelected={selectedNodeId === node.id}
          onToggle={toggleNode}
          onSelect={handleNodeSelect}
          expandedNodes={expandedNodes}
          selectedNodeId={selectedNodeId}
        />
      ));
    },
    [expandedNodes, selectedNodeId, toggleNode, handleNodeSelect]
  );

  return (
    <div className={`card bg-base-100 shadow-sm ${className}`}>
      <div className="card-body p-4">
        {/* Buscador */}
        <div className="form-control mb-4">
          <div className="input-group">
            <span className="bg-base-200">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Buscar unidad..."
              className="input input-bordered flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Árbol */}
        <div className="overflow-y-auto max-h-96">
          <div className="space-y-1">
            {filteredData.length > 0 ? (
              renderNodes(filteredData)
            ) : (
              <div className="text-center py-8">
                <div className="flex flex-col items-center text-base-content/60">
                  <Folder className="w-12 h-12 mb-2" />
                  <p className="text-sm">
                    {searchTerm
                      ? "No se encontraron resultados"
                      : "No hay elementos para mostrar"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tree;

// Hook personalizado para manejar el estado del árbol
export const useTreeState = (initialSelectedId?: number | null) => {
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(
    initialSelectedId || null
  );

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
    clearSelection,
  };
};
