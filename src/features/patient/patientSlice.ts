import { createSlice, type PayloadAction } from '@reduxjs/toolkit'; 
import type { Patient } from '../../@types';

interface PatientState {
  patients: Patient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  status: 'idle',
  error: null,
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
    },
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
      state.status = 'succeeded';
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    removePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(patient => patient.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
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

export const selectAllPatients = (state: { patients: PatientState }) => state.patients.patients;
export const selectPatientStatus = (state: { patients: PatientState }) => state.patients.status;
export const selectPatientError = (state: { patients: PatientState }) => state.patients.error;
export const selectPatientById = (state: { patients: PatientState }, id: string) => 
  state.patients.patients.find(patient => patient.id === id);

export default patientSlice.reducer;