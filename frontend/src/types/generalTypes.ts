import { z } from "zod";

export interface User {
  id?: number;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  nom_unidad?: string;
  role?: string;
}

// Enum de estados según TextChoices de Django
const EstadoProyecto = z.enum([
  "Planificado",
  "Ejecución",
  "Pausado",
  "Finalizado",
] as const);

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
  lider: z.number(),

  codigo: z.string().min(1, { message: "El código es obligatorio" }),
});

// Tipo TS inferido automáticamente
export type ProyectoType = z.infer<typeof ProyectoSchema>;
