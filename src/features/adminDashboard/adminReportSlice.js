import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Async thunk to fetch weekwise report
export const fetchAdminWeekwiseReport = createAsyncThunk(
  'adminReport/fetchAdminWeekwiseReport',
  async ({ token, month, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/adminpanel/patient/weekwise-report/?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const adminReportSlice = createSlice({
  name: 'adminReport',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetAdminReportState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminWeekwiseReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminWeekwiseReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAdminWeekwiseReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetAdminReportState } = adminReportSlice.actions;

export default adminReportSlice.reducer;

// Selectors
export const selectAdminReportData = (state) => state.adminReport.data;
export const selectAdminReportStatus = (state) => state.adminReport.status;
export const selectAdminReportError = (state) => state.adminReport.error;
