import { useState } from "react";
import { loginService } from "../services/authServices";
import type { Credentials } from "../types/authTypes";
import type { LoginResponseType } from "../types/authTypes";
import { handleErrorMessage } from "../../utils/handleErrorMessage";
import type { User } from "../types/userTypes";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    credentials: Credentials
  ): Promise<LoginResponseType | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginService(credentials);
      setUser(data.user);
      return data;
    } catch (err: any) {
      setError(handleErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, user };
};
