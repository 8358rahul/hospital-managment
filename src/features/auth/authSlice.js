import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // ✅ Works with Vite


// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  role: null,
  status: 'idle',
  error: null,
};
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/accounts/login/`, {
        email,
        password,
      });

     return response.data; 
    
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Async thunk for register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/accounts/register/`, userData);
      const { token, user, role } = response.data;

      localStorage.setItem('token', token);
      return { token, user, role };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');

    }, 
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    alreadyLoggedIn:(state,action)=>{
        state.token = action.payload.access;
        state.user = action.payload.user;
        state.role = action.payload.role;  
        localStorage.setItem("user",JSON.stringify(action?.payload)) 
    }
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.access;
        state.user = action.payload.user;
        state.role = action.payload.role;  
        localStorage.setItem("user",JSON.stringify(action?.payload))
        state.error = action.payload;
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Action exports
export const { logout, setError, setLoading ,alreadyLoggedIn} = authSlice.actions;

// Selector exports
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
