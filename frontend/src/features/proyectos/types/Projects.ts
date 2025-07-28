import type { TreeNodeData } from "./Tree";

export interface UnidadType extends TreeNodeData{}

export interface ProjectsPanelProps {
  unidad: UnidadType | null;
}

export interface ProjectsHeaderProps {
    unidad?: UnidadType | null;
    className?: string
    filters?: any
  }
  