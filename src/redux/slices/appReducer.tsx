import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOffline: false,
  isLoading: true,
  selectedLanguage: 'en',
};

const appSlice = createSlice({
  name: 'App',
  initialState: initialState,
  reducers: {
    setApplicationState: (state, {payload}) => {
      state = payload;
    },
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    setSelectedLanguage: (state, {payload}) => {
      state.selectedLanguage = payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const {setApplicationState, setLoading, setSelectedLanguage} =
  appSlice.actions;
