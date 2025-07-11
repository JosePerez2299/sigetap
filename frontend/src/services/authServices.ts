import { publicApi } from "../api/publicApi";
import { LoginResponseSchema, type Credentials, type LoginResponseType } from "../types/authTypes";

export const loginService = async (credentials: Credentials): Promise<LoginResponseType> => {
    const response = await publicApi.post("/auth/token/", credentials);
    return LoginResponseSchema.parse(response.data); 
};
