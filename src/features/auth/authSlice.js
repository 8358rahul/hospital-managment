import { createSlice  } from '@reduxjs/toolkit'; 
 

const initialState = {
  user: null,
  token: null,
  role: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    login: (
      state, 
      action ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.status = 'succeeded';
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = 'idle';
      state.error = null;
    },
    setError: (state, action ) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { login, logout, setLoading, setError } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;