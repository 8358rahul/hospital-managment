import { createSlice } from '@reduxjs/toolkit'; 
 

const initialState = {
  appointments: [],
  status: 'idle',
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
      state.status = 'succeeded';
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    removeAppointment: (state, action) => {
      state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { 
  setLoading, 
  setAppointments, 
  addAppointment, 
  updateAppointment, 
  removeAppointment, 
  setError 
} = appointmentSlice.actions;

export const selectAllAppointments = (state) => 
  state.appointments.appointments;
export const selectAppointmentStatus = (state) => 
  state.appointments.status;
export const selectAppointmentError = (state) => 
  state.appointments.error;
export const selectAppointmentsByPatient = (state, patientId) => 
  state.appointments.appointments.filter(a => a.patientId === patientId);
export const selectAppointmentsByDoctor = (state, doctorId) => 
  state.appointments.appointments.filter(a => a.doctorId === doctorId);

export const selectAppointmentsByPatientAndDoctor = (
  state, 
  patientId ,
  doctorId
) => state.appointments.appointments.filter(
  a => a.patientId === patientId && a.doctorId === doctorId
);

export default appointmentSlice.reducer;