import { createSlice,type PayloadAction } from '@reduxjs/toolkit'; 
import type { PatientReport } from '../../@types';
import type { RootState } from '../../app/store';

interface PatientReportState {
  reports: PatientReport[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PatientReportState = {
  reports: [],
  status: 'idle',
  error: null,
};

const patientReportSlice = createSlice({
  name: 'patientReport',
  initialState,
  reducers: {
    setPatientReports: (state, action: PayloadAction<PatientReport[]>) => {
      state.reports = action.payload;
      state.status = 'succeeded';
    },
    shareReport: (state, action: PayloadAction<string>) => {
      const index = state.reports.findIndex(r => r.id === action.payload);
      if (index !== -1) {
        state.reports[index].isShared = true;
      }
    },
    setLoading: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { setPatientReports, shareReport, setLoading, setError } = patientReportSlice.actions;

export const selectPatientReports = (state: RootState) => state.patientReport.reports;
export const selectSharedPatientReports = (state: RootState, patientId: string) => 
  state.patientReport.reports.filter(report => 
    report.patientId === patientId && report.isShared
  );
export const selectPatientReportById = (state: RootState, id: string) =>
  state.patientReport.reports.find(report => report.id === id);

export default patientReportSlice.reducer;