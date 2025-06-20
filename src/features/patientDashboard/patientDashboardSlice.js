// features/dashboard/patientDashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPatientDashboard = createAsyncThunk(
  'patientDashboard/fetchPatientDashboard',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/accounts/patient/dashboard-stats/`, {
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

const patientDashboardSlice = createSlice({
  name: 'patientDashboard',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientDashboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatientDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPatientDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default patientDashboardSlice.reducer;

export const selectPatientDashboardData = (state) => state.patientDashboard.data;
export const selectPatientDashboardStatus = (state) => state.patientDashboard.status;
