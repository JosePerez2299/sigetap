import type { ChangeEventHandler } from "react";
import type { TreeNodeData } from "./Tree";

export interface UnidadType extends TreeNodeData {}

export interface ProjectsPanelProps {
  unidad: UnidadType | null;
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
  onFilterChange?: ChangeEventHandler<HTMLInputElement>;
  clearFilters?: () => void;
}

export interface FiltersState {
  page?: number;
  pageSize?: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  lider?: string;
  searchTerm?: string;
  filterBy?: string;
  sortBy?: string;
  unidad?: string;
}
