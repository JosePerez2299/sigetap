// services/privateApi.ts
import { publicApi } from "./publicApi";
import store from "../store/RootState";
import { logoutThunk, refreshTokenThunk } from "../store/auth/authThunks";
import { urls } from "./urls";

export const privateApi = publicApi;

// Interceptor para inyectar el access token (solo uno)
privateApi.interceptors.request.use((config) => {
  const token = store.getState().auth.access;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar respuestas con 401
privateApi.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
     // Manejar 403 - Sin permisos
     if (error.response?.status === 403) {
      console.log('Access forbidden - insufficient permissions');
     }

     // Manejar 401 - Token expirado
     
    console.log('Interceptor response error:', error.response?.status);

    // Si recibimos 401 y no hemos reintentado antes esta petición
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Si es la petición de refresh la que falló, hacer logout directamente
      const isRefreshRequest = originalRequest.url?.includes(urls.refreshToken);
      
      if (isRefreshRequest) {
        console.log('Refresh token is expired, logging out');
        store.dispatch(logoutThunk());
        return Promise.reject(error);
      }

      // Verificar si tenemos refresh token
      const refreshToken = store.getState().auth.refresh;
      if (!refreshToken) {
        console.log('No refresh token available, logging out');
        store.dispatch(logoutThunk());
        return Promise.reject(error);
      }

      try {
        console.log('Attempting token refresh...');
        const resultAction = await store.dispatch(refreshTokenThunk());
        
        if (refreshTokenThunk.fulfilled.match(resultAction)) {
          const newAccess = resultAction.payload.access;
          console.log('Token refreshed successfully');

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return privateApi(originalRequest);
        } else {
          console.log('Token refresh failed:', resultAction.error);
          store.dispatch(logoutThunk());
          return Promise.reject(resultAction.error);
        }
      } catch (refreshError) {
        console.log('Token refresh error:', refreshError);
        store.dispatch(logoutThunk());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);