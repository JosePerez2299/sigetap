// src/features/loading/loadingSlice.ts
import { createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';

interface LoadingState {
  count: number;
}

const initialState: LoadingState = { count: 0 };

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // opcional: si quisieras despachar manualmente
    resetLoading: (state) => { state.count = 0; }
  },
  extraReducers: (builder) => {
    builder
      // cualquier thunk (o acción) que termine en "/pending"
      .addMatcher(isPending, (state) => {
        state.count++;
      })
      // cualquier thunk (o acción) que termine en "/fulfilled"
      .addMatcher(isFulfilled, (state) => {
        state.count = Math.max(0, state.count - 1);
      })
      // cualquier thunk (o acción) que termine en "/rejected"
      .addMatcher(isRejected, (state) => {
        state.count = Math.max(0, state.count - 1);
      });
  }
});

export const { resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
