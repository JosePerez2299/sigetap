import type { TreeNodeData } from "./Tree";
import type { EstadoProyectoType } from "../../../types/generalTypes";

export interface UnidadType extends TreeNodeData {}

export interface ProjectsPanelProps {
  filters: FiltersState;
  handleFilterChange: (updates: Partial<FiltersState>) => void;
}

export interface ProjectsHeaderProps {
  unidad?: number;
  className?: string;
  filters?: FiltersState;
  showFilters?: boolean;
  setShowFilters?: (value: boolean) => void;
}

export interface ProjectsFiltersProps {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  filters: FiltersState;
  onFilterChange: (updates: Partial<FiltersState>) => void;
  resetFilters: () => void;
}

export interface FiltersState {
  page?: number;
  pageSize?: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  lider?: string;
  searchTerm?: string;
  filterBy?: EstadoProyectoType ;
  sortBy?: string;
  unidadId: number;
}
