// features/dashboard/adminDashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Async thunk to fetch dashboard data
export const fetchAdminDashboard = createAsyncThunk(
  'adminDashboard/fetchAdminDashboard',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/appointments/admin/dashboard/stats/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default adminDashboardSlice.reducer;

export const selectDashboardData = (state) => state.adminDashboard.data;
export const selectDashboardStatus = (state) => state.adminDashboard.status;
