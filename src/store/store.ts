import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import schemeReducer from './reducers/scheme';

export const store = configureStore({
  reducer: {
    authReducer,
    schemeReducer,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
