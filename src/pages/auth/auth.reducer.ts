import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../api/auth/auth.types";
import { authState } from "../../controllers/authController";
import { RootState } from "../../store/store";

const initialState: authState = {
    error: '',
    isSignedIn: false,
    user: undefined
}

export const reducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<IUserData>) => {
            if (action.payload) {
                state.isSignedIn = true;
                state.user = action.payload;
            } else {
                state.isSignedIn = false;
                state.user = undefined;
            }
        },
        signOut: (state) => {
            state.error = '';
            state.isSignedIn = false;
            state.user = undefined;
        },
        fetchUser: (state, action: PayloadAction<IUserData>) => {
            if(action.payload){
                state.user = action.payload
            }
        },
        error: (state, action: PayloadAction<string>) => {
            if (action.payload) {
                state.error = action.payload;
            }
        }
    }
})

export const { signIn, signOut, error, fetchUser } = reducer.actions;
export default reducer.reducer;
export const getUser = (state: RootState) => state.authReducer.user;
