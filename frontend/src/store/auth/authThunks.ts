
import { loginService } from "../../services/authServices";
import type { Credentials } from "../../types/authTypes"
import { setUser, setAccessToken } from "../auth/authSlice";


export const loginThunk = async (credentials: Credentials) => {
    const response = await loginService(credentials);


    if (response) {
        setUser(response.user);
        setAccessToken(response.access);
        return response;
    }
    return null;
}