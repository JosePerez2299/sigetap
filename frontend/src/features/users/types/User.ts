import {z} from 'zod'
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
