import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../components/login/AuthSlice'; 

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})