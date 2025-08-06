import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../store/auth/authSlice";
import type { Credentials } from "../types/authTypes";
import type { RootState, AppDispatch } from "../../../store/RootState"; // Asegúrate de tener estos tipos
import { loginThunk, logoutThunk } from "../../../store/auth/authThunks";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (credentials: Credentials) => {
    const result = await dispatch(loginThunk(credentials));
    return result;
  };

  const logout = async () => {
    const result = await dispatch(logoutThunk());
    return result;
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    login,
    logout,
    loading,
    error,
    clearAuthError,
  };
}
