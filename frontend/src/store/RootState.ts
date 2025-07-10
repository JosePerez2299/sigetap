import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice dummy inicial para el estado global
const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    version: '1.0.0',
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

// Tipos para usar con useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
