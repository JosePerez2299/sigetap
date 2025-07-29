import type { TreeNodeData } from "./Tree";
import type { EstadoProyectoType } from "../../../types/generalTypes";

export interface UnidadType extends TreeNodeData {}

export interface ProjectsPanelProps {
  unidad: UnidadType;
}

export interface ProjectsHeaderProps {
  unidad?: UnidadType | null;
  className?: string;
  filters?: FiltersState;
  showFilters?: boolean;
  setShowFilters?: (value: boolean) => void;
}

export interface ProjectsFiltersProps {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  filters?: FiltersState;
  onFilterChange?: (updates: Partial<FiltersState>) => void;
  clearFilters?: () => void;
}

export interface FiltersState {
  page?: number;
  pageSize?: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  lider?: string;
  searchTerm?: string;
  filterBy: EstadoProyectoType | "todos";
  sortBy?: string;
  unidadId: number;
}
