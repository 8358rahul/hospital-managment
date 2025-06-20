// features/dashboard/doctorDashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchDoctorDashboard = createAsyncThunk(
  'doctorDashboard/fetchDoctorDashboard',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/appointments/doctor/dashboard/stats/`, {
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

const doctorDashboardSlice = createSlice({
  name: 'doctorDashboard',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorDashboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctorDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDoctorDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default doctorDashboardSlice.reducer;

export const selectDoctorDashboardData = (state) => state.doctorDashboard.data;
export const selectDoctorDashboardStatus = (state) => state.doctorDashboard.status;
