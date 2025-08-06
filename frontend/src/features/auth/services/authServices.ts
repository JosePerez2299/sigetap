import { publicApi } from '../../../api/publicApi';

import {
  LoginResponseSchema,
  RefreshTokenSchema,
  type Credentials,
  type LoginResponseType,
  type RefreshTokenType,
} from "../types/authTypes";
import { urls } from "../../../api/urls";
import { throwServiceError } from "../../../utils/handleErrorMessage";

const login = async (credentials: Credentials): Promise<LoginResponseType> => {
  const response = await publicApi.post(urls.login, credentials);
  try {
    return LoginResponseSchema.parse(response.data);
  } catch (error) {
    throw throwServiceError(error);
  }
};

const refreshToken = async (refreshToken: string): Promise<RefreshTokenType> => {
  const response = await publicApi.post(urls.refreshToken, {
    refresh: refreshToken,
  });
  try {
    return RefreshTokenSchema.parse(response.data);
  } catch (error) {
    throw throwServiceError(error);
  }
};


export const authServices = {
  login,
  refreshToken,
};
