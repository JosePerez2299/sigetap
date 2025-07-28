import type { TreeNodeProps } from "../types/Tree";
import { useCallback } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";

// Componente TreeNode individual
const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
  expandedNodes,
  selectedNodeId,
}) => {
  const hasChildren = node.hijos && node.hijos.length > 0;

  const handleNodeClick = useCallback(() => {
    onSelect(node);
  }, [node, onSelect]);

  const handleToggleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggle(node.id);
    },
    [node.id, onToggle]
  );

  return (
    <div>
      <div
        className={`flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ${
          isSelected
            ? "bg-primary text-primary-content"
            : "hover:bg-neutral/20 text-base-content"
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={handleNodeClick}
      >
        {hasChildren ? (
          <button
            onClick={handleToggleClick}
            className="btn btn-ghost btn-xs mr-2 p-1"
            aria-label={isExpanded ? "Contraer" : "Expandir"}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <div className="w-6 mr-2" />
        )}

        {isExpanded && hasChildren ? (
          <FolderOpen className="w-4 h-4 mr-3 text-accent" />
        ) : (
          <Folder className="w-4 h-4 mr-3 opacity-60" />
        )}

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{node.nombre}</div>
          <div className="text-xs opacity-70">{node.codigo}</div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.hijos.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              isExpanded={expandedNodes.has(child.id)}
              isSelected={selectedNodeId === child.id}
              onToggle={onToggle}
              onSelect={onSelect}
              expandedNodes={expandedNodes}
              selectedNodeId={selectedNodeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
