import { createSlice } from '@reduxjs/toolkit';  
 

const initialState = {
  reports: [],
  status: 'idle',
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReports: (state, action ) => {
      state.reports = action.payload;
      state.status = 'succeeded';
    },
    addReport: (state, action ) => {
      state.reports.push(action.payload);
    },
    setLoading: (state, action ) => {
      state.status = action.payload;
    },
    setError: (state, action ) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { setReports, addReport, setLoading, setError } = reportSlice.actions;

export const selectAllReports = (state) => state.report.reports;
export const selectReportsByType = (state, type) => 
  state.report.reports.filter(report => report.type === type);

export const selectReportById = (state, id) => 
  state.report.reports.find((report) => report?.id === id);

export default reportSlice.reducer;