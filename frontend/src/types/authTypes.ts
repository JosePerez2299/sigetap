import { z } from "zod";

export const CredentialsSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export type Credentials = z.infer<typeof CredentialsSchema>;

export const LoginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    nom_unidad: z.string(),
    role: z.string(),
  }),   
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
