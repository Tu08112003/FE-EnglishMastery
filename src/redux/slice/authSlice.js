import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
    },
    finishLoading(state) {
      state.loading = false;
    }
  },
});

export const { loginSuccess, logout, finishLoading, } = authSlice.actions;
export default authSlice.reducer;