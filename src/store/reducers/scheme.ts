import { createSlice } from '@reduxjs/toolkit';
import { ISchemeState } from '../store.types';
import { RootState } from '../store';

const initialState: ISchemeState = {
  isDark: true,
};

const slice = createSlice({
  name: 'schemeReducer',
  initialState,
  reducers: {
    changeSchemeToDark: (state) => {
      state.isDark = true;
    },
    changeSchemeToLight: (state) => {
      state.isDark = false;
    },
  },
});

export const { changeSchemeToDark, changeSchemeToLight } = slice.actions;
export default slice.reducer;

export const isDarkScheme = (state: RootState) => state.schemeReducer.isDark;
