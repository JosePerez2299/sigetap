// services/privateApi.ts
import { publicApi } from "./publicApi";
import store from "../store/RootState";

export const privateApi = publicApi;

privateApi.interceptors.request.use((config) => {
  const token = store.getState().auth.access;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
