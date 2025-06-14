import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  doctors: [],
  status: 'idle',
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    setDoctors: (state, action ) => {
      state.doctors = action.payload;
      state.status = 'succeeded';
    },
    addDoctor: (state, action ) => {
      state.doctors.push(action.payload);
    },
    updateDoctor: (state, action ) => {
      const index = state.doctors.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
      }
    },
    removeDoctor: (state, action ) => {
      state.doctors = state.doctors.filter(doctor => doctor.id !== action.payload);
    },
    setError: (state, action ) => {
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

export const selectAllDoctors = (state) => state.doctors.doctors;
export const selectDoctorStatus = (state) => state.doctors.status;
export const selectDoctorError = (state) => state.doctors.error;
export const selectDoctorById = (state, id) => 
  state.doctors.doctors.find(doctor => doctor.id === id);

export default doctorSlice.reducer;