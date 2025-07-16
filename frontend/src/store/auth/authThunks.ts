import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Credentials } from "../../types/authTypes";
import { tokenManager } from "../../utils/tokenManager";
import { authServices } from "../../services/authServices";
import { handleErrorMessage } from "../../utils/handleErrorMessage";

// Thunk para login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await authServices.login(credentials);
      tokenManager.setAfterLogin(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(handleErrorMessage(error));
    }
  }
);

// Thunk para logout
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      tokenManager.deleteSession();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error en el logout");
    }
  }
);


// Thunk para refresh token
export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {

    try {
      const refreshToken = tokenManager.getTokens().refresh;
      if (!refreshToken) {
        return rejectWithValue("No se encontró un token de refresco");
      }
      const response = await authServices.refreshToken(refreshToken);
      tokenManager.setAccessToken(response.access);
      return response;
    } catch (error: any) {
      return rejectWithValue(handleErrorMessage(error));
    }
  }
);
