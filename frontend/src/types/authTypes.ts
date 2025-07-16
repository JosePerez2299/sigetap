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
    pk: z.number(),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
  }),
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;


export const RefreshTokenSchema = z.object({
  access: z.string(),
});

export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;
