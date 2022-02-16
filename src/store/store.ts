import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from '../pages/auth/auth.reducer';

export const store = configureStore({
    reducer: { 
        authReducer
    },
    middleware: [thunk]
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
