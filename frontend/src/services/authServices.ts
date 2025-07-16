import { publicApi } from "../api/publicApi";
import {
  LoginResponseSchema,
  RefreshTokenSchema,
  type Credentials,
  type LoginResponseType,
  type RefreshTokenType,
} from "../types/authTypes";
import { urls } from "../api/urls";

const login = async (credentials: Credentials): Promise<LoginResponseType> => {
  const response = await publicApi.post(urls.login, credentials);
  return LoginResponseSchema.parse(response.data);
};

const refreshToken = async (refreshToken: string): Promise<RefreshTokenType> => {
  const response = await publicApi.post(urls.refreshToken, {
    refresh: refreshToken,
  });
  return RefreshTokenSchema.parse(response.data);
};

export const authServices = {
  login,
  refreshToken,
};
