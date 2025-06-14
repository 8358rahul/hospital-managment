import { createSlice } from '@reduxjs/toolkit'; 
 
 

const initialState = {
  reports: [],
  status: 'idle',
  error: null,
};

const patientReportSlice = createSlice({
  name: 'patientReport',
  initialState,
  reducers: {
    setPatientReports: (state, action) => {
      state.reports = action.payload;
      state.status = 'succeeded';
    },
    shareReport: (state, action) => {
      const index = state.reports.findIndex(r => r.id === action.payload);
      if (index !== -1) {
        state.reports[index].isShared = true;
      }
    },
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { setPatientReports, shareReport, setLoading, setError } = patientReportSlice.actions;

export const selectPatientReports = (state) => state.patientReport.reports;
export const selectSharedPatientReports = (state, patientId) => 
  state.patientReport.reports.filter(report => 
    report.patientId === patientId && report.isShared
  );
export const selectPatientReportById = (state, id) =>
  state.patientReport.reports.find(report => report.id === id);

export default patientReportSlice.reducer;