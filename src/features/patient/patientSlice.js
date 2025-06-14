import { createSlice } from '@reduxjs/toolkit'; 
 
 

const initialState = {
  patients: [],
  status: 'idle',
  error: null,
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setLoading: (state, action ) => {
      state.status = action.payload;
    },
    setPatients: (state, action ) => {
      state.patients = action.payload;
      state.status = 'succeeded';
    },
    addPatient: (state, action ) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action ) => {
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    removePatient: (state, action ) => {
      state.patients = state.patients.filter(patient => patient.id !== action.payload);
    },
    setError: (state, action ) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { 
  setLoading, 
  setPatients, 
  addPatient, 
  updatePatient, 
  removePatient, 
  setError 
} = patientSlice.actions;

export const selectAllPatients = (state) => state.patients.patients;
export const selectPatientStatus = (state) => state.patients.status;
export const selectPatientError = (state) => state.patients.error;
export const selectPatientById = (state, id) => 
  state.patients.patients.find(patient => patient.id === id);

export default patientSlice.reducer;