import { publicApi } from "../api/publicApi";
import {
  LoginResponseSchema,
  type Credentials,
  type LoginResponseType,
} from "../types/authTypes";

const login = async (credentials: Credentials): Promise<LoginResponseType> => {
  const response = await publicApi.post("/auth/login/", credentials);
  return LoginResponseSchema.parse(response.data);
};

export const authServices = {
  login,
};
