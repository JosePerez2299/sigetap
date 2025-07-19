import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  nom_unidad: z.string().optional(),
  nom_gerencia_general: z.string().optional(),
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
  "Finalizado"
] as const);

export type EstadoProyectoType = z.infer<typeof EstadoProyecto>;
export const EstadoProyectoEnum = EstadoProyecto.enum;

// Esquema principal
export const ProyectoSchema = z.object({
  // Django añade automáticamente un id integer
  id: z.number(),

  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),

  descripcion: z.string().min(1, { message: "La descripción es obligatoria" }),

  fecha_inicio: z
    .string()
    .refine((str) => !isNaN(Date.parse(str)), {
      message: "fecha_inicio debe ser una fecha ISO válida",
    })
    .transform((str) => new Date(str)),

  fecha_fin: z
    .string()
    .refine((str) => !isNaN(Date.parse(str)), {
      message: "fecha_fin debe ser una fecha ISO válida",
    })
    .transform((str) => new Date(str)),

  estado: EstadoProyecto,

  unidad_responsable: z.string().min(1, {
    message: "La unidad responsable es obligatoria",
  }),

  // Asumimos que tu API serializa el FK "lider" como un integer ID
  lider: UserSchema,

  codigo: z.string().min(1, { message: "El código es obligatorio" }),
  tareas_completadas: z.number(),
  tareas_total: z.number(),
  tareas_pendientes: z.number(),
  miembros_total: z.number(),
});

// Tipo TS inferido automáticamente
export type ProyectoType = z.infer<typeof ProyectoSchema>;

// Esquema para Unidad (corregido)
export const UnidadSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  codigo: z.string(),
  proyectos_total: z.number(),
  miembros_total: z.number(),
});

export type UnidadType = z.infer<typeof UnidadSchema>;