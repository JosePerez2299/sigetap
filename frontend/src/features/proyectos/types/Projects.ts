import { z } from 'zod';
import { UserSchema } from "../../users/types/User";
import { TaskSchema } from "./Task";
import type { TreeNodeData } from "./Tree";

// =============================================================================
// ENUMS Y CONSTANTS
// =============================================================================

const EstadoProyecto = z.enum([
  "Planificado",
  "Ejecucion",
  "Pausado",
  "Finalizado",
] as const);

export type EstadoProyectoType = z.infer<typeof EstadoProyecto>;
export const EstadoProyectoEnum = EstadoProyecto.enum;

export type ViewNameType = "tableros" | "gantt" | "calendar" | "files";

// =============================================================================
// SCHEMAS ZOD
// =============================================================================

export const UnidadSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  codigo: z.string(),
  proyectos_total: z.number(),
  miembros_total: z.number(),
});

export const ProyectoSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  descripcion: z.string().min(1, { message: "La descripción es obligatoria" }),
  fecha_inicio: z.date(),
  fecha_fin: z.date(),
  estado: EstadoProyecto,
  unidad_responsable: UnidadSchema,
  lider: UserSchema,
  codigo: z.string().min(1, { message: "El código es obligatorio" }),
  tareas_completadas: z.number(),
  tareas_total: z.number(),
  tareas_pendientes: z.number(),
  miembros_total: z.number().optional(),
  miembros: UserSchema.array().optional(),
  tareas: TaskSchema.array().optional(),
});

export const UnidadSchemaResponse = z.object({
  unidades: UnidadSchema.array(),
  totalItems: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
});

export const ProyectoSchemaResponse = z.object({
  data: ProyectoSchema.array(),
  count: z.number(),
  currentPage: z.number(),
  page_size: z.number(),
  total_pages: z.number(),
});

// =============================================================================
// TYPES (inferidos de schemas y interfaces personalizadas)
// =============================================================================

export type ProyectoType = z.infer<typeof ProyectoSchema>;
export type UnidadTypeResponse = z.infer<typeof UnidadSchemaResponse>;
export type ProyectoTypeResponse = z.infer<typeof ProyectoSchemaResponse>;

export type UnidadType = TreeNodeData;
// =============================================================================
// INTERFACES DE ESTADO Y FILTROS
// =============================================================================

export interface FiltersState {
  page?: number;
  pageSize?: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  lider?: string;
  searchTerm?: string;
  filterBy?: EstadoProyectoType;
  sortBy?: string;
  unidadId: number;
}

export interface ViewType {
  name: ViewNameType;
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

// =============================================================================
// INTERFACES DE COMPONENTES (Props)
// =============================================================================

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

export interface AsideDetailProps {
  currentView: ViewNameType;
  switchView: (view: ViewNameType) => void;
}