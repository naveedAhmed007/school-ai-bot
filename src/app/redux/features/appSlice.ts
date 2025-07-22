import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  darkMode: boolean;
  currentUser: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const initialState: AppState = {
  loading: false,
  error: null,
  successMessage: null,
  darkMode: false,
  currentUser: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSuccessMessage(state, action: PayloadAction<string | null>) {
      state.successMessage = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setCurrentUser(state, action: PayloadAction<AppState['currentUser']>) {
      state.currentUser = action.payload;
    },
    clearAppState(state) {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setSuccessMessage,
  toggleDarkMode,
  setCurrentUser,
  clearAppState,
} = appSlice.actions;

export default appSlice.reducer;
