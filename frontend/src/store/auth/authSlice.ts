
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: true,
    user: null,
    access: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setAccessToken(state, action) {
            state.access = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.access = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
