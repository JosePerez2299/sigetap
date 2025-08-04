import { z } from "zod";

export const TaskSchema = z.object({
    id: z.number(),
    titulo: z.string(),
    descripcion: z.string(),
    prioridad: z.string(),
    fecha_inicio: z.string(),
    fecha_fin: z.string(),
    estado: z.string(),
    comentarios: z.string(),
    proyecto: z.number(),
    sup_tarea: z.number(),
})

export type TaskType = z.infer<typeof TaskSchema>

export const TaskSchemaResponse = z.object({
    data: TaskSchema.array(),
    count: z.number(),
    currentPage: z.number(),
    page_size: z.number(),
    total_pages: z.number(),
});

export type TaskTypeResponse = z.infer<typeof TaskSchemaResponse>;