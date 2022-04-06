import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUserData } from '../../types/api/auth';
import { IState } from '../store.types';

const initialState: IState = {
  error: '',
  isAuth: false,
  user: undefined,
};

export const slice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    saveUserToStore: (state, action: PayloadAction<IUserData>) => {
      if (action.payload) {
        state.isAuth = true;
        state.user = action.payload;
      } else {
        state.isAuth = false;
        state.user = undefined;
      }
    },
    removeUserFromStore: (state) => {
      state.error = '';
      state.isAuth = false;
      state.user = undefined;
    },
    error: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.error = action.payload;
      }
    },
  },
});

export const { saveUserToStore, removeUserFromStore, error } = slice.actions;
export default slice.reducer;
export const currentUser = (state: RootState) => state.authReducer.user;
export const isAuth = (state: RootState) => state.authReducer.isAuth;
export const authErrors = (state: RootState) => state.authReducer.error;
