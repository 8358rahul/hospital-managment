import { createSlice, type PayloadAction } from '@reduxjs/toolkit';  
import type { RootState } from '../../app/store';
import type { HospitalReport } from '../../@types';

interface ReportState {
  reports: HospitalReport[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  status: 'idle',
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<HospitalReport []>) => {
      state.reports = action.payload;
      state.status = 'succeeded';
    },
    addReport: (state, action: PayloadAction<HospitalReport >) => {
      state.reports.push(action.payload);
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

export const { setReports, addReport, setLoading, setError } = reportSlice.actions;

export const selectAllReports = (state: RootState) => state.report.reports;
export const selectReportsByType = (state: RootState, type: string) => 
  state.report.reports.filter(report => report.type === type);

export const selectReportById = (state: RootState, id: string) => 
  state.report.reports.find((report:any) => report?.id === id);

export default reportSlice.reducer;