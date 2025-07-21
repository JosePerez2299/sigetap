import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import loadingReducer from "./auth/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

// Inferir el tipo AppDispatch del store
export type AppDispatch = typeof store.dispatch;
export default store;
