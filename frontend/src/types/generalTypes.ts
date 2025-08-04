import { z } from "zod";
import { TaskSchema } from "../features/proyectos/types/Task";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  unidad: z.object({
    id: z.number(),
    nombre: z.string(),
    codigo: z.string(),
  }),
  nom_coordinacion: z.string().optional(),
  nom_departamento: z.string().optional(),
  p00: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;

// Enum de estados según TextChoices de Django
const EstadoProyecto = z.enum([
  "Planificado",
  "Ejecucion",
  "Pausado",
  "Finalizado",
] as const);

// Esquema para Unidad (corregido)
export const UnidadSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  codigo: z.string(),
  proyectos_total: z.number(),
  miembros_total: z.number(),
});

export type UnidadType = z.infer<typeof UnidadSchema>;

export type EstadoProyectoType = z.infer<typeof EstadoProyecto>;
export const EstadoProyectoEnum = EstadoProyecto.enum;

// Esquema principal
export const ProyectoSchema = z.object({
  // Django añade automáticamente un id integer
  id: z.number(),

  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),

  descripcion: z.string().min(1, { message: "La descripción es obligatoria" }),

  fecha_inicio: z.date(),

  fecha_fin: z.date(),

  estado: EstadoProyecto,

  unidad_responsable: UnidadSchema,

  // Asumimos que tu API serializa el FK "lider" como un integer ID
  lider: UserSchema,

  codigo: z.string().min(1, { message: "El código es obligatorio" }),
  tareas_completadas: z.number(),
  tareas_total: z.number(),
  tareas_pendientes: z.number(),
  miembros_total: z.number().optional(),
  tareas: TaskSchema.array().optional(),
});

// Tipo TS inferido automáticamente
export type ProyectoType = z.infer<typeof ProyectoSchema>;

export const UnidadSchemaResponse = z.object({
  unidades: UnidadSchema.array(),
  totalItems: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
});

export type UnidadTypeResponse = z.infer<typeof UnidadSchemaResponse>;

export const ProyectoSchemaResponse = z.object({
  data: ProyectoSchema.array(),
  count: z.number(),
  currentPage: z.number(),
  page_size: z.number(),
  total_pages: z.number(),
});

export type ProyectoTypeResponse = z.infer<typeof ProyectoSchemaResponse>;
