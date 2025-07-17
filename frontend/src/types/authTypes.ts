import { z } from "zod";
import { UserSchema } from "./generalTypes";

export const CredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type Credentials = z.infer<typeof CredentialsSchema>;

export const LoginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
  user: UserSchema,
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;


export const RefreshTokenSchema = z.object({
  access: z.string(),
});

export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;
