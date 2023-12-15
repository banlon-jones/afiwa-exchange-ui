import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details: {
        email: null,
        name: null,
        expiresAt: 0,
        refreshToken: null,
        accessToken: null
    }
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, data) => {
            state.details = data.payload;
        },
        logout: (state) => {
            state.details = initialState;
            localStorage.clear()
        }
    }
})


export const SelectAuth = (state) => state.auth.details;
export const { login, logout } = AuthSlice.actions
export default AuthSlice.reducer;