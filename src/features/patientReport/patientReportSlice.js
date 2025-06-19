import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'; 
 
import API from '../api';
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  reports: [],
  status: 'idle',
  error: null,
};


export const fetchReport = createAsyncThunk(
  'patients/fetchReport',
  async ( _, { rejectWithValue }) => {
    try {
      const response = await API.get(`${API_URL}/appointments/my-documents/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

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
    extraReducers: (builder) => {
      builder
  
        // Fetch
        .addCase(fetchReport.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchReport.fulfilled, (state, action) => { 
          state.status = 'succeeded';
          state.reports = action.payload;
        })
        .addCase(fetchReport.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
      }
});

export const { setPatientReports, shareReport, setLoading, setError } = patientReportSlice.actions;

export const selectPatientReports = (state) => { 
  return state.patientReport.reports
};

export const selectReportStatus = (state) => state.patientReport.status;

export const selectSharedPatientReports = (state, patientId) => 
  state.patientReport.reports.filter(report => 
    report.patientId === patientId && report.isShared
  );
export const selectPatientReportById = (state, id) =>
  state.patientReport.reports.find(report => report.id === id);

export default patientReportSlice.reducer;