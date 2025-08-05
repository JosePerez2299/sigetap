import type { TreeNodeData } from "./Tree";
import type { EstadoProyectoType } from "../../../types/generalTypes";

export interface UnidadType extends TreeNodeData {}

export interface ProjectsPanelProps {
  unidad: UnidadType;
  filters: FiltersState;
  handleFilterChange: (updates: Partial<FiltersState>) => void;
}

export interface ProjectsHeaderProps {
  unidad?: UnidadType;
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

export interface AsideDetailProps {
  currentView: ViewNameType;
  switchView: (view: ViewNameType) => void;
}

export interface ViewType {
  name: ViewNameType;
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

export type ViewNameType = "tableros" | "gantt" | "calendar" | "files";