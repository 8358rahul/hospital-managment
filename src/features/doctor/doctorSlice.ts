import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import type { Doctor } from '../../@types';
 

interface DoctorState {
  doctors: Doctor[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  status: 'idle',
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
    },
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.doctors = action.payload;
      state.status = 'succeeded';
    },
    addDoctor: (state, action: PayloadAction<Doctor>) => {
      state.doctors.push(action.payload);
    },
    updateDoctor: (state, action: PayloadAction<Doctor>) => {
      const index = state.doctors.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
      }
    },
    removeDoctor: (state, action: PayloadAction<string>) => {
      state.doctors = state.doctors.filter(doctor => doctor.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { 
  setLoading, 
  setDoctors, 
  addDoctor, 
  updateDoctor, 
  removeDoctor, 
  setError 
} = doctorSlice.actions;

export const selectAllDoctors = (state: { doctors: DoctorState }) => state.doctors.doctors;
export const selectDoctorStatus = (state: { doctors: DoctorState }) => state.doctors.status;
export const selectDoctorError = (state: { doctors: DoctorState }) => state.doctors.error;
export const selectDoctorById = (state: { doctors: DoctorState }, id: string) => 
  state.doctors.doctors.find(doctor => doctor.id === id);

export default doctorSlice.reducer;