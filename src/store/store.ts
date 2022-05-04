/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import schemeReducer from './reducers/scheme';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

export const store = configureStore({
  reducer: {
    authReducer,
    schemeReducer,
  },
  middleware: [thunk],
  preloadedState: state,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
